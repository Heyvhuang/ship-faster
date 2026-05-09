# Generated Sites

This folder stores source files for small pages that Radar agents generated and shipped.

```text
generated-sites/
  radar/
    YYYYMMDD/
      <hotspot-id>-<slug>/
        index.html
        <run-id>-<artifact-id>/
          index.html
```

These files are proof sources for live Radar demos. They are not maintained starter templates.

Older backfilled pages may be stored directly as `<hotspot-id>-<slug>/index.html`. New automated runs store a run folder so each source URL can point to an immutable GitHub commit and file path.

- Use `templates/` only for cloneable starter templates.
- Use `packs/` for reusable agent workflows.
- Use `examples/` for curated outputs and source briefs.
