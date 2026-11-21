/* Read-only identity helpers for the vocabulary learning school.
 * This module never edits source vocabulary rows or legacy progress storage.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.VocabLearningIdentity = api;
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  const ALLOWED_KINDS = new Set(["word", "phrase", "compound-verb", "expression", "other"]);

  function validateManifest(manifest) {
    const errors = [];
    if (!manifest || typeof manifest !== "object" || Array.isArray(manifest)) {
      return { valid: false, errors: ["manifest must be an object"], itemCount: 0 };
    }
    if (manifest.schemaVersion !== 1) errors.push("schemaVersion must be 1");
    if (!Array.isArray(manifest.items)) {
      errors.push("items must be an array");
      return { valid: false, errors, itemCount: 0 };
    }

    const itemIds = new Set();
    manifest.items.forEach((item, index) => {
      const at = "items[" + index + "]";
      if (!item || typeof item !== "object" || Array.isArray(item)) {
        errors.push(at + " must be an object");
        return;
      }
      if (typeof item.itemId !== "string" || !item.itemId.trim()) {
        errors.push(at + ".itemId must be a non-empty string");
      } else if (itemIds.has(item.itemId)) {
        errors.push(at + ".itemId is duplicated: " + item.itemId);
      } else itemIds.add(item.itemId);

      if (typeof item.headword !== "string" || !item.headword.trim()) {
        errors.push(at + ".headword must be a non-empty string");
      }
      if (!ALLOWED_KINDS.has(item.kind)) errors.push(at + ".kind is not supported");
      if (!Array.isArray(item.acceptedForms)) errors.push(at + ".acceptedForms must be an array");
      else if (item.acceptedForms.some(form => typeof form !== "string" || !form.trim())) {
        errors.push(at + ".acceptedForms entries must be non-empty strings");
      }
      if (!Array.isArray(item.legacyIds)) errors.push(at + ".legacyIds must be an array");
      else if (item.legacyIds.some(id => typeof id !== "string" || !id.trim())) {
        errors.push(at + ".legacyIds entries must be non-empty strings");
      }
      if (!Array.isArray(item.occurrences)) errors.push(at + ".occurrences must be an array");
      else item.occurrences.forEach((occurrence, occurrenceIndex) => {
        const path = at + ".occurrences[" + occurrenceIndex + "]";
        if (!occurrence || typeof occurrence !== "object" || Array.isArray(occurrence)) {
          errors.push(path + " must be an object");
          return;
        }
        if (![1, 2, 3].includes(Number(occurrence.term))) errors.push(path + ".term must be 1, 2 or 3");
        if (typeof occurrence.legacyId !== "string" || !occurrence.legacyId.trim()) {
          errors.push(path + ".legacyId must be a non-empty string");
        }
        if (!Array.isArray(occurrence.sources)) errors.push(path + ".sources must be an array");
      });
    });
    return { valid: errors.length === 0, errors, itemCount: manifest.items.length };
  }

  function buildLegacyAliasIndex(manifest) {
    const validation = validateManifest(manifest);
    if (!validation.valid) {
      return { valid: false, errors: validation.errors, aliases: Object.create(null), ambiguous: [] };
    }
    const candidates = new Map();
    manifest.items.forEach(item => {
      const aliases = new Set(item.legacyIds);
      item.occurrences.forEach(occurrence => aliases.add(occurrence.legacyId));
      aliases.forEach(alias => {
        if (!candidates.has(alias)) candidates.set(alias, new Set());
        candidates.get(alias).add(item.itemId);
      });
    });

    const aliases = Object.create(null);
    const ambiguous = [];
    candidates.forEach((ids, legacyId) => {
      if (ids.size === 1) aliases[legacyId] = [...ids][0];
      else ambiguous.push({ legacyId, itemIds: [...ids].sort() });
    });
    ambiguous.sort((a, b) => a.legacyId.localeCompare(b.legacyId));
    return { valid: true, errors: [], aliases, ambiguous };
  }

  function resolveLegacyId(index, legacyId) {
    if (!index || !index.valid) return { status: "invalid-index" };
    if (index.ambiguous.some(entry => entry.legacyId === legacyId)) {
      return { status: "ambiguous" };
    }
    if (!Object.prototype.hasOwnProperty.call(index.aliases, legacyId)) {
      return { status: "unmapped" };
    }
    return { status: "resolved", itemId: index.aliases[legacyId] };
  }

  return Object.freeze({ validateManifest, buildLegacyAliasIndex, resolveLegacyId });
});
