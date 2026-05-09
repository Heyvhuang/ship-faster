# Radar Generated Sites

Radar agents write static HTML source files here after a generated page is shipped.

```text
radar/
  YYYYMMDD/
    <hotspot-id>-<slug>/
      index.html
      <run-id>-<artifact-id>/
        index.html
```

Each `index.html` is the source proof for a live validation page. It is safe to inspect, but it is not a maintained product source tree and not a cloneable starter template.

Older backfilled pages can sit directly at `<hotspot-id>-<slug>/index.html`. New automated runs keep each source under a run folder so historical Radar links can point to the exact GitHub commit that produced them.
