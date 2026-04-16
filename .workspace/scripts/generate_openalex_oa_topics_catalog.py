#!/usr/bin/env python3
"""Emit openalex-oa-topics-catalog.md from the OpenAlex topic mapping CSV."""

from __future__ import annotations

import csv
from pathlib import Path


def yaml_double_quoted_string(s: str) -> str:
    """Escape s for YAML double-quoted scalar (no external YAML library)."""
    out: list[str] = []
    for ch in s:
        if ch == "\\":
            out.append("\\\\")
        elif ch == '"':
            out.append('\\"')
        elif ch == "\n":
            out.append("\\n")
        elif ch == "\r":
            out.append("\\r")
        elif ch == "\t":
            out.append("\\t")
        else:
            out.append(ch)
    return '"' + "".join(out) + '"'


def main() -> None:
    repo = Path(__file__).resolve().parents[2]
    csv_path = (
        repo
        / ".workspace"
        / "docs"
        / "ref"
        / "OpenAlex_topic_mapping_table - final_topic_field_subfield_table.csv"
    )
    out_path = repo / ".workspace" / "docs" / "ref" / "openalex-oa-topics-catalog.md"

    lines: list[str] = []
    with csv_path.open(newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        required = {
            "domain_id",
            "field_id",
            "subfield_id",
            "topic_id",
            "topic_name",
        }
        if reader.fieldnames is None or not required.issubset(set(reader.fieldnames)):
            raise SystemExit(f"CSV missing required columns; got {reader.fieldnames!r}")
        for row in reader:
            dotted = (
                f"{row['domain_id']}.{row['field_id']}."
                f"{row['subfield_id']}.{row['topic_id']}"
            )
            full = f"{dotted} {row['topic_name']}"
            lines.append(full)

    body = """# OpenAlex oa-topics reference

Canonical list of OpenAlex topic strings for belief note frontmatter (`oa-topics`). Each entry is `domain.field.subfield.topic_id` followed by a space and the topic name. Regenerate with `.workspace/scripts/generate_openalex_oa_topics_catalog.py` after updating the source CSV.
"""

    parts: list[str] = [
        "---",
        "oa-topics:",
    ]
    for item in lines:
        parts.append(f"  - {yaml_double_quoted_string(item)}")
    parts.append("---")
    parts.append("")
    parts.append(body.rstrip() + "\n")

    out_path.write_text("\n".join(parts), encoding="utf-8")
    print(f"Wrote {len(lines)} topics to {out_path}")


if __name__ == "__main__":
    main()
