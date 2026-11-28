# Episode 7 · Business Validation, Design & Operating Model

Aalayam by Anamika, Business Research Series. A 7 min 17 s explainer (1920 × 1080, 30 fps). It documents the move from research to real business activity: social content, the Shopify store, the sourcing trip, and the data system that connects them. Built with **Remotion** and **React** in the series' dark palette. Earlier episodes are unchanged.

**Data status:** actual evidence = the owner's Notion notes, Canva posters, and the live store's public catalogue and pages (13 products, read 28 Nov 2026). Instagram insights, store analytics and supplier records were unavailable, so those tiles say "awaiting data", and every example number is tagged ILLUSTRATIVE.

| Deliverable | File |
|---|---|
| Research report: evidence inventory, data model, social, Shopify and supplier frameworks, cost model, product scorecard, data strategy, dashboard, findings, 90-day roadmap | `docs/research-report.md` |
| Storyboard and narration | `docs/storyboard.md` (subtitles: `out/narration.srt`) |
| Data model templates (spreadsheet-ready) | `data/*.csv` |
| Rendered video | `out/aalayam-episode-7.mp4` |
| Framework stills (15) | `deliverables/*.png` |

## Structure

```
src/data.ts              evidence, content groups, journey, supplier criteria, cost model, scorecards, plan (edit here)
src/scenes/Journey.tsx   evidence inventory, audience testing, store catalogue (actual), store journey audit
src/scenes/Supply.tsx    sourcing journey and supplier scorecard, unit economics, operating loop and data model
src/scenes/Ops.tsx       data strategy and dashboard, product validation, findings, 90-day roadmap and close
```

The cost model (`COST`, `costModel`), supplier scores (`wScore`) and product decisions (`decide`) are calculated from `src/data.ts`. When real quotes, Instagram results or Shopify numbers arrive, enter them there, change their status from `illustrative` or `unavailable` to `actual`, and re-render:

```sh
npm install
npx remotion render Episode7 out/aalayam-episode-7.mp4
```
