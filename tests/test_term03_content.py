"""Regression checks for the Term 03 Persian learning content and chapter mapping."""

from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]
WEB = ROOT / "website"


def read(name: str) -> str:
    return (WEB / name).read_text(encoding="utf-8")


def test_all_sixty_term03_source_chapters_have_lexicon_links() -> None:
    additions = read("term03-lexicon-additions.js")
    sources = [
        *(f"FA3-{i:02d}" for i in range(1, 21)),
        *(f"KH3-{i:02d}" for i in range(1, 21)),
        *(f"N3-{i:02d}" for i in range(1, 11)),
        *(f"SH3-{i:02d}" for i in range(1, 11)),
    ]
    assert len(sources) == 60
    assert all(f'"{source}"' in additions for source in sources)


def test_every_farsi_umumi_unit_has_core_vocabulary() -> None:
    data = read("term03-data.js")
    units = {int(unit) for unit in re.findall(r"\{unit:(\d+),source:", data)}
    assert units == set(range(1, 21))


def test_all_twenty_khulasa_sheets_exist_and_have_five_lines() -> None:
    khulasa = read("term03-khulasa.js")
    assert len(re.findall(r"\{ch:\s*\d+,title:", khulasa)) == 20
    line_arrays = re.findall(r"lines:\s*\[(.*?)\]", khulasa, flags=re.DOTALL)
    assert len(line_arrays) == 20
    assert all(5 <= len(re.findall(r'"(?:[^"\\]|\\.)*"', lines)) <= 6 for lines in line_arrays)


def test_all_twenty_chapters_have_speech_prompts_without_legacy_essay_data() -> None:
    speeches = read("term03-speeches.js")
    assert len(re.findall(r"\{ch:\s*\d+,title:", speeches)) == 20
    assert not (WEB / "term03-writing.js").exists()
    assert "TERM3_WRITING" not in speeches


def test_newestan_fourth_chapter_is_mapped_to_unit_two_consistently() -> None:
    data = read("term03-data.js")
    audit = read("term03-source-audit.js")
    assert 'N3-04 · social relationships' in data
    assert re.search(r'2:\{base:"FA3-02[^\n]*N3-04', data)
    mappings = re.findall(r'(?:N|V|A)\((\d+),"N3-04"', audit)
    assert mappings and set(mappings) == {"2"}


def test_shared_vocabulary_is_available_in_every_linked_unit() -> None:
    index = read("index.html")
    for script in (
        "term03-lexicon-additions.js",
        "term03-matn-verbs.js",
        "term03-source-audit.js",
    ):
        source = read(script)
        assert "prior.units=Array.from(new Set" in source
        assert "x.units=[x.unit]" in source
    assert "units:Array.isArray(a.units)" in index
    assert "(i.units||[i.ch]).includes(Number(c))" in index
    assert "flatMap(i=>(i.units||[i.ch])" in index


def test_core_verb_masdar_and_imperative_are_not_identical() -> None:
    data = read("term03-data.js")
    forms = re.findall(r'ms:"([^"]*)",amr:"([^"]*)"', data)
    assert forms
    assert all(
        masdar == "—" or imperative == "—" or masdar.replace("‌", "") != imperative.replace("‌", "")
        for masdar, imperative in forms
    )


def _normalise_persian_form(value: str) -> str:
    return re.sub(r"[\u200c\sـ،؛.()]", "", value)


def test_all_curated_verb_examples_match_their_masdar_and_imperative() -> None:
    for filename in ("term03-lexicon-additions.js", "term03-matn-verbs.js"):
        source = read(filename)
        calls = re.findall(r"\bV\((.*?)\);", source)
        for call in calls:
            args = re.findall(r'"([^"]*)"', call)
            if len(args) < 15:
                continue
            masdar, imperative = args[7], args[8]
            masdar_example, imperative_example = args[9], args[12]
            if masdar != "—":
                assert _normalise_persian_form(masdar) in _normalise_persian_form(masdar_example), (filename, args[1], masdar)
            if imperative != "—":
                assert _normalise_persian_form(imperative) in _normalise_persian_form(imperative_example), (filename, args[1], imperative)
            else:
                assert re.search(r"[\u0600-\u06ff]", args[-1]), (filename, args[1], "missing no-imperative explanation")

    source = read("term03-source-audit.js")
    for call in re.findall(r"\bV\((.*?)\);", source):
        args = re.findall(r'"([^"]*)"', call)
        if len(args) < 12:
            continue
        masdar, imperative = args[4], args[5]
        if masdar != "—":
            assert _normalise_persian_form(masdar) in _normalise_persian_form(args[6]), ("term03-source-audit.js", args[1], masdar)
        if imperative != "—":
            assert _normalise_persian_form(imperative) in _normalise_persian_form(args[9]), ("term03-source-audit.js", args[1], imperative)
        else:
            assert re.search(r"[\u0600-\u06ff]", args[-1]), ("term03-source-audit.js", args[1], "missing no-imperative explanation")


