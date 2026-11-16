# Viznova

Viznova is a browser-based learning app for understanding how to design, select, interpret and communicate effective data visualizations. It includes Plotly examples in R, Python (pandas and Polars), and JavaScript as implementation references.

## Run locally

No npm install, package manager, backend or build step is required. The app is plain HTML, CSS and JavaScript. Python 3 is only used as a local static-file server.

**Important:** Do not double-click `index.html` to open it as a `file://` URL. The learning application uses JavaScript ES modules, which browsers restrict when opened directly from the filesystem. Start the local server first.

### macOS

Double-click `start-viznova.command` in the extracted folder. It starts the local server, waits until it responds, opens the landing page in your browser, and keeps the server running in Terminal. If macOS blocks the first launch, right-click the file, choose Open, then confirm. If port 8000 is already in use, run `PORT=8001 ./start-viznova.command` from Terminal.

Or run manually in Terminal:

```bash
cd visualization-learning-app
python3 -m http.server 8000
```

Open the landing page at `http://localhost:8000/` and the learning app at `http://localhost:8000/learn.html`. Keep the Terminal window open while using Viznova; press Control+C to stop the server.

The complete `assets/css/` and `assets/js/` folders must remain beside `index.html` and `learn.html`. Do not move the HTML files out of the project folder.

## Learning experience

- The landing page introduces Viznova and summarizes five learning outcomes. The detailed curriculum is available inside the learning app.
- Foundations: visualization history, visual perception and encoding, color theory, typography and accessibility.
- Visualization thinking: decision framework, chart selection and understanding data.
- Communication: technical and non-technical audiences, titles, narrative and avoiding misleading charts.
- Chart library: bar, dot chart, line, area, scatter, bubble, balloon, heatmap, histogram, density, dot plot, box, violin, strip, pie/donut, treemap, sunburst, mosaic, gauge, radar and Sankey charts.
- Implementation: Plotly in R, Python with pandas and Polars, and JavaScript / Plotly.js.
- Practice: chart review checklist and browser-local CSV data lab.

## Interactivity

- Every chart deep dive has a live Plotly preview and controls specific to that chart type.
- Chart toolbar supports zoom, pan, selection, autoscale and reset. Hover interactions expose values and contextual details.
- Chart controls let learners change palettes, bar ordering/orientation, line markers and range selection, scatter trend lines and marker size, histogram bins and normalization, box/violin details, area opacity, heatmap scales and annotations, pie/donut proportions, treemap labels, Sankey spacing, dot and density settings, bubble sizing, gauge targets, balloon labels, mosaic labels, radar scale, sunburst labels and strip-chart jitter.
- Each preview includes an underlying data table and a PNG export control.
- The CSV data lab runs fully in the browser. It supports a local CSV upload or the bundled retail example, X/Y field selection, bar/line/scatter charts, sum/mean/count aggregation, multi-series splitting, category filtering, three palettes, interactive Plotly exploration, PNG export and processed-data CSV export.
- CSV data is not uploaded to a server. The exercise accepts files up to 5 MB and 10,000 rows; multi-series charts are limited to 20 categories to keep them interpretable.

## Display preferences

Light/dark mode and Small (0.75em), Medium (1em), Large (1.25em) text settings persist in browser local storage. Chart layouts respond to the selected theme and font scale.

## External assets

Inter is loaded from Google Fonts and Plotly.js 4.2.0 is loaded from the Plotly CDN. An internet connection is required for those hosted resources and interactive chart rendering. For an offline deployment, host approved copies of both assets locally and update the references in `index.html` and `learn.html`.

## Tests

The app itself does not require Node.js. To run the automated test suite during development, use Node.js 22 or later:

```bash
node --test
```

The tests cover curriculum completeness, source references, JavaScript example syntax, chart specifications and interactive settings for all 21 chart types, CSV parsing, aggregation, series splitting, filtering, chronological sorting, safe exports and display-preference persistence.

## Build verification

Latest source checks on 16 November 2026:

- `node --test tests/*.test.js`: Updated automated tests cover the 21 chart lessons, chart rendering specifications, code examples, CSV workflows and display preferences.
- Every local asset referenced by `index.html` and `learn.html` exists.
- Every relative JavaScript module import resolves to an existing file.
- The learning header includes the current-section target used by lesson rendering; the app module URL has a version query to avoid reusing a stale cached entry module.
- The ZIP archive is checked with `unzip -t` after packaging.

A new visual browser run could not be completed in this execution environment because Chromium navigation was blocked by its administrator policy. The local HTTP server itself serves the learning page successfully. Recheck the rendered page in the target browser after extracting this build. Python/pandas and JavaScript example checks were run during the earlier build validation; R and Polars runtime execution remains outstanding.

## Scope and deployment

This is a static frontend. It has no backend, authentication, database, analytics or server-side file execution. Code examples are displayed and can be copied; this app does not execute R or Python code. CSV data processing is local to the browser.

## Accessibility status

The interface includes semantic landmarks, native keyboard-operable controls, visible focus styles, theme-aware colors, scalable text, accessible data tables and descriptive text for chart previews. These features do not constitute a completed WCAG 2.2 AA audit or conformance claim. Before production, test both pages and all six theme/font combinations in target browsers with automated and manual keyboard, screen-reader, zoom, reflow and chart-interaction testing. Plotly's interactive SVG output does not by itself guarantee accessible chart interaction; the data table and chart descriptions must remain available as alternatives.

## Content and attribution

The curriculum uses original explanations, examples and implementation patterns. Chart lessons link to official Plotly documentation and relevant accessibility standards.

## Learning page startup troubleshooting

Open the learning application through the local server at `http://localhost:8000/learn.html`, not by double-clicking `learn.html`. The page now shows a startup message while its curriculum modules load, provides a screen-reader-only current-section target for compatibility with cached lesson scripts, cache-busts the application entry module, and displays actionable instructions if module loading fails. If the error persists while using the local server, confirm that `assets/js/app.js`, `assets/js/content.js`, `assets/js/charting.js`, `assets/js/csv.js`, and `assets/css/styles.css` are present in the extracted folder.

The Viznova wordmark is text-only. The light/dark theme button and text-size selector use matched fixed heights at desktop and mobile breakpoints.
