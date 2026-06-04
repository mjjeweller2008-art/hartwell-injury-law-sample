import json
import os

TRANSCRIPT = r"C:\Users\01\.cursor\projects\c-Users-01-Desktop-sample-website-for-personal-injury-lawyer\agent-transcripts\0c3cb026-7396-42b2-95bb-1a14a998fbf3\0c3cb026-7396-42b2-95bb-1a14a998fbf3.jsonl"
ROOT = r"c:\Users\01\Desktop\sample website for personal injury lawyer"
KEY = "sample website for personal injury lawyer"


def norm_path(p):
    p = p.replace("\\\\", "/").replace("\\", "/")
    if KEY not in p.lower():
        return None
    i = p.lower().index(KEY)
    return p[i + len(KEY) + 1 :]


def main():
    files: dict[str, str] = {}
    ops = []
    with open(TRANSCRIPT, encoding="utf-8") as f:
        for line in f:
            try:
                o = json.loads(line)
            except json.JSONDecodeError:
                continue
            for c in o.get("message", {}).get("content", []):
                if c.get("type") != "tool_use":
                    continue
                inp = c.get("input", {})
                rel = norm_path(inp.get("path", ""))
                if not rel:
                    continue
                if c["name"] == "Write" and "contents" in inp:
                    files[rel] = inp["contents"]
                    ops.append(("write", rel))
                elif c["name"] == "StrReplace":
                    ops.append(
                        (
                            "replace",
                            rel,
                            inp.get("old_string", ""),
                            inp.get("new_string", ""),
                        )
                    )

    failed = []
    for op in ops:
        if op[0] != "replace":
            continue
        _, rel, old, new = op
        if rel not in files or not old:
            continue
        if old in files[rel]:
            files[rel] = files[rel].replace(old, new, 1)
        else:
            failed.append(rel)

    for rel, content in sorted(files.items()):
        out = os.path.join(ROOT, rel.replace("/", os.sep))
        os.makedirs(os.path.dirname(out), exist_ok=True)
        with open(out, "w", encoding="utf-8", newline="\n") as fh:
            fh.write(content)

    idx = files.get("index.html", "")
    print("files:", len(files))
    print("failed replaces:", len(failed))
    print("index len:", len(idx))
    print("hero--editorial:", "hero--editorial" in idx)
    print("site-header div:", 'id="site-header"' in idx)
    print("hero-form:", 'id="hero-form"' in idx)
    print("unsplash:", "unsplash" in idx.lower())


if __name__ == "__main__":
    main()
