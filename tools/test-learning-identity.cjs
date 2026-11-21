#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");
const {
  validateManifest,
  buildLegacyAliasIndex,
  resolveLegacyId
} = require("../website/learning/identity.js");

function fixture() {
  return {
    schemaVersion: 1,
    items: [
      {
        itemId: "vocab:t1:word:ketab",
        headword: "کتاب",
        kind: "word",
        acceptedForms: [],
        legacyIds: ["1|1|FA1-01|کتاب"],
        occurrences: [{ term: 1, book: 1, chapter: 1, legacyId: "1|1|FA1-01|کتاب", sources: ["FA1-01"] }]
      },
      {
        itemId: "vocab:t2:phrase:dar-natije",
        headword: "در نتیجه",
        kind: "phrase",
        acceptedForms: ["درنتیجه"],
        legacyIds: ["2|0|در نتیجه"],
        occurrences: [{ term: 2, book: 2, chapter: 0, legacyId: "2|0|در نتیجه", sources: ["FA2-00"] }]
      },
      {
        itemId: "vocab:t3:word:shaer",
        headword: "شاعر",
        kind: "word",
        acceptedForms: [],
        legacyIds: ["3|20|FA3-20|شاعر"],
        occurrences: [{ term: 3, book: 3, chapter: 20, legacyId: "3|20|FA3-20|شاعر", sources: ["FA3-20"] }]
      }
    ]
  };
}

const manifest = fixture();
assert.deepEqual(validateManifest(manifest), { valid: true, errors: [], itemCount: 3 });

const index = buildLegacyAliasIndex(manifest);
assert.equal(index.valid, true);
assert.deepEqual(resolveLegacyId(index, "1|1|FA1-01|کتاب"), {
  status: "resolved",
  itemId: "vocab:t1:word:ketab"
});
assert.equal(resolveLegacyId(index, "not-in-manifest").status, "unmapped");

// Ambiguous aliases are deliberately blocked; never choose the first item.
const ambiguous = fixture();
ambiguous.items[1].legacyIds.push("legacy:collision");
ambiguous.items[2].legacyIds.push("legacy:collision");
const ambiguousIndex = buildLegacyAliasIndex(ambiguous);
assert.equal(resolveLegacyId(ambiguousIndex, "legacy:collision").status, "ambiguous");
assert.deepEqual(ambiguousIndex.ambiguous, [{
  legacyId: "legacy:collision",
  itemIds: ["vocab:t2:phrase:dar-natije", "vocab:t3:word:shaer"]
}]);

// Invalid manifests cannot produce a partially trusted alias map.
const invalid = fixture();
invalid.items[0].itemId = "";
const invalidIndex = buildLegacyAliasIndex(invalid);
assert.equal(invalidIndex.valid, false);
assert.equal(resolveLegacyId(invalidIndex, "1|1|FA1-01|کتاب").status, "invalid-index");

// Inputs remain untouched (read-only contract).
assert.equal(manifest.items[0].headword, "کتاب");
assert.equal(manifest.items[1].kind, "phrase");
console.log("PASS: manifest validation, explicit aliases, ambiguity blocking, unmapped IDs and read-only behavior");
