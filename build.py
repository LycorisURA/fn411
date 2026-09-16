#!/usr/bin/env python3
"""Assemble the single-file study platform from the modular sources in src/.

Usage:  python build.py

Concatenates the parts in order into the-left-tail.html. The page is one
self-contained HTML file with no build step beyond this concatenation --
no bundler, no dependencies, no network access except Google Fonts.

Part order matters: panels must precede course-data, which must precede the
engine, which must precede course-tools, which must precede boot().
"""

import io
import os
import sys

PARTS = [
    "01-head.html",    # <head>, CSS tokens, masthead, rail
    "02a-panels.html", # Tail 00 orientation + Tail 01 financial institutions
    "02b-panels.html", # Tail 02 market risk, VaR & ES
    "02c-panels.html", # Tail 03 VaR for fixed income
    "02d-panels.html", # Tail 04 VaR for options
    "02e-panels.html", # Tail 05 VaR for forwards & futures
    "02f-panels.html", # Tail XL Excel + AS assignments + EX exam prep
    "03-mid.html",     # </main>, footer, toast host, companion chat drawer
    "04a-data.js",     # COURSE, COMPANION, TOPICS, FLASH, SORTERS
    "04b-data.js",     # QUIZ, PSET, SEEDS, TEXTBOOK_CTX, LINES
    "05-engine.html",  # study-platform-kit engine (do not edit)
    "06-tools.js",     # the seven interactive benches + TOOL_TALK
    "07-boot.html",    # boot()
]

OUT = "the-left-tail.html"


def main():
    here = os.path.dirname(os.path.abspath(__file__))
    src = os.path.join(here, "src")
    chunks = []
    for name in PARTS:
        path = os.path.join(src, name)
        if not os.path.exists(path):
            sys.exit("missing source part: src/%s" % name)
        text = io.open(path, encoding="utf-8").read()
        chunks.append(text if text.endswith("\n") else text + "\n")
    out = os.path.join(here, OUT)
    io.open(out, "w", encoding="utf-8").write("".join(chunks))
    size = os.path.getsize(out)
    print("built %s  (%d parts, %.0f KB)" % (OUT, len(PARTS), size / 1024.0))


if __name__ == "__main__":
    main()