def test_term03_deduplication_plan_and_runtime_audit_are_wired_before_mapping() -> None:
    index = read("index.html")
    page1 = read("term03-page1-additions.js")
    dedup = read("term03-dedup.js")
    assert index.index('src="term03-page1-additions.js"') < index.index('src="term03-chapter-mapping.js"')
    assert index.index('src="term03-chapter-mapping.js"') < index.index('src="term03-dedup.js"')
    assert "replace(/[\\u064B-\\u065F\\u0670\\u0640]/g" in page1
    assert "replace(/[\\u200c\\s]+/g" in page1
    assert "expectedApprovedMerges:EXPECTED.approvedMerges" in dedup
    assert "expectedDecisionMerges:EXPECTED.decisionMerges" in dedup
    assert "persian_done_v1" in dedup and "term03_dedup_migration_v1" in dedup
    assert "duplicateIds" in dedup and "duplicateHeadwordPos" in dedup
    assert "extraExamples" in dedup and "extraNotes" in dedup
    assert "id:a.id||" in index


def test_term03_dedup_plan_contains_all_approved_merges_and_manual_decisions() -> None:
    dedup = read("term03-dedup.js")
    plan_match = re.search(r"const PLAN=(\{.*?\});\n const EXPECTED=", dedup, flags=re.DOTALL)
    assert plan_match, "the reviewed deduplication plan must be embedded in the runtime script"
    plan = json.loads(plan_match.group(1))
    approved = sum(len(cluster["merges"]) for group in plan["groups"] for cluster in group["clusters"])
    decisions = [decision for group in plan["groups"] for decision in group["decisions"]]
    assert approved == 124
    assert len(decisions) == 46
    assert all(group["hasSemanticRecord"] for group in plan["groups"])
    assert "window.TERM03_DEDUP_AUDIT" in dedup


def test_term03_dedup_runtime_audit_is_part_of_ci() -> None:
    audit_workflow = (ROOT / ".github" / "workflows" / "audit-term03.yml").read_text(encoding="utf-8")
    deploy_workflow = (ROOT / ".github" / "workflows" / "deploy-pages.yml").read_text(encoding="utf-8")
    runtime_audit = (ROOT / "tools" / "audit-term03-dedup.cjs").read_text(encoding="utf-8")
    assert "node tools/audit-term03-dedup.cjs" in audit_workflow
    assert "node tools/audit-term03-dedup.cjs" in deploy_workflow
    assert "all approved merges" in runtime_audit
    assert "memorisation progress must migrate" in runtime_audit


def test_newestan_standalone_curriculum_keeps_all_lessons_and_final_insha() -> None:
    index = read("index.html")
    picker = read("term03-newestan-insha.js")
    renderer = read("term03-newestan-standalone.js")
    final_insha = read("term03-newestan-final-insha.js")
    assert index.index('src="term03-chapter-mapping.js"') < index.index('src="term03-newestan-insha.js"')
    assert 'src="term03-newestan-final-insha.js"' in index
    assert "window.TERM3_NEWESTAN_INSHA=R" in picker
    assert "term3InshaForChapter" not in picker
    assert "TERM3_NEWESTAN_FINAL_INSHA" in renderer
    assert "attachVocabularyLinks(scope)" in renderer
    assert all(('N3-' + str(i).zfill(2)) in picker for i in range(1, 11))
    assert "TERM3_NEWESTAN_FINAL_INSHA" in final_insha
    assert "window.TERM3_WRITING" not in index
    assert "window.TERM2_WRITING" not in index
    assert "TERM3_NEWESTAN_EXAMPLE" not in index
    assert "term3InshaForChapter" not in index
    assert "essayStoreKey" not in index
    assert "localStorage.removeItem" not in index

def test_trilingual_audit_loads_complete_term03_pipeline_and_checks_exact_card_keys() -> None:
    audit = (ROOT / "tools" / "audit-trilingual-meanings.cjs").read_text(encoding="utf-8")
    ordered = [
        "'website/term03-data.js'",
        "'website/term03-lexicon-additions.js'",
        "'website/term03-matn-verbs.js'",
        "'website/term03-source-audit.js'",
        "'website/term03-page1-additions.js'",
        "'website/term03-chapter-mapping.js'",
        "'website/term03-dedup.js'",
    ]
    positions = [audit.index(item) for item in ordered]
    assert positions == sorted(positions)
    assert "'website/term03-additional-semantics-46.js'" in audit
    assert "window.TERM3_ADDITIONAL_SEMANTICS_BATCH46" in audit
    assert "rows.filter(row => !row.fa || !rowSemantic(row.fa))" in audit
    assert "1939 cards and 1939 exact headwords" in audit
    assert "complete trilingual record under the exact card headword key" in audit
    runtime_dedup = (ROOT / "tools" / "audit-term03-dedup.cjs").read_text(encoding="utf-8")
    assert runtime_dedup.index("global.localStorage =") < runtime_dedup.index('require("./audit-trilingual-meanings.cjs")')
