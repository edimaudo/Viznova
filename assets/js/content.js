export const navigation = [
  { title: 'Start here', items: [{ id: 'start', title: 'How to use this course' }] },
  { title: 'Foundations', items: [{ id: 'history', title: 'History of visualization' }, { id: 'perception', title: 'Visual perception and encoding' }, { id: 'color', title: 'Color theory and palettes' }, { id: 'typography', title: 'Font and typography' }, { id: 'accessibility', title: 'Accessible visualization' }] },
  { title: 'Visualization thinking', items: [{ id: 'decision', title: 'The decision framework' }, { id: 'selection', title: 'Choose the right chart' }, { id: 'data', title: 'Understand your data' }] },
  { title: 'Communication', items: [{ id: 'audiences', title: 'Technical and business audiences' }, { id: 'narrative', title: 'Titles and visual narrative' }, { id: 'misleading', title: 'Avoid misleading charts' }] },
  { title: 'Chart library', items: [
    { id: 'bar', title: 'Bar chart' }, { id: 'dotchart', title: 'Dot chart' }, { id: 'line', title: 'Line chart' }, { id: 'area', title: 'Area chart' },
    { id: 'scatter', title: 'Scatter plot' }, { id: 'bubble', title: 'Bubble chart' }, { id: 'balloon', title: 'Balloon plot' }, { id: 'heatmap', title: 'Heatmap' },
    { id: 'histogram', title: 'Histogram' }, { id: 'density', title: 'Density plot' }, { id: 'dotplot', title: 'Dot plot' }, { id: 'box', title: 'Box plot' }, { id: 'violin', title: 'Violin plot' }, { id: 'strip', title: 'Strip chart' },
    { id: 'pie', title: 'Pie chart' }, { id: 'treemap', title: 'Treemap' }, { id: 'sunburst', title: 'Sunburst chart' }, { id: 'mosaic', title: 'Mosaic plot' },
    { id: 'gauge', title: 'Gauge chart' }, { id: 'radar', title: 'Radar chart' }, { id: 'sankey', title: 'Sankey diagram' }
  ] },
  { title: 'Practice', items: [{ id: 'practice', title: 'Practice and chart review' }, { id: 'dataset-lab', title: 'Use your own CSV' }] },
  { title: 'Implementation', items: [{ id: 'implementation', title: 'Plotly implementation guide' }] },
  { title: 'References', items: [{ id: 'sources', title: 'Sources and further reading' }] }
];

const lesson = (title, section, summary, sections, next) => ({ title, section, summary, sections, next });
export const lessons = {
  start: lesson('Learn the reasoning behind effective visualization', 'Start here', 'A practical route from analytical question to clear, accessible communication.', [
    { heading: 'How the course is organized', body: '<p>Work through the foundations first, then use the decision framework to choose a visual form. The chart library applies those decisions to individual chart types. Each chart lesson connects purpose, interpretation, design, communication and code.</p><ul><li><strong>Foundations:</strong> visual perception, color, typography and accessibility.</li><li><strong>Visualization thinking:</strong> question framing, data structure and chart selection.</li><li><strong>Communication:</strong> audience, titles, annotations and honest interpretation.</li><li><strong>Chart library:</strong> use cases, mechanics, alternatives and common mistakes.</li><li><strong>Implementation:</strong> Plotly in R, Python with pandas and Polars, and JavaScript.</li></ul>' },
    { heading: 'A repeatable way to work', body: '<ol><li>Write the question in one sentence.</li><li>Identify the observation, measure, dimensions and time grain.</li><li>Classify the task: compare, trend, distribution, relationship, composition, flow or location.</li><li>Choose an encoding that makes the answer easy to perceive.</li><li>Test the design with the intended audience and an accessible alternative.</li><li>Write the insight and its limitations in plain language.</li></ol>' },
    { heading: 'Use the examples critically', body: '<p>Examples use small, illustrative datasets so the mechanics remain visible. They are not evidence about a real business. Replace them with your own data when practicing and retain the data definitions, units and assumptions.</p>' }
  ], 'history'),
  history: lesson('A short history of data visualization', 'Foundations', 'How statistical graphics developed as tools for explanation, investigation and decision-making.', [
    { heading: 'From tables to visual arguments', body: '<p>Statistical graphics developed to make relationships, changes and patterns visible. The lesson from their history is that a visual form should be selected to reveal the structure of a problem, not simply because it looks familiar.</p>' },
    { heading: 'Four influential examples', body: '<div class="history-list"><article><span class="history-date">1786</span><div><h3>William Playfair</h3><p>Used line and bar charts to communicate economic quantities and changes over time. His work helped establish familiar statistical graphic forms.</p></div></article><article><span class="history-date">1854</span><div><h3>John Snow</h3><p>Mapped cholera deaths and water pumps in London. Spatial arrangement helped reveal a pattern that a table of cases would have made harder to see.</p></div></article><article><span class="history-date">1858</span><div><h3>Florence Nightingale</h3><p>Used polar-area diagrams to communicate causes of mortality and advocate for improved sanitary conditions.</p></div></article><article><span class="history-date">1869</span><div><h3>Charles Minard</h3><p>Combined geography, troop size, direction and temperature in a flow map of Napoleon’s Russian campaign. It demonstrates both information density and careful visual hierarchy.</p></div></article></div>' },
    { heading: 'What carries forward', body: '<ul><li>Encode the important comparison using a visual channel people can judge accurately.</li><li>Provide context: units, time period, geography and relevant baselines.</li><li>Keep the visual honest. Do not let decoration distort magnitude or direction.</li><li>Use annotation and narrative to explain why the pattern matters.</li></ul>' }
  ], 'perception'),
  perception: lesson('Visual perception and graphical encoding', 'Foundations', 'Understand why some visual channels communicate values more accurately than others.', [
    { heading: 'Encode data with visual channels', body: '<p>Visualization maps data fields to position, length, angle, area, color, shape, orientation or connection. These channels are not equally easy to compare. Aligned position and length are generally strong choices for quantitative comparison; area and angle require more effort and are harder to estimate precisely.</p><div class="encoding-table"><div><strong>Position</strong><span>Strong for ordered comparisons and trends</span></div><div><strong>Length</strong><span>Strong for magnitude when baselines are clear</span></div><div><strong>Angle / area</strong><span>Useful for part-to-whole, less precise for comparison</span></div><div><strong>Color hue</strong><span>Useful for categories, not ordered magnitude</span></div><div><strong>Lightness</strong><span>Useful for ordered intensity when contrast is adequate</span></div><div><strong>Shape</strong><span>Useful for a small number of categories</span></div></div>' },
    { heading: 'Use visual hierarchy deliberately', body: '<p>Give the most important information the strongest visual position. A clear title, restrained accent color, direct labels and adequate whitespace help the reader follow the intended order. Gridlines, borders and legends should support interpretation rather than compete with the data.</p>' },
    { heading: 'Reduce cognitive load', body: '<ul><li>Remove elements that do not help answer the question.</li><li>Keep units, scales and category labels explicit.</li><li>Limit the number of simultaneously distinguished categories.</li><li>Use direct labels when easier to scan than a distant legend.</li><li>Separate the main finding from supporting detail.</li></ul>' }
  ], 'color'),
  color: lesson('Color theory and data palettes', 'Foundations', 'Select colors according to the structure of the variable, not personal preference.', [
    { heading: 'Choose the palette family from the data', body: '<div class="palette-examples"><article><h3>Categorical</h3><p>Use distinct hues for unrelated groups. Keep categories manageable and pair color with labels or another distinguishing cue.</p><div class="swatches categorical" aria-label="Categorical palette sample"><i></i><i></i><i></i><i></i><i></i></div></article><article><h3>Sequential</h3><p>Use a consistent progression in lightness for ordered values, such as low-to-high volume. A single-hue scale is often easier to interpret than a rainbow.</p><div class="swatches sequential" aria-label="Sequential palette sample"><i></i><i></i><i></i><i></i><i></i></div></article><article><h3>Diverging</h3><p>Use two contrasting directions around a meaningful midpoint, such as negative and positive variance from target.</p><div class="swatches diverging" aria-label="Diverging palette sample"><i></i><i></i><i></i><i></i><i></i></div></article></div>' },
    { heading: 'Practical color rules', body: '<ul><li>Use hue to distinguish categories and lightness to communicate ordered magnitude.</li><li>Reserve a strong accent for the observation or comparison that matters most.</li><li>Do not use red and green as the only distinction between outcomes.</li><li>Check palettes in grayscale and with common color-vision-deficiency simulations.</li><li>Maintain contrast between marks, backgrounds, labels and boundaries.</li><li>Avoid rainbow scales for ordered variables unless there is a defensible reason.</li></ul>' },
    { heading: 'Apply the right palette', body: '<p>For actual sales against target, a diverging palette can distinguish below-target from above-target values because zero variance is a meaningful midpoint. For sales volume from low to high, use a sequential palette.</p>' }
  ], 'typography'),
  typography: lesson('Font and typography', 'Foundations', 'Make titles, labels and numeric values easy to scan at the size and distance where they will be read.', [
    { heading: 'Use type to establish hierarchy', body: '<p>Typography should make the reading order obvious. Use a clear title, a concise explanatory subtitle when needed, legible axis labels and restrained annotation. This application uses Inter as its interface typeface.</p><div class="type-specimen"><div class="type-title">Revenue growth is concentrated in two regions</div><div class="type-subtitle">Year-over-year change, by region · FY2025</div><div class="type-label">Revenue change (%)</div><div class="type-note">Source: illustrative sales dataset</div></div>' },
    { heading: 'Practical guidance', body: '<ul><li>Write chart titles as the main finding when communicating a conclusion.</li><li>Keep axis labels short and include units.</li><li>Use sentence case and familiar terms.</li><li>Avoid multiple typefaces or excessive weights.</li><li>Do not shrink labels to fit an overloaded chart; simplify or split the view.</li><li>Check readability at the actual presentation size.</li></ul>' },
    { heading: 'The application text-size control', body: '<p>Use the global Small, Medium and Large control in the page header. It scales application typography and rem-based layout dimensions. It does not replace browser zoom or operating-system accessibility settings.</p>' }
  ], 'accessibility'),
  accessibility: lesson('Accessible data visualization', 'Foundations', 'Design charts and interfaces so information remains available across different ways of seeing and interacting.', [
    { heading: 'Do not rely on color alone', body: '<p>Use direct labels, marker shapes, line styles, patterns or explicit values alongside color. A person should still be able to distinguish series when a chart is printed in grayscale or viewed by someone with color-vision deficiency.</p>' },
    { heading: 'Contrast and text', body: '<ul><li>Target at least 4.5:1 contrast for normal text and 3:1 for large text.</li><li>Use at least 3:1 contrast for meaningful graphical objects and UI boundaries.</li><li>Support text resizing to 200% without loss of content or functionality.</li><li>Support reflow at narrow viewport widths without unnecessary two-dimensional scrolling.</li><li>Ensure keyboard focus is visible and controls have accessible names.</li></ul>' },
    { heading: 'Give charts a text alternative', body: '<p>Provide a concise description of the chart’s purpose and main pattern, plus an accessible table or downloadable data where appropriate. Explain what is plotted, what the axes represent and the important comparison.</p>' },
    { heading: 'Validation checklist', body: '<div class="checklist"><label><input type="checkbox"> The title and units explain what is shown.</label><label><input type="checkbox"> Color is not the only way to distinguish values or categories.</label><label><input type="checkbox"> Text and important marks have sufficient contrast.</label><label><input type="checkbox"> A text description and data alternative are available.</label><label><input type="checkbox"> Controls work with a keyboard and show focus.</label><label><input type="checkbox"> The view remains usable when text is enlarged.</label></div><p class="small-note">This checklist is a learning aid, not an automated WCAG conformance test.</p>' }
  ], 'decision'),
  decision: lesson('The visualization decision framework', 'Visualization thinking', 'A six-step process for choosing and validating a visual representation.', [
    { heading: 'Start with the decision, not the chart', body: '<p>Before opening a plotting library, write down the audience, the question and what the audience may need to do with the answer. A chart is useful when it helps someone compare, detect, estimate, explore or decide.</p><ol class="decision-flow"><li><strong>Question</strong><span>What needs to be understood?</span></li><li><strong>Data</strong><span>What is measured and grouped?</span></li><li><strong>Task</strong><span>Compare, trend, distribute, relate, compose or map?</span></li><li><strong>Visual</strong><span>Which encoding makes the task easiest?</span></li><li><strong>Validation</strong><span>Is it accurate, readable and accessible?</span></li><li><strong>Communication</strong><span>What should this audience take away?</span></li></ol>' },
    { heading: 'Example: monthly revenue', body: '<p><strong>Question:</strong> Is revenue increasing over the year, and when did the pattern change?</p><p><strong>Data:</strong> Monthly revenue, one observation per month, consistent currency units.</p><p><strong>Task:</strong> Trend over time.</p><p><strong>Candidate:</strong> A line chart because month is ordered and continuity is relevant. A bar chart can be preferable when the main task is comparing discrete monthly totals without implying continuity.</p><p><strong>Validation:</strong> Check missing months, currency, time range and whether the vertical axis could exaggerate change.</p><p><strong>Communication:</strong> State the overall direction and where the pattern changed, then note limitations.</p>' }
  ], 'selection'),
  selection: lesson('Choose the right chart', 'Visualization thinking', 'Map common analytical tasks to suitable visual forms and understand the trade-offs.', [
    { heading: 'Match the visual to the task', body: '<div class="selection-table"><table><thead><tr><th scope="col">Analytical task</th><th scope="col">Good starting points</th><th scope="col">Watch for</th></tr></thead><tbody><tr><th scope="row">Compare categories</th><td>Bar, dot, lollipop</td><td>Too many categories; truncated baselines</td></tr><tr><th scope="row">Show a trend</th><td>Line, step, area</td><td>Irregular intervals; missing periods</td></tr><tr><th scope="row">Understand distribution</th><td>Histogram, box, violin, ECDF</td><td>Hidden sample size or shape</td></tr><tr><th scope="row">Explore a relationship</th><td>Scatter, density, hexbin</td><td>Overplotting; correlation vs causation</td></tr><tr><th scope="row">Show composition</th><td>Stacked bar, treemap, pie</td><td>Hard-to-compare segments; changing totals</td></tr><tr><th scope="row">Show flow</th><td>Sankey, network</td><td>Too many links; unclear units</td></tr><tr><th scope="row">Show geography</th><td>Choropleth, proportional symbol</td><td>Area effects; misleading denominators</td></tr></tbody></table></div>' },
    { heading: 'Ask before committing', body: '<ul><li>What does each mark represent: an observation, an aggregate or an estimate?</li><li>Is the x-axis ordered, continuous, categorical or spatial?</li><li>Does the audience need precise comparisons or a broad pattern?</li><li>How many series or categories can be distinguished comfortably?</li><li>Would a table or a sentence communicate the result more clearly?</li><li>What alternative chart would challenge the first choice?</li></ul>' }
  ], 'data'),
  data: lesson('Understand the structure of your data', 'Visualization thinking', 'Identify measures, dimensions, granularity, missing values and aggregation before plotting.', [
    { heading: 'Know what a row represents', body: '<p>Granularity is the level of detail represented by one record. A transaction-level dataset, daily summary and monthly summary can produce different charts and conclusions. State the grain before aggregating or joining data.</p>' },
    { heading: 'Separate measures and dimensions', body: '<ul><li><strong>Measures:</strong> quantities such as revenue, cost, duration or count.</li><li><strong>Dimensions:</strong> descriptors such as region, product, customer segment or date.</li><li><strong>Identifiers:</strong> keys used to distinguish records, not necessarily useful chart variables.</li><li><strong>Derived measures:</strong> rates, ratios or changes that require documented denominators or baselines.</li></ul>' },
    { heading: 'Data quality checks', body: '<ul><li>Check missing dates, duplicate records and unexpected categories.</li><li>Confirm units, currencies, time zones and denominator definitions.</li><li>Distinguish zero from missing or not applicable.</li><li>Investigate extreme values before removing them.</li><li>Record filters and aggregation rules.</li></ul>' }
  ], 'audiences'),
  audiences: lesson('Communicate to technical and business audiences', 'Communication', 'Keep the data consistent while changing the level of detail and emphasis for the reader.', [
    { heading: 'One analysis, two explanations', body: '<div class="audience-comparison"><article><h3>Technical audience</h3><p class="audience-example">“Monthly revenue increased 12% year over year. Growth was concentrated in the West and Central regions; these two regions contributed 78% of the net increase. The comparison uses recognized revenue and excludes one-time credits.”</p><ul><li>Define measures and time windows.</li><li>Show methods, assumptions and data limitations.</li><li>Provide detail needed to reproduce or challenge the analysis.</li></ul></article><article><h3>Business audience</h3><p class="audience-example">“Revenue is growing, but most of the increase comes from two regions. The next step is to understand what is driving their performance and whether the other regions can repeat it.”</p><ul><li>Lead with the implication.</li><li>Use familiar business language.</li><li>Make the next decision or question explicit.</li></ul></article></div>' },
    { heading: 'What should stay consistent', body: '<p>Do not change the underlying facts to suit the audience. Keep the measure, period, comparison and caveats consistent. Change the amount of detail, terminology and emphasis, not the evidence.</p>' }
  ], 'narrative'),
  narrative: lesson('Titles, annotations and visual narrative', 'Communication', 'Guide readers through the finding without making the chart do more than the data supports.', [
    { heading: 'Write a title that carries meaning', body: '<p>A descriptive title identifies the measure and scope. An insight-led title states the main pattern when evidence supports it. A subtitle can clarify the date range, population, unit or method.</p><div class="title-examples"><div><small>Descriptive</small><strong>Monthly revenue by region, FY2025</strong></div><div><small>Insight-led</small><strong>Two regions account for most of the revenue increase</strong></div></div>' },
    { heading: 'Use annotations sparingly', body: '<ul><li>Annotate a meaningful change, threshold, event or exception.</li><li>Place the annotation near the relevant mark.</li><li>Explain context, not the obvious shape of the chart.</li><li>Do not add a causal explanation unless the analysis supports it.</li></ul>' },
    { heading: 'A compact communication structure', body: '<ol><li><strong>Finding:</strong> what changed or differs?</li><li><strong>Evidence:</strong> which values or comparisons support it?</li><li><strong>Context:</strong> what definition, limitation or event matters?</li><li><strong>Implication:</strong> what should the reader consider next?</li></ol>' }
  ], 'misleading'),
  misleading: lesson('Avoid misleading charts', 'Communication', 'Recognize visual choices that distort magnitude, hide uncertainty or invite unsupported conclusions.', [
    { heading: 'Common sources of distortion', body: '<ul><li><strong>Truncated bar baselines:</strong> can exaggerate differences when bars encode magnitude from zero.</li><li><strong>Inconsistent scales:</strong> make comparisons across panels unreliable.</li><li><strong>Dual axes:</strong> can imply a relationship that depends on arbitrary scale choices.</li><li><strong>Missing context:</strong> hides units, time windows, denominators or sample sizes.</li><li><strong>Overplotting:</strong> conceals density and individual observations.</li><li><strong>Area and 3D effects:</strong> can make visual magnitude hard to compare.</li><li><strong>Cherry-picked windows:</strong> show a trend without the surrounding baseline.</li></ul>' },
    { heading: 'Represent uncertainty and limitations', body: '<p>Show intervals, error bars, sample sizes or distribution when they materially affect interpretation. Explain what the interval represents. Avoid presenting estimates as exact facts or treating association as proof of causation.</p>' },
    { heading: 'Review before sharing', body: '<p>Ask a colleague to state the chart’s main message without reading your explanation. If their interpretation differs from yours, improve the encoding, labels or context rather than adding more prose.</p>' }
  ], 'bar'),
  practice: lesson('Practice with a repeatable review method', 'Practice', 'Build a chart, explain its message and critique the choices before sharing it.', [
    { heading: 'A practical exercise', body: '<p>Use the supplied retail dataset or one of your own. Start with: “How did revenue change by month, and which region contributed most to the change?”</p><ol><li>Confirm the grain and definition of revenue.</li><li>Aggregate to month and region.</li><li>Use a line chart for the trend and a bar chart for the regional comparison.</li><li>Write one technical explanation and one business explanation.</li><li>Review color, contrast, text alternatives and scale choices.</li></ol><p><a class="inline-link" href="datasets/retail_monthly.csv" download>Download the sample retail dataset (CSV)</a></p>' },
    { heading: 'Chart review checklist', body: '<div class="checklist"><label><input type="checkbox"> The chart answers one clear question.</label><label><input type="checkbox"> Each row, measure, unit and aggregation is understood.</label><label><input type="checkbox"> The chart type matches the analytical task.</label><label><input type="checkbox"> The axis, baseline and scale are appropriate.</label><label><input type="checkbox"> The palette and typography support interpretation.</label><label><input type="checkbox"> A reader can explain the takeaway without guessing.</label><label><input type="checkbox"> Limitations and uncertainty are stated.</label></div>' }
  ], 'dataset-lab'),
  'dataset-lab': lesson('Explore a dataset of your own', 'Practice', 'Load a local CSV, inspect its columns and create a Plotly chart in your browser.', [
    { heading: 'Upload a CSV file', body: '<p>The file is read locally in your browser and is not sent to a server. Choose a file with a header row and a modest number of rows, or load the bundled retail example. The app supports comma-separated files with quoted values up to 5 MB and 10,000 rows. Bar and line charts can aggregate values by X. You can split the chart into series, filter rows by a category, change the palette, and explore the chart with hover, zoom and pan controls. ISO-format dates and numeric X values are sorted for line charts, while other categories retain their first-seen order.</p><div class="upload-panel"><div class="upload-actions"><label class="upload-label" for="csv-file">Choose CSV file</label><button type="button" class="button button-secondary" id="load-sample-dataset">Try sample retail data</button><a class="inline-link" href="datasets/retail_monthly.csv" download>Download sample CSV</a></div><input id="csv-file" type="file" accept=".csv,text/csv"><p id="upload-status" class="small-note" aria-live="polite">No file selected.</p><div id="dataset-controls" class="dataset-controls" hidden><div><label for="x-column">X column</label><select id="x-column"></select></div><div><label for="y-column">Y column</label><select id="y-column"></select></div><div><label for="series-column">Split into series</label><select id="series-column"><option value="">No split</option></select></div><div><label for="filter-column">Filter rows by</label><select id="filter-column"><option value="">No filter</option></select></div><div id="filter-value-wrap" hidden><label for="filter-value">Keep value</label><select id="filter-value"><option value="__all__">All values</option></select></div><div><label for="chart-type">Chart type</label><select id="chart-type"><option value="bar">Bar</option><option value="line">Line</option><option value="scatter">Scatter</option></select></div><div><label for="aggregation">Aggregation</label><select id="aggregation"><option value="sum" selected>Sum</option><option value="mean">Mean</option><option value="count">Count</option><option value="none">No aggregation</option></select></div><div><label for="data-palette">Color palette</label><select id="data-palette"><option value="blue">Blue and teal</option><option value="accessible">Colorblind-considerate</option><option value="warm">Warm</option></select></div><button type="button" class="button button-primary" id="draw-uploaded-chart">Create chart</button></div></div><div id="uploaded-preview" class="uploaded-preview"></div><div class="uploaded-chart-heading" id="uploaded-chart-heading" hidden><p id="uploaded-chart-description" class="small-note" aria-live="polite"></p><button type="button" class="copy-button" id="download-uploaded-chart" hidden>Download PNG</button></div><div id="uploaded-chart" class="uploaded-chart" hidden role="group" aria-label="Chart created from the locally selected CSV"></div><div id="uploaded-data-table" class="uploaded-data-table"></div><a id="uploaded-data-download" class="inline-link" hidden download="viznova-chart-data.csv">Download plotted data (CSV)</a>' },
    { heading: 'Questions to ask before interpreting', body: '<ul><li>What does each row represent?</li><li>Are the chosen columns suitable for the selected chart?</li><li>Are values missing, duplicated or recorded in mixed units?</li><li>Could aggregation be hiding a pattern?</li><li>What does the chart not tell you?</li></ul>' }
  ], 'implementation'),
  implementation: lesson('Plotly implementation guide', 'Implementation', 'Use the same visual logic across Plotly R, Plotly Express and Plotly.js.', [
    { heading: 'Choose the right Plotly interface', body: '<ul><li><strong>R:</strong> use the <code>plotly</code> package and <code>plot_ly()</code> for trace-level construction.</li><li><strong>Python:</strong> use Plotly Express for common chart types and Graph Objects when you need granular trace and layout control.</li><li><strong>pandas:</strong> pass a DataFrame to Plotly Express or use explicit data columns.</li><li><strong>Polars:</strong> Plotly.py 6 supports Polars DataFrames in Plotly Express through its dataframe compatibility layer. Use Plotly.py 6 or later for the Polars examples in this course.</li><li><strong>JavaScript:</strong> use Plotly.js with traces and a layout object.</li></ul><p><strong>Python setup:</strong> <code>python -m pip install "plotly&gt;=6.0" pandas polars</code>. <strong>R setup:</strong> <code>install.packages("plotly")</code>.</p>' },
    { heading: 'A consistent implementation workflow', body: '<ol><li>Prepare and validate data before plotting.</li><li>Create the chart with the correct analytical encoding.</li><li>Set labels, units, axes, legend and title.</li><li>Apply a color system that reinforces the meaning.</li><li>Check responsive behavior and hover content.</li><li>Provide a text description and data alternative.</li><li>Export or embed only after review.</li></ol>' },
    { heading: 'Keep design consistent across languages', body: '<p>Do not let the programming language determine the analytical choice. The intended chart, measures, grouping, labels and interpretation should remain equivalent across all implementations. Syntax will differ, but the visual argument should not.</p>' }
  ], 'sources'),
  sources: lesson('Sources and further reading', 'References', 'Technical documentation and standards used throughout the lessons.', [
    { heading: 'Plotly documentation', body: '<p>Use the official documentation to check trace properties, layout options, examples and language-specific behavior.</p><ul><li><a class="inline-link" href="https://plotly.com/javascript/" target="_blank" rel="noopener">Plotly.js documentation</a></li><li><a class="inline-link" href="https://plotly.com/python/" target="_blank" rel="noopener">Plotly Python documentation</a></li><li><a class="inline-link" href="https://plotly.com/r/" target="_blank" rel="noopener">Plotly R documentation</a></li></ul>' },
    { heading: 'Accessibility', body: '<p>Use the Web Content Accessibility Guidelines as the reference for keyboard access, contrast, text resizing, reflow and accessible alternatives.</p><p><a class="inline-link" href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noopener">W3C Web Content Accessibility Guidelines 2.2</a></p>' },
    { heading: 'Visualization and communication', body: '<p>Viznova provides original explanations, examples and implementation patterns. Use these references to explore the underlying Plotly features and accessibility requirements in more depth.</p>' }
  ])
};

const descriptions = {
  bar: { group: 'Comparison', summary: 'Compare values across discrete categories using aligned lengths.', purpose: 'A bar chart compares a quantitative measure across categories. The common zero baseline makes differences in bar length interpretable.', when: ['Compare totals or rates across a manageable number of categories.', 'Rank products, regions, teams or periods.', 'Compare groups when labels and baselines remain clear.'], avoid: ['The main task is a continuous time trend; consider a line chart.', 'There are too many categories for labels to remain readable.', 'A stacked bar makes middle segments difficult to compare.'], mechanics: 'Bar length encodes magnitude. For ordinary magnitude comparisons, start the quantitative axis at zero. Use horizontal bars for long labels. Order categories intentionally and label the unit.', design: ['Start the quantitative axis at zero for bar-length comparisons.', 'Sort categories by a meaningful sequence or value.', 'Use one neutral color and reserve an accent for a useful comparison.', 'Prefer direct labels for a small number of values.'], message: 'Technical: “West records the highest revenue at $41k, followed by North at $34k.” Business: “West leads, with a $7k gap over North.” State the period and revenue definition.', mistakes: ['A non-zero baseline that exaggerates differences.', 'Too many colors without meaning.', '3D bars or gradients that impair length comparison.'], reference: 'https://plotly.com/javascript/' },
  line: { group: 'Trend', summary: 'Show how a measure changes across an ordered sequence, usually time.', purpose: 'A line chart connects observations in an ordered dimension to reveal direction, turning points, seasonality and change over time.', when: ['Show a time series with meaningful order.', 'Compare a small number of series across the same period.', 'Show a target or reference threshold alongside actual values.'], avoid: ['The x-axis is unordered categories; use bars or dots.', 'Many overlapping series obscure the pattern.', 'Connecting points suggests continuity that the data does not support.'], mechanics: 'Position encodes x and y; the connecting line emphasizes sequence. Check date gaps, interval consistency and aggregation grain. Do not imply measured values between points if they are not meaningful.', design: ['Keep time increasing from left to right.', 'Use direct labels or a compact legend for a few series.', 'Use markers when individual observations matter.', 'Label the y-axis with units and make a non-zero baseline deliberate.'], message: 'Technical: “Revenue rose from $42k in January to $71k in June, with a small decline in April.” Business: “Revenue is trending upward overall, although April interrupted the growth.” Do not infer the cause from the line alone.', mistakes: ['Connecting unordered points.', 'Using dual axes to manufacture apparent correlation.', 'Smoothing without explaining the method.'], reference: 'https://plotly.com/javascript/' },
  scatter: { group: 'Relationship', summary: 'Examine two quantitative variables and identify clusters or unusual observations.', purpose: 'A scatter plot positions each observation by two quantitative values. It reveals direction, form, spread, clusters and possible outliers.', when: ['Explore association between two numerical variables.', 'Look for clusters, nonlinear patterns or unusual observations.', 'Check whether a relationship changes across a meaningful group.'], avoid: ['One or both variables are categorical.', 'Thousands of points overlap; consider transparency, binning, density or hexbin.', 'The reader may mistake association for cause.'], mechanics: 'Each point represents an observation. X and y position encode the values. Color, shape or size can add a variable, but each extra channel increases interpretation effort.', design: ['Label both axes and units.', 'Use transparency or density when points overlap.', 'Map size only when area differences are meaningful and labeled.', 'Use trend lines as summaries, not proof of causation.'], message: 'Technical: “The sample shows a positive association between advertising spend and orders, with substantial dispersion.” Business: “Higher spend tends to accompany higher orders in this sample, but spend alone does not explain orders.”', mistakes: ['Overplotting without showing density.', 'Encoding size without an area interpretation.', 'Interpreting correlation as causation.'], reference: 'https://plotly.com/javascript/' },
  histogram: { group: 'Distribution', summary: 'Show a quantitative distribution by grouping values into bins.', purpose: 'A histogram displays the frequency or density of values within adjacent intervals. It reveals concentration, skew, spread, gaps and possible multiple modes.', when: ['Understand the distribution of one continuous variable.', 'Compare distributions across groups using consistent bins.', 'Investigate skew, spread and potential outliers.'], avoid: ['The variable is categorical; use a bar chart.', 'The bin width is arbitrary and changes the story.', 'The sample is very small and individual values are more useful.'], mechanics: 'The x-axis contains adjacent numeric intervals. Bar height represents count or density. Bin width changes the detail visible, so disclose the choice when it matters.', design: ['Use a meaningful bin width and consistent bins across comparisons.', 'Label the y-axis as count, proportion or density.', 'Do not leave gaps between bins for a continuous variable.', 'Consider an ECDF or dot plot for exact observations.'], message: 'Technical: “The distribution is right-skewed, with most observations between 3 and 8 days and a long upper tail.” Business: “Most cases finish within about a week, but a smaller group takes much longer.”', mistakes: ['Choosing a misleading bin width.', 'Comparing histograms with different bins or scales.', 'Treating bins as separate categories.'], reference: 'https://plotly.com/javascript/' },
  box: { group: 'Distribution', summary: 'Compare medians, quartiles, spread and potential outliers across groups.', purpose: 'A box plot summarizes a distribution using the median, quartiles and whiskers. It is compact and useful when comparing several groups.', when: ['Compare a continuous variable across categories.', 'Show median and interquartile range across many groups.', 'Identify observations beyond the whisker rule for investigation.'], avoid: ['The detailed shape or multiple modes are essential; use a violin plot or histogram.', 'The sample is tiny and each point matters; add points or use a dot plot.', 'Readers may assume flagged observations are errors.'], mechanics: 'The box spans the first to third quartile; the internal line marks the median. Whisker definitions vary, often extending to the most extreme points within 1.5 times the interquartile range. Points beyond are flagged, not automatically errors.', design: ['State the whisker convention when interpretation matters.', 'Order groups intentionally.', 'Add sample sizes when group size varies materially.', 'Overlay jittered points for small samples when useful.'], message: 'Technical: “South has a higher median and wider interquartile range than North; its upper values also extend further.” Business: “South has typically longer resolution times and more variation in this small illustrative sample.”', mistakes: ['Calling every point beyond a whisker an error.', 'Using box plots when distribution shape is central.', 'Ignoring sample-size differences.'], reference: 'https://plotly.com/javascript/' },
  violin: { group: 'Distribution', summary: 'Compare estimated distribution shape across groups.', purpose: 'A violin plot mirrors a density estimate to show where values are concentrated. It reveals distribution shape that a box plot can hide.', when: ['Compare distribution shape across groups.', 'Look for skew, multiple modes or concentration differences.', 'Pair with median, quartiles or individual points.'], avoid: ['Samples are very small and density smoothing would imply unsupported precision.', 'Exact quartiles are the only requirement; use a box plot.', 'Many violins create a dense display.'], mechanics: 'Width represents estimated density at each value, not the number of observations directly. The shape depends on bandwidth and smoothing choices.', design: ['Show sample sizes and use consistent smoothing settings.', 'Add median or quartile markers.', 'Do not interpret small bumps as real modes without validation.', 'Use restrained fill and clear group labels.'], message: 'Technical: “Group B spans a wider range and includes higher observations than Group A; the small samples do not support a reliable claim about multiple modes.” Business: “Group B shows more variation and some higher values; more observations are needed before drawing a firm conclusion.”', mistakes: ['Treating width as count without defining scale.', 'Ignoring density bandwidth.', 'Hiding individual values for small samples.'], reference: 'https://plotly.com/javascript/' },
  area: { group: 'Trend and composition', summary: 'Emphasize magnitude over an ordered dimension or show cumulative composition.', purpose: 'An area chart fills the space between a line and a baseline. It emphasizes magnitude over an ordered axis; stacked areas can show composition over time.', when: ['Show how total volume changes across an ordered dimension.', 'Show cumulative series when both total and contributions matter.', 'Emphasize the size of a measure rather than only its trajectory.'], avoid: ['Precise comparisons between middle stacked series are important.', 'Negative values or a non-zero baseline make filled areas confusing.', 'Many overlapping series obscure the view.'], mechanics: 'Vertical distance from the baseline encodes value. In stacked areas, series accumulate, changing the visual baseline for all but the first series.', design: ['Use a zero baseline when showing magnitude.', 'Use transparency carefully for overlapping series.', 'Consider small multiples or stacked bars for component comparisons.', 'Label the total and units.'], message: 'Technical: “Total volume increased, while the relative share of the largest component declined.” Business: “The total is growing, but the mix is shifting.”', mistakes: ['Comparing middle stacked layers precisely.', 'Stacking negative values without explanation.', 'Using filled areas for unordered categories.'], reference: 'https://plotly.com/javascript/' },
  heatmap: { group: 'Relationship and intensity', summary: 'Show a matrix of values using color to reveal patterns across two dimensions.', purpose: 'A heatmap encodes a matrix value using color. It is useful for scanning patterns across combinations such as day and hour, category and month, or correlation pairs.', when: ['Compare values across two categorical or ordered dimensions.', 'Identify clusters or high/low regions in a matrix.', 'Show a correlation matrix when variables and scale are clear.'], avoid: ['Readers need precise values and a table or dot plot would be clearer.', 'The palette does not fit the data’s midpoint or direction.', 'Rows and columns cannot be labeled or navigated.'], mechanics: 'Position identifies row and column; color encodes the cell value. The color bar must explain direction, units and midpoint.', design: ['Use sequential scales for ordered non-negative values or diverging scales around a meaningful midpoint.', 'Keep scale limits consistent across comparisons.', 'Provide cell values when the matrix is small.', 'Do not rely on hue alone.'], message: 'Technical: “The strongest values cluster in weekday afternoon periods.” Business: “Demand is concentrated in weekday afternoons, which may affect staffing.”', mistakes: ['No explanation of the color scale.', 'Comparing heatmaps with different scales.', 'Using rainbow palettes that make ordering difficult.'], reference: 'https://plotly.com/javascript/heatmaps/' },
  pie: { group: 'Composition', summary: 'Show a small number of categories as shares of a meaningful whole.', purpose: 'A pie chart encodes part-to-whole values as angles and areas. It can work when there are few clearly different parts that sum to a well-defined total.', when: ['Show a simple composition with a small number of categories.', 'The values sum to a complete, well-defined total.', 'The largest and smallest parts are easy to identify.'], avoid: ['Precise comparisons between similar-sized categories are important.', 'There are many categories or tiny segments.', 'The values do not form a meaningful whole. A bar chart is usually better.'], mechanics: 'Each slice angle is proportional to its share of the total. Comparing angles and areas is less precise than comparing aligned lengths.', design: ['Limit the number of slices and label directly where possible.', 'Keep category colors stable across related charts.', 'Avoid 3D effects and exploded slices.', 'Show the total or denominator.'], message: 'Technical: “Category A represents 46% of the total; Category B represents 31%.” Business: “Nearly half of the total comes from Category A.”', mistakes: ['Using pie charts for time series or ranking.', 'Showing many similar-sized slices.', 'No denominator or total context.'], reference: 'https://plotly.com/javascript/' },
  treemap: { group: 'Composition', summary: 'Show hierarchical part-to-whole structure using nested rectangles.', purpose: 'A treemap uses nested rectangles to display hierarchical categories, with rectangle area encoding a quantitative measure.', when: ['Show composition across a hierarchy such as business unit, category and product.', 'Compare broad contributions while preserving parent-child structure.', 'Scan a large set of categories.'], avoid: ['Precise comparisons between similar small areas are required.', 'The hierarchy is not meaningful.', 'Labels become crowded or too small.'], mechanics: 'Each rectangle represents a node. Area is proportional to the encoded value; nesting represents hierarchy. Color may encode a second measure, but should not obscure area meaning.', design: ['Use clear labels and meaningful nesting.', 'Use color for a second measure only when useful and defined.', 'Provide a table or drill-down for precise values.', 'Do not use color alone to distinguish hierarchy.'], message: 'Technical: “The largest parent category contributes the greatest share, with two subcategories accounting for most of its area.” Business: “A small number of categories account for most of the total.”', mistakes: ['Treating area as a precise comparison tool.', 'Too many nesting levels.', 'Encoding unrelated measures in color without explanation.'], reference: 'https://plotly.com/javascript/treemaps/' },
  sankey: { group: 'Flow', summary: 'Represent quantities moving between stages, states or groups.', purpose: 'A Sankey diagram shows flows between nodes. Link width represents quantity, making it useful for movement, allocation and conversion across stages.', when: ['Show how volume moves through a process or system.', 'Explain sources, destinations, losses or branching paths.', 'Compare flow sizes with a manageable number of links.'], avoid: ['Flow data is incomplete or quantities are not comparable.', 'There are too many links to trace.', 'The task is simply comparing stage totals; bars may be clearer.'], mechanics: 'Nodes represent stages or entities; links represent movement. Link width is proportional to flow quantity. Units and direction must be explicit.', design: ['Order stages to follow process direction.', 'Label units and totals.', 'Use color to distinguish flows only when useful.', 'Group low-volume links transparently.'], message: 'Technical: “Of 1,000 initial cases, 720 progress to review, 510 reach approval and 430 are completed; 570 cases exit to the closed state across the process.” Business: “A substantial share of cases close before completion; examine where and why they exit.”', mistakes: ['Comparing widths with different units.', 'Too many crossing links.', 'Unexplained grouping of categories.'], reference: 'https://plotly.com/javascript/sankey-diagram/' },

  dotplot: { group: 'Distribution', summary: 'Show individual observations as stacked dots along a quantitative scale.', purpose: 'A dot plot places each observation on a common numeric axis. Repeated values stack so the reader can see both exact values and their frequency.', when: ['Show a small or moderate set of individual numeric observations.', 'Compare repeated values without grouping them into histogram bins.', 'Keep the original observations visible.'], avoid: ['The dataset is very large and dots overlap heavily.', 'A smoothed distribution is the main question; consider a density plot.', 'The x-values are categories rather than numeric observations.'], mechanics: 'Each dot represents one observation. Dots with the same value stack vertically. Horizontal position preserves the exact measurement, while the stack height shows how often the value occurs.', design: ['Use a clear numeric scale and meaningful units.', 'Keep stack spacing consistent.', 'Use a dot plot for relatively small datasets.', 'Consider a strip chart when observations must also be separated by group.'], message: 'Technical: “The observations cluster around 3 to 5, with fewer values in the upper range.” Business: “Most cases fall in the middle of the range, with only a few unusually high values.”', mistakes: ['Using too many observations for a readable dot plot.', 'Treating the stack height as a second measured variable.', 'Hiding the unit or numeric scale.'], reference: 'https://plotly.com/javascript/' },
  density: { group: 'Distribution', summary: 'Show a smoothed estimate of a continuous variable distribution.', purpose: 'A density plot estimates the shape of a continuous distribution with a smooth curve. The area under the curve is one, so the y-axis represents probability density rather than a count.', when: ['Compare distribution shape across groups.', 'Inspect skew, multiple modes and concentration.', 'Use a smooth summary when individual observations are not the focus.'], avoid: ['The sample is very small.', 'The reader needs exact counts or frequencies.', 'The smoothing bandwidth would hide important structure.'], mechanics: 'A kernel density estimate places a smooth kernel around each observation and combines them. Bandwidth controls the amount of smoothing. A larger bandwidth produces a smoother curve but can hide detail.', design: ['State the bandwidth or smoothing method when it affects interpretation.', 'Use the same bandwidth when comparing groups.', 'Label the vertical axis as density.', 'Consider showing rug marks or a sample-size note.'], message: 'Technical: “The distribution is right-skewed, with a broad primary mode and a smaller concentration near the upper tail.” Business: “Most values sit in the lower range, while a smaller group has much higher values.”', mistakes: ['Reading density as a count.', 'Over-smoothing or under-smoothing.', 'Comparing curves with inconsistent scales or bandwidths.'], reference: 'https://plotly.com/javascript/' },
  dotchart: { group: 'Comparison', summary: 'Compare one quantitative measure across named categories using aligned dots.', purpose: 'A dot chart places one mark for each category on a shared quantitative scale. It offers a compact alternative to bars when the values and rank order matter more than filled area.', when: ['Rank values across categories.', 'Compare many categories with long labels.', 'Use a compact alternative to a bar chart.'], avoid: ['The audience needs a strong sense of volume from filled length.', 'There are multiple observations per category; consider a strip or box plot.', 'A part-to-whole relationship is the main task.'], mechanics: 'The numeric position encodes value and the category axis identifies the item. Because all dots share one scale, gaps and rankings are easy to compare.', design: ['Use a shared numeric scale.', 'Order categories by value or by a meaningful business sequence.', 'Use direct labels for important values.', 'Keep dot size consistent so position carries the comparison.'], message: 'Technical: “West is highest at 41, with a 7-unit gap over North.” Business: “West leads the comparison, while East is lowest.”', mistakes: ['Varying dot size without meaning.', 'Sorting categories inconsistently.', 'Removing the axis or units.'], reference: 'https://plotly.com/javascript/' },
  bubble: { group: 'Relationship', summary: 'Compare two numeric variables while encoding a third measure through bubble area.', purpose: 'A bubble chart extends a scatter plot by using marker area to encode a third quantitative variable. It can show relationships and relative magnitude in one view.', when: ['Explore two numeric variables and one additional measure.', 'Compare entities across position and magnitude.', 'Show a limited number of labeled observations.'], avoid: ['Precise comparison of the size variable is essential.', 'There are many overlapping points.', 'The audience may confuse bubble diameter with area.'], mechanics: 'Horizontal and vertical position encode two measures. Marker area encodes a third. The size scale should be based on area, not diameter, so a value twice as large has twice the area.', design: ['Use area-based size scaling.', 'Include a size legend or reference bubbles.', 'Use transparency to reveal overlap.', 'Label only useful observations.'], message: 'Technical: “Higher spend is associated with more conversions in this sample, while audience size varies across campaigns.” Business: “Campaigns with larger audiences tend to produce more conversions, but reach alone does not explain performance.”', mistakes: ['Scaling radius linearly instead of area.', 'Using too many bubbles.', 'Interpreting correlation as causation.'], reference: 'https://plotly.com/javascript/' },
  gauge: { group: 'Performance', summary: 'Show one current value against a meaningful range, target or threshold.', purpose: 'A gauge chart places a single metric in the context of a defined range. It is useful for status monitoring when thresholds have operational meaning.', when: ['Show progress toward a clear target.', 'Monitor a metric with defined acceptable and critical ranges.', 'Present one headline measure in a dashboard.'], avoid: ['Compare many metrics or categories.', 'The minimum, maximum or target is arbitrary.', 'Small value differences need precise comparison; use a bullet chart or dot chart.'], mechanics: 'The indicator shows the current value within a fixed range. Threshold bands and a target marker provide context. The displayed range must be consistent across comparisons.', design: ['Define the range and target explicitly.', 'Use thresholds that correspond to real decisions.', 'Label the unit and current value.', 'Avoid excessive color bands and decorative 3D effects.'], message: 'Technical: “Completion is 74% against an 80% target, a 6-point shortfall.” Business: “Completion is below target and needs attention.”', mistakes: ['Using arbitrary red, amber and green ranges.', 'Changing the maximum between comparable gauges.', 'Using a gauge when a simple number and target would be clearer.'], reference: 'https://plotly.com/javascript/indicators/' },
  balloon: { group: 'Relationship and intensity', summary: 'Use circle size to show counts or strength across two categorical dimensions.', purpose: 'A balloon plot places categories on two axes and uses circle area to show the count or magnitude for each combination. It makes concentration in a contingency table easier to scan.', when: ['Compare counts across two categorical variables.', 'Find combinations with high or low frequency.', 'Present a contingency table when a visual pattern is useful.'], avoid: ['Exact values must be compared precisely; include a table.', 'The grid is very dense.', 'Category ordering has no clear logic.'], mechanics: 'Each circle represents one category combination. Its area encodes the count or magnitude. Position identifies the row and column categories.', design: ['Scale circle area to the numeric value.', 'Keep category order meaningful.', 'Provide labels or an accessible data table.', 'Avoid overlapping circles by using a matrix layout.'], message: 'Technical: “Returning customers are concentrated in the web channel, while new customers are more evenly distributed.” Business: “Repeat activity is strongest online, which may guide retention investment.”', mistakes: ['Using radius rather than area to scale circles.', 'Leaving out zero or missing combinations without explanation.', 'Relying on circle size without a legend or values.'], reference: 'https://plotly.com/javascript/' },
  mosaic: { group: 'Composition', summary: 'Show the joint distribution of two categorical variables using adjacent rectangles.', purpose: 'A mosaic plot divides a rectangle into tiles. Column width represents the total for one category, and tile height represents the conditional share of a second category within it.', when: ['Explore association between two categorical variables.', 'Compare group sizes and category composition together.', 'Show contingency-table structure.'], avoid: ['There are many categories and tiles become too small.', 'Precise comparisons of individual values are more important than composition.', 'The audience is unfamiliar with area-based displays; use grouped bars instead.'], mechanics: 'The full rectangle represents the total. The width of each column is proportional to its marginal total. Within each column, tile heights represent the conditional proportions of the second variable.', design: ['Label both dimensions and provide counts.', 'Use the same category colors across columns.', 'Order categories intentionally.', 'Include a table when exact counts matter.'], message: 'Technical: “The channel mix differs by customer status, with returning customers accounting for a larger share of web activity.” Business: “The customer groups use channels differently, so one channel strategy may not fit both.”', mistakes: ['Explaining neither width nor height.', 'Using inconsistent color meanings.', 'Comparing tile areas without accounting for both dimensions.'], reference: 'https://plotly.com/javascript/' },
  radar: { group: 'Comparison', summary: 'Compare profiles across several measures on radial axes.', purpose: 'A radar chart places each measure on a spoke and connects values to form a profile. It can summarize a small number of comparable dimensions, but shape and area can distort perception.', when: ['Compare a few profiles across the same small set of measures.', 'Show strengths and gaps across several dimensions.', 'Keep all measures on comparable and clearly defined scales.'], avoid: ['Precise ranking or small differences matter.', 'There are many dimensions or profiles.', 'Measures use incompatible scales or lack a meaningful common range.'], mechanics: 'Each spoke is one measure. Distance from the center encodes the value. Connecting points creates a profile, but polygon area is not a reliable quantitative measure.', design: ['Use a consistent scale for every spoke.', 'Limit the number of dimensions and profiles.', 'Keep category order consistent.', 'Pair with a table or dot chart for precise comparison.'], message: 'Technical: “The current profile is strongest in reliability and delivery, with lower scores in usability and support.” Business: “The service performs well on reliability but has clear opportunities in usability and support.”', mistakes: ['Comparing polygon area as if it were a single score.', 'Changing axis scales between measures.', 'Showing too many profiles in one chart.'], reference: 'https://plotly.com/javascript/polar-chart/' },
  sunburst: { group: 'Composition', summary: 'Explore hierarchical part-to-whole data through nested radial segments.', purpose: 'A sunburst chart shows a hierarchy as concentric rings. The center represents the root and each outer ring adds a deeper level. Segment angle and area represent contribution within the hierarchy.', when: ['Explore multi-level category composition.', 'Show parent-child relationships in a compact view.', 'Allow readers to inspect a hierarchy interactively.'], avoid: ['Precise comparison between similar-sized segments is required.', 'The hierarchy has too many levels.', 'The data does not form a meaningful hierarchy.'], mechanics: 'Each node is associated with a parent and a value. The angle of a segment represents its share within its parent. The hierarchy is visible from the center outward.', design: ['Keep the hierarchy shallow enough to read.', 'Use concise labels.', 'Provide hover values and a table alternative.', 'Use a treemap or bar chart for precise comparisons.'], message: 'Technical: “Retail contributes the largest top-level share, with North and South forming its child segments.” Business: “Retail is the largest business area, and its contribution is split across two regions.”', mistakes: ['Comparing areas across different rings directly.', 'Using inconsistent parent and child totals.', 'Adding too many hierarchy levels.'], reference: 'https://plotly.com/javascript/sunburst-charts/' },
  strip: { group: 'Distribution', summary: 'Show every observation across categories with a small amount of jitter.', purpose: 'A strip chart displays individual observations along a quantitative axis and separates categories along the other axis. Jitter reduces overlap while retaining the raw values.', when: ['Compare individual values across a small number of groups.', 'Show sample size and spread without binning.', 'Work with small or moderate datasets.'], avoid: ['There are too many points and overlap obscures the distribution.', 'A compact summary is the main need; use a box plot.', 'The jitter moves points enough to imply false values.'], mechanics: 'The quantitative axis retains each observation. The categorical axis separates groups. Small jitter is added only along the categorical axis to make overlapping observations visible.', design: ['Keep jitter small and deterministic when reproducibility matters.', 'Use transparency for dense groups.', 'Show sample sizes where useful.', 'Do not jitter along the measured numeric axis.'], message: 'Technical: “The South group has a wider spread and several higher observations than North.” Business: “South varies more, so a single average would hide meaningful differences.”', mistakes: ['Jittering the measured value.', 'Using too much jitter.', 'Showing dense groups without transparency or summaries.'], reference: 'https://plotly.com/javascript/' },
};

const samples = {
  bar: { x: ['North','South','East','West'], y: [34,27,22,41] },
  line: { x: ['Jan','Feb','Mar','Apr','May','Jun'], y: [42,48,53,50,63,71] },
  scatter: { x: [8,12,15,19,23,27,31,34,39,43,46,52], y: [18,23,25,28,31,35,37,42,45,49,53,58] },
  histogram: { x: [1,2,2,3,3,3,4,4,4,5,5,6,6,7,8,9,11,14,18,23] },
  box: { a: [4,5,6,7], b: [3,5,8,12] },
  violin: { a: [4,5,6,7,4,4,5,10], b: [3,5,8,12,5,6,8,9] },
  area: { x: ['Jan','Feb','Mar','Apr','May','Jun'], y: [42,48,53,50,63,71] },
  heatmap: { x: ['Morning','Midday','Afternoon','Evening'], y: ['Mon','Tue','Wed','Thu'], z: [[12,18,26,22],[15,24,31,25],[9,14,19,16],[6,8,11,10]] },
  pie: { labels: ['Core','Growth','Other'], values: [46,31,23] },
  treemap: { labels: ['Retail','North','South','Digital','Web','Mobile','Services','Advisory','Support'], parents: ['', 'Retail','Retail', '', 'Digital','Digital', '', 'Services','Services'], values: [46,28,18,39,24,15,15,9,6] },
  sankey: { labels: ['New cases','Review','Approved','Completed','Closed'], source: [0,0,1,1,2,2], target: [1,4,2,4,3,4], value: [720,280,510,210,430,80] },
  dotplot: { value: [1,2,2,3,3,3,4,4,5,5,5,6], stack: [1,1,2,1,2,3,1,2,1,2,3,1] },
  density: { value: [1.2,1.8,2.1,2.4,2.7,2.8,3.0,3.1,3.3,3.5,3.7,4.0,4.2,4.8,5.1,5.6,6.2,6.8,7.4,8.1] },
  dotchart: { category: ['North','South','East','West','Central'], value: [34,27,22,41,30] },
  bubble: { label: ['Search','Social','Referral','Display','Email','Partner'], x: [12,18,9,22,16,11], y: [25,31,20,36,29,23], size: [48,72,30,90,58,42] },
  gauge: { label: 'Completion', value: 74, target: 80, max: 100 },
  balloon: { x: ['Web','Web','Web','Store','Store','Store','Partner','Partner','Partner'], y: ['New','Returning','Lapsed','New','Returning','Lapsed','New','Returning','Lapsed'], count: [42,55,18,33,29,14,16,22,8] },
  mosaic: { groups: ['Online','Retail','Partner'], segments: ['New','Returning'], counts: [[45,30],[25,40],[15,20]] },
  radar: { categories: ['Reliability','Speed','Usability','Support','Coverage'], current: [86,74,62,58,80], target: [90,82,78,75,85] },
  sunburst: { labels: ['All business','Retail','North','South','Digital','Web','Mobile','Services','Advisory','Support'], parents: ['', 'All business','Retail','Retail','All business','Digital','Digital','All business','Services','Services'], values: [100,28,16,12,39,24,15,15,9,6] },
  strip: { group: ['North','North','North','North','North','South','South','South','South','South','East','East','East','East','East'], value: [4,5,6,7,5,3,5,8,12,7,4,4,6,8,9] }
};

const code = {
  bar: {
    R: 'library(plotly)\ndf <- data.frame(region = c("North", "South", "East", "West"), revenue = c(34, 27, 22, 41))\nplot_ly(df, x = ~region, y = ~revenue, type = "bar") |>\n  layout(title = "Revenue by region", xaxis = list(title = "Region"), yaxis = list(title = "Revenue ($k)"))',
    'Python · Pandas': 'import pandas as pd\nimport plotly.express as px\ndf = pd.DataFrame({"region": ["North", "South", "East", "West"], "revenue": [34, 27, 22, 41]})\nfig = px.bar(df, x="region", y="revenue", title="Revenue by region", labels={"revenue": "Revenue ($k)"})\nfig.show()',
    'Python · Polars': 'import polars as pl\nimport plotly.express as px\ndf = pl.DataFrame({"region": ["North", "South", "East", "West"], "revenue": [34, 27, 22, 41]})\nfig = px.bar(df, x="region", y="revenue", title="Revenue by region", labels={"revenue": "Revenue ($k)"})\nfig.show()',
    JavaScript: "const data = [{ type: 'bar', x: ['North','South','East','West'], y: [34,27,22,41] }];\nPlotly.newPlot('chart', data, { title: 'Revenue by region', xaxis: { title: 'Region' }, yaxis: { title: 'Revenue ($k)', rangemode: 'tozero' } }, { responsive: true });"
  },
  line: {
    R: 'library(plotly)\ndf <- data.frame(month = factor(c("Jan","Feb","Mar","Apr","May","Jun"), levels = c("Jan","Feb","Mar","Apr","May","Jun")), revenue = c(42,48,53,50,63,71))\nplot_ly(df, x = ~month, y = ~revenue, type = "scatter", mode = "lines+markers") |>\n  layout(title = "Monthly revenue", xaxis = list(title = "Month"), yaxis = list(title = "Revenue ($k)"))',
    'Python · Pandas': 'import pandas as pd\nimport plotly.express as px\ndf = pd.DataFrame({"month": ["Jan","Feb","Mar","Apr","May","Jun"], "revenue": [42,48,53,50,63,71]})\nfig = px.line(df, x="month", y="revenue", markers=True, title="Monthly revenue", labels={"revenue": "Revenue ($k)"})\nfig.show()',
    'Python · Polars': 'import polars as pl\nimport plotly.express as px\ndf = pl.DataFrame({"month": ["Jan","Feb","Mar","Apr","May","Jun"], "revenue": [42,48,53,50,63,71]})\nfig = px.line(df, x="month", y="revenue", markers=True, title="Monthly revenue", labels={"revenue": "Revenue ($k)"})\nfig.show()',
    JavaScript: "const data = [{ type: 'scatter', mode: 'lines+markers', x: ['Jan','Feb','Mar','Apr','May','Jun'], y: [42,48,53,50,63,71] }];\nPlotly.newPlot('chart', data, { title: 'Monthly revenue', xaxis: { title: 'Month' }, yaxis: { title: 'Revenue ($k)' } }, { responsive: true });"
  },
  scatter: {
    R: 'library(plotly)\ndf <- data.frame(ad_spend = c(8,12,15,19,23,27,31,34,39,43,46,52), orders = c(18,23,25,28,31,35,37,42,45,49,53,58))\nplot_ly(df, x = ~ad_spend, y = ~orders, type = "scatter", mode = "markers") |>\n  layout(xaxis = list(title = "Advertising spend ($k)"), yaxis = list(title = "Orders (hundreds)"))',
    'Python · Pandas': 'import pandas as pd\nimport plotly.express as px\ndf = pd.DataFrame({"ad_spend": [8,12,15,19,23,27,31,34,39,43,46,52], "orders": [18,23,25,28,31,35,37,42,45,49,53,58]})\nfig = px.scatter(df, x="ad_spend", y="orders", labels={"ad_spend": "Advertising spend ($k)", "orders": "Orders (hundreds)"})\nfig.show()',
    'Python · Polars': 'import polars as pl\nimport plotly.express as px\ndf = pl.DataFrame({"ad_spend": [8,12,15,19,23,27,31,34,39,43,46,52], "orders": [18,23,25,28,31,35,37,42,45,49,53,58]})\nfig = px.scatter(df, x="ad_spend", y="orders", labels={"ad_spend": "Advertising spend ($k)", "orders": "Orders (hundreds)"})\nfig.show()',
    JavaScript: "const data = [{ type: 'scatter', mode: 'markers', x: [8,12,15,19,23,27,31,34,39,43,46,52], y: [18,23,25,28,31,35,37,42,45,49,53,58] }];\nPlotly.newPlot('chart', data, { xaxis: { title: 'Advertising spend ($k)' }, yaxis: { title: 'Orders (hundreds)' } }, { responsive: true });"
  },
  histogram: {
    R: 'library(plotly)\ndays <- c(1,2,2,3,3,3,4,4,4,5,5,6,6,7,8,9,11,14,18,23)\nplot_ly(x = days, type = "histogram", nbinsx = 8) |>\n  layout(title = "Resolution time distribution", xaxis = list(title = "Days"), yaxis = list(title = "Cases"))',
    'Python · Pandas': 'import pandas as pd\nimport plotly.express as px\ndf = pd.DataFrame({"days": [1,2,2,3,3,3,4,4,4,5,5,6,6,7,8,9,11,14,18,23]})\nfig = px.histogram(df, x="days", nbins=8, title="Resolution time distribution")\nfig.show()',
    'Python · Polars': 'import polars as pl\nimport plotly.express as px\ndf = pl.DataFrame({"days": [1,2,2,3,3,3,4,4,4,5,5,6,6,7,8,9,11,14,18,23]})\nfig = px.histogram(df, x="days", nbins=8, title="Resolution time distribution")\nfig.show()',
    JavaScript: "const data = [{ type: 'histogram', x: [1,2,2,3,3,3,4,4,4,5,5,6,6,7,8,9,11,14,18,23], nbinsx: 8 }];\nPlotly.newPlot('chart', data, { title: 'Resolution time distribution', xaxis: { title: 'Days' }, yaxis: { title: 'Cases' } }, { responsive: true });"
  },
  box: {
    R: 'library(plotly)\ndf <- data.frame(region = rep(c("North","South"), each = 4), days = c(4,5,6,7,3,5,8,12))\nplot_ly(df, x = ~region, y = ~days, type = "box", boxpoints = "outliers") |>\n  layout(xaxis = list(title = "Region"), yaxis = list(title = "Resolution time (days)"))',
    'Python · Pandas': 'import pandas as pd\nimport plotly.express as px\ndf = pd.DataFrame({"region": ["North"]*4 + ["South"]*4, "days": [4,5,6,7,3,5,8,12]})\nfig = px.box(df, x="region", y="days", points="outliers")\nfig.show()',
    'Python · Polars': 'import polars as pl\nimport plotly.express as px\ndf = pl.DataFrame({"region": ["North"]*4 + ["South"]*4, "days": [4,5,6,7,3,5,8,12]})\nfig = px.box(df, x="region", y="days", points="outliers")\nfig.show()',
    JavaScript: "const data = [{ type: 'box', name: 'North', y: [4,5,6,7] }, { type: 'box', name: 'South', y: [3,5,8,12] }];\nPlotly.newPlot('chart', data, { yaxis: { title: 'Resolution time (days)' }, boxmode: 'group' }, { responsive: true });"
  }
};


const extendedCode = {
  dotplot: {
    R: `library(plotly)
df <- data.frame(value = c(1,2,2,3,3,3,4,4,5,5,5,6), stack = c(1,1,2,1,2,3,1,2,1,2,3,1))
plot_ly(df, x = ~value, y = ~stack, type = "scatter", mode = "markers", marker = list(size = 12)) |>
  layout(title = "Dot plot of observations", xaxis = list(title = "Value"), yaxis = list(title = "Stack position", dtick = 1))`,
    'Python · Pandas': `import pandas as pd
import plotly.express as px
df = pd.DataFrame({"value": [1,2,2,3,3,3,4,4,5,5,5,6], "stack": [1,1,2,1,2,3,1,2,1,2,3,1]})
fig = px.scatter(df, x="value", y="stack", title="Dot plot of observations")
fig.update_traces(marker={"size": 12})
fig.show()`,
    'Python · Polars': `import polars as pl
import plotly.express as px
df = pl.DataFrame({"value": [1,2,2,3,3,3,4,4,5,5,5,6], "stack": [1,1,2,1,2,3,1,2,1,2,3,1]})
fig = px.scatter(df, x="value", y="stack", title="Dot plot of observations")
fig.update_traces(marker={"size": 12})
fig.show()`,
    JavaScript: `const data = [{ type: 'scatter', mode: 'markers', x: [1,2,2,3,3,3,4,4,5,5,5,6], y: [1,1,2,1,2,3,1,2,1,2,3,1], marker: { size: 12 } }];
Plotly.newPlot('chart', data, { title: 'Dot plot of observations', xaxis: { title: 'Value' }, yaxis: { title: 'Stack position', dtick: 1 } }, { responsive: true });`
  },
  density: {
    R: `library(plotly)
values <- c(1.2,1.8,2.1,2.4,2.7,2.8,3.0,3.1,3.3,3.5,3.7,4.0,4.2,4.8,5.1,5.6,6.2,6.8,7.4,8.1)
estimate <- density(values, bw = 0.55, n = 200)
df <- data.frame(value = estimate$x, density = estimate$y)
plot_ly(df, x = ~value, y = ~density, type = "scatter", mode = "lines", fill = "tozeroy") |>
  layout(title = "Estimated distribution", xaxis = list(title = "Value"), yaxis = list(title = "Density"))`,
    'Python · Pandas': `import numpy as np
import pandas as pd
import plotly.express as px
from scipy.stats import gaussian_kde
df = pd.DataFrame({"value": [1.2,1.8,2.1,2.4,2.7,2.8,3.0,3.1,3.3,3.5,3.7,4.0,4.2,4.8,5.1,5.6,6.2,6.8,7.4,8.1]})
values = df["value"].to_numpy()
grid = np.linspace(values.min(), values.max(), 200)
density = gaussian_kde(values, bw_method=0.25)(grid)
fig = px.area(x=grid, y=density, labels={"x": "Value", "y": "Density"}, title="Estimated distribution")
fig.show()`,
    'Python · Polars': `import numpy as np
import polars as pl
import plotly.express as px
from scipy.stats import gaussian_kde
df = pl.DataFrame({"value": [1.2,1.8,2.1,2.4,2.7,2.8,3.0,3.1,3.3,3.5,3.7,4.0,4.2,4.8,5.1,5.6,6.2,6.8,7.4,8.1]})
values = df["value"].to_numpy()
grid = np.linspace(values.min(), values.max(), 200)
density = gaussian_kde(values, bw_method=0.25)(grid)
fig = px.area(x=grid, y=density, labels={"x": "Value", "y": "Density"}, title="Estimated distribution")
fig.show()`,
    JavaScript: `const values = [1.2,1.8,2.1,2.4,2.7,2.8,3.0,3.1,3.3,3.5,3.7,4.0,4.2,4.8,5.1,5.6,6.2,6.8,7.4,8.1];
const grid = Array.from({ length: 200 }, (_, i) => Math.min(...values) + i * (Math.max(...values) - Math.min(...values)) / 199);
const bandwidth = 0.55;
const density = grid.map(x => values.reduce((sum, value) => sum + Math.exp(-0.5 * ((x - value) / bandwidth) ** 2), 0) / (values.length * bandwidth * Math.sqrt(2 * Math.PI)));
const data = [{ type: 'scatter', mode: 'lines', x: grid, y: density, fill: 'tozeroy' }];
Plotly.newPlot('chart', data, { title: 'Estimated distribution', xaxis: { title: 'Value' }, yaxis: { title: 'Density' } }, { responsive: true });`
  },
  dotchart: {
    R: `library(plotly)
df <- data.frame(category = c("North","South","East","West","Central"), value = c(34,27,22,41,30))
df$category <- reorder(df$category, df$value)
plot_ly(df, x = ~value, y = ~category, type = "scatter", mode = "markers", marker = list(size = 12)) |>
  layout(title = "Values by category", xaxis = list(title = "Value"), yaxis = list(title = "Category"))`,
    'Python · Pandas': `import pandas as pd
import plotly.express as px
df = pd.DataFrame({"category": ["North","South","East","West","Central"], "value": [34,27,22,41,30]})
fig = px.scatter(df, x="value", y="category", text="value", category_orders={"category": ["East","South","Central","North","West"]}, title="Values by category")
fig.update_traces(mode="markers+text", textposition="middle right")
fig.show()`,
    'Python · Polars': `import polars as pl
import plotly.express as px
df = pl.DataFrame({"category": ["North","South","East","West","Central"], "value": [34,27,22,41,30]})
fig = px.scatter(df, x="value", y="category", text="value", title="Values by category")
fig.update_traces(mode="markers+text", textposition="middle right")
fig.show()`,
    JavaScript: `const data = [{ type: 'scatter', mode: 'markers+text', x: [34,27,22,41,30], y: ['North','South','East','West','Central'], text: [34,27,22,41,30], textposition: 'middle right', marker: { size: 12 } }];
Plotly.newPlot('chart', data, { title: 'Values by category', xaxis: { title: 'Value' }, yaxis: { title: 'Category', categoryorder: 'array', categoryarray: ['East','South','Central','North','West'] } }, { responsive: true });`
  },
  bubble: {
    R: `library(plotly)
df <- data.frame(campaign = c("Search","Social","Referral","Display","Email","Partner"), spend = c(12,18,9,22,16,11), conversions = c(25,31,20,36,29,23), audience = c(48,72,30,90,58,42))
plot_ly(df, x = ~spend, y = ~conversions, type = "scatter", mode = "markers", text = ~campaign, marker = list(size = ~audience, sizemode = "area", sizeref = 2 * max(df$audience) / (48^2))) |>
  layout(title = "Campaign performance", xaxis = list(title = "Spend ($k)"), yaxis = list(title = "Conversions (hundreds)"))`,
    'Python · Pandas': `import pandas as pd
import plotly.express as px
df = pd.DataFrame({"campaign": ["Search","Social","Referral","Display","Email","Partner"], "spend": [12,18,9,22,16,11], "conversions": [25,31,20,36,29,23], "audience": [48,72,30,90,58,42]})
fig = px.scatter(df, x="spend", y="conversions", size="audience", color="campaign", hover_name="campaign", size_max=48, title="Campaign performance")
fig.show()`,
    'Python · Polars': `import polars as pl
import plotly.express as px
df = pl.DataFrame({"campaign": ["Search","Social","Referral","Display","Email","Partner"], "spend": [12,18,9,22,16,11], "conversions": [25,31,20,36,29,23], "audience": [48,72,30,90,58,42]})
fig = px.scatter(df, x="spend", y="conversions", size="audience", color="campaign", hover_name="campaign", size_max=48, title="Campaign performance")
fig.show()`,
    JavaScript: `const data = [{ type: 'scatter', mode: 'markers+text', x: [12,18,9,22,16,11], y: [25,31,20,36,29,23], text: ['Search','Social','Referral','Display','Email','Partner'], textposition: 'top center', marker: { size: [48,72,30,90,58,42], sizemode: 'area', sizeref: 2 * 90 / (48 ** 2), color: ['#174e73','#397e73','#875500','#74518c','#b04b3d','#145c8a'] } }];
Plotly.newPlot('chart', data, { title: 'Campaign performance', xaxis: { title: 'Spend ($k)' }, yaxis: { title: 'Conversions (hundreds)' } }, { responsive: true });`
  },
  gauge: {
    R: `library(plotly)
plot_ly(type = "indicator", mode = "gauge+number+delta", value = 74, delta = list(reference = 80), title = list(text = "Completion"), gauge = list(axis = list(range = list(0,100)), bar = list(color = "#145d70"), threshold = list(line = list(color = "#875500", width = 4), value = 80)))`,
    'Python · Pandas': `import pandas as pd
import plotly.graph_objects as go
df = pd.DataFrame({"metric": ["Completion"], "value": [74], "target": [80]})
fig = go.Figure(go.Indicator(mode="gauge+number+delta", value=df.loc[0, "value"], delta={"reference": df.loc[0, "target"]}, title={"text": df.loc[0, "metric"]}, gauge={"axis": {"range": [0,100]}, "threshold": {"line": {"color": "#875500", "width": 4}, "value": 80}}))
fig.show()`,
    'Python · Polars': `import polars as pl
import plotly.graph_objects as go
df = pl.DataFrame({"metric": ["Completion"], "value": [74], "target": [80]})
fig = go.Figure(go.Indicator(mode="gauge+number+delta", value=df["value"][0], delta={"reference": df["target"][0]}, title={"text": df["metric"][0]}, gauge={"axis": {"range": [0,100]}, "threshold": {"line": {"color": "#875500", "width": 4}, "value": 80}}))
fig.show()`,
    JavaScript: `const data = [{ type: 'indicator', mode: 'gauge+number+delta', value: 74, delta: { reference: 80 }, title: { text: 'Completion' }, gauge: { axis: { range: [0,100] }, threshold: { line: { color: '#875500', width: 4 }, value: 80 } } }];
Plotly.newPlot('chart', data, { margin: { t: 40, r: 25, b: 20, l: 25 } }, { responsive: true });`
  },
  balloon: {
    R: `library(plotly)
df <- data.frame(channel = rep(c("Web","Store","Partner"), each = 3), cohort = rep(c("New","Returning","Lapsed"), 3), count = c(42,55,18,33,29,14,16,22,8))
plot_ly(df, x = ~channel, y = ~cohort, type = "scatter", mode = "markers+text", text = ~count, marker = list(size = ~count, sizemode = "area", sizeref = 2 * max(df$count) / (48^2))) |>
  layout(title = "Customer mix by channel", xaxis = list(title = "Channel"), yaxis = list(title = "Customer cohort"))`,
    'Python · Pandas': `import pandas as pd
import plotly.express as px
df = pd.DataFrame({"channel": ["Web","Web","Web","Store","Store","Store","Partner","Partner","Partner"], "cohort": ["New","Returning","Lapsed"]*3, "count": [42,55,18,33,29,14,16,22,8]})
fig = px.scatter(df, x="channel", y="cohort", size="count", text="count", size_max=48, title="Customer mix by channel")
fig.show()`,
    'Python · Polars': `import polars as pl
import plotly.express as px
df = pl.DataFrame({"channel": ["Web","Web","Web","Store","Store","Store","Partner","Partner","Partner"], "cohort": ["New","Returning","Lapsed"]*3, "count": [42,55,18,33,29,14,16,22,8]})
fig = px.scatter(df, x="channel", y="cohort", size="count", text="count", size_max=48, title="Customer mix by channel")
fig.show()`,
    JavaScript: `const data = [{ type: 'scatter', mode: 'markers+text', x: ['Web','Web','Web','Store','Store','Store','Partner','Partner','Partner'], y: ['New','Returning','Lapsed','New','Returning','Lapsed','New','Returning','Lapsed'], text: ['42','55','18','33','29','14','16','22','8'], marker: { size: [42,55,18,33,29,14,16,22,8], sizemode: 'area', sizeref: 2 * 55 / (48 ** 2), color: '#397e73' } }];
Plotly.newPlot('chart', data, { title: 'Customer mix by channel', xaxis: { title: 'Channel' }, yaxis: { title: 'Customer cohort' } }, { responsive: true });`
  },
  mosaic: {
    R: `library(plotly)
groups <- c("Online","Retail","Partner"); segments <- c("New","Returning")
counts <- matrix(c(45,30,25,40,15,20), nrow = 3, byrow = TRUE, dimnames = list(groups, segments))
total <- sum(counts); left <- 0; shapes <- list(); annotations <- list()
for (i in seq_along(groups)) { group_total <- sum(counts[i,]); width <- group_total / total; bottom <- 0
  for (j in seq_along(segments)) { height <- counts[i,j] / group_total
    shapes[[length(shapes)+1]] <- list(type="rect",xref="paper",yref="paper",x0=left,x1=left+width,y0=bottom,y1=bottom+height,line=list(color="white",width=2),fillcolor=if (j == 1) "#397e73" else "#b8c7df")
    annotations[[length(annotations)+1]] <- list(x=left+width/2,y=bottom+height/2,xref="paper",yref="paper",text=paste(groups[i],segments[j],counts[i,j]),showarrow=FALSE)
    bottom <- bottom + height
  }; left <- left + width
}
plot_ly() |> layout(title="Customer mix by channel",shapes=shapes,annotations=annotations,xaxis=list(visible=FALSE,range=c(0,1)),yaxis=list(visible=FALSE,range=c(0,1)))`,
    'Python · Pandas': `import pandas as pd
import plotly.graph_objects as go
df = pd.DataFrame([[45,30],[25,40],[15,20]], index=["Online","Retail","Partner"], columns=["New","Returning"])
fig = go.Figure(); total = df.to_numpy().sum(); left = 0
colors = ["#397e73", "#b8c7df"]
for group, row in df.iterrows():
    width = row.sum() / total; bottom = 0
    for segment, count in row.items():
        height = count / row.sum()
        fig.add_shape(type="rect", xref="paper", yref="paper", x0=left, x1=left+width, y0=bottom, y1=bottom+height, fillcolor=colors[list(df.columns).index(segment)], line={"color":"white","width":2})
        fig.add_annotation(x=left+width/2, y=bottom+height/2, xref="paper", yref="paper", text=f"{group}<br>{segment}: {count}", showarrow=False)
        bottom += height
    left += width
fig.update_layout(title="Customer mix by channel", xaxis={"visible":False,"range":[0,1]}, yaxis={"visible":False,"range":[0,1]})
fig.show()`,
    'Python · Polars': `import polars as pl
import plotly.graph_objects as go
df = pl.DataFrame({"channel": ["Online","Retail","Partner"], "new": [45,25,15], "returning": [30,40,20]})
fig = go.Figure(); matrix = df.select(["new","returning"]).to_numpy(); total = matrix.sum(); left = 0
colors = ["#397e73", "#b8c7df"]
for i, row in enumerate(matrix):
    width = row.sum() / total; bottom = 0
    for j, count in enumerate(row):
        height = count / row.sum()
        fig.add_shape(type="rect", xref="paper", yref="paper", x0=left, x1=left+width, y0=bottom, y1=bottom+height, fillcolor=colors[j], line={"color":"white","width":2})
        fig.add_annotation(x=left+width/2, y=bottom+height/2, xref="paper", yref="paper", text=f"{df['channel'][i]}: {int(count)}", showarrow=False)
        bottom += height
    left += width
fig.update_layout(title="Customer mix by channel", xaxis={"visible":False,"range":[0,1]}, yaxis={"visible":False,"range":[0,1]})
fig.show()`,
    JavaScript: `const groups = ['Online','Retail','Partner']; const counts = [[45,30],[25,40],[15,20]]; const segments = ['New','Returning'];
const total = counts.flat().reduce((a,b) => a+b, 0); let left = 0; const shapes = []; const annotations = []; const colors = ['#397e73','#b8c7df'];
groups.forEach((group, i) => { const groupTotal = counts[i].reduce((a,b) => a+b, 0); const width = groupTotal/total; let bottom = 0; counts[i].forEach((count,j) => { const height = count/groupTotal; shapes.push({ type:'rect', xref:'paper', yref:'paper', x0:left, x1:left+width, y0:bottom, y1:bottom+height, fillcolor:colors[j], line:{color:'white',width:2} }); annotations.push({ x:left+width/2, y:bottom+height/2, xref:'paper', yref:'paper', text:group+'<br>'+segments[j]+': '+count, showarrow:false }); bottom += height; }); left += width; });
Plotly.newPlot('chart', [], { title:'Customer mix by channel', shapes, annotations, xaxis:{visible:false,range:[0,1]}, yaxis:{visible:false,range:[0,1]} }, { responsive:true });`
  },
  radar: {
    R: `library(plotly)
categories <- c("Reliability","Speed","Usability","Support","Coverage")
plot_ly(type="scatterpolar", mode="lines+markers", r=c(86,74,62,58,80), theta=categories, fill="toself", name="Current") |>
  add_trace(r=c(90,82,78,75,85), theta=categories, fill="toself", name="Target") |>
  layout(title="Service profile", polar=list(radialaxis=list(visible=TRUE,range=c(0,100))))`,
    'Python · Pandas': `import pandas as pd
import plotly.graph_objects as go
df = pd.DataFrame({"dimension": ["Reliability","Speed","Usability","Support","Coverage"], "current": [86,74,62,58,80], "target": [90,82,78,75,85]})
fig = go.Figure()
for name in ["current", "target"]:
    fig.add_trace(go.Scatterpolar(r=df[name], theta=df["dimension"], fill="toself", name=name.title()))
fig.update_layout(title="Service profile", polar={"radialaxis": {"visible": True, "range": [0,100]}})
fig.show()`,
    'Python · Polars': `import polars as pl
import plotly.graph_objects as go
df = pl.DataFrame({"dimension": ["Reliability","Speed","Usability","Support","Coverage"], "current": [86,74,62,58,80], "target": [90,82,78,75,85]})
fig = go.Figure()
for name in ["current", "target"]:
    fig.add_trace(go.Scatterpolar(r=df[name].to_list(), theta=df["dimension"].to_list(), fill="toself", name=name.title()))
fig.update_layout(title="Service profile", polar={"radialaxis": {"visible": True, "range": [0,100]}})
fig.show()`,
    JavaScript: `const data = [{ type:'scatterpolar', r:[86,74,62,58,80], theta:['Reliability','Speed','Usability','Support','Coverage'], fill:'toself', name:'Current' }, { type:'scatterpolar', r:[90,82,78,75,85], theta:['Reliability','Speed','Usability','Support','Coverage'], fill:'toself', name:'Target' }];
Plotly.newPlot('chart', data, { title:'Service profile', polar:{ radialaxis:{ visible:true, range:[0,100] } } }, { responsive:true });`
  },
  sunburst: {
    R: `library(plotly)
labels <- c("All business","Retail","North","South","Digital","Web","Mobile","Services","Advisory","Support")
parents <- c("","All business","Retail","Retail","All business","Digital","Digital","All business","Services","Services")
values <- c(100,28,16,12,39,24,15,15,9,6)
plot_ly(type="sunburst", labels=labels, parents=parents, values=values, branchvalues="total") |>
  layout(title="Business contribution hierarchy")`,
    'Python · Pandas': `import pandas as pd
import plotly.express as px
df = pd.DataFrame({"label": ["All business","Retail","North","South","Digital","Web","Mobile","Services","Advisory","Support"], "parent": ["","All business","Retail","Retail","All business","Digital","Digital","All business","Services","Services"], "value": [100,28,16,12,39,24,15,15,9,6]})
fig = px.sunburst(df, names="label", parents="parent", values="value", branchvalues="total", title="Business contribution hierarchy")
fig.show()`,
    'Python · Polars': `import polars as pl
import plotly.express as px
df = pl.DataFrame({"label": ["All business","Retail","North","South","Digital","Web","Mobile","Services","Advisory","Support"], "parent": ["","All business","Retail","Retail","All business","Digital","Digital","All business","Services","Services"], "value": [100,28,16,12,39,24,15,15,9,6]})
fig = px.sunburst(df, names="label", parents="parent", values="value", branchvalues="total", title="Business contribution hierarchy")
fig.show()`,
    JavaScript: `const data = [{ type:'sunburst', labels:['All business','Retail','North','South','Digital','Web','Mobile','Services','Advisory','Support'], parents:['','All business','Retail','Retail','All business','Digital','Digital','All business','Services','Services'], values:[100,28,16,12,39,24,15,15,9,6], branchvalues:'total' }];
Plotly.newPlot('chart', data, { title:'Business contribution hierarchy' }, { responsive:true });`
  },
  strip: {
    R: `library(plotly)
df <- data.frame(group=rep(c("North","South","East"), each=5), value=c(4,5,6,7,5,3,5,8,12,7,4,4,6,8,9))
set.seed(1); df$x_jitter <- as.numeric(factor(df$group)) + runif(nrow(df), -0.12, 0.12)
plot_ly(df, x=~x_jitter, y=~value, color=~group, type="scatter", mode="markers") |>
  layout(title="Observations by region", xaxis=list(title="Region", tickmode="array", tickvals=1:3, ticktext=c("North","South","East")), yaxis=list(title="Observed value"))`,
    'Python · Pandas': `import pandas as pd
import plotly.graph_objects as go
df = pd.DataFrame({"group": ["North"]*5 + ["South"]*5 + ["East"]*5, "value": [4,5,6,7,5,3,5,8,12,7,4,4,6,8,9]})
group_order = ["North", "South", "East"]
group_positions = {group: index for index, group in enumerate(group_order)}
offsets = [-0.12, -0.06, 0, 0.06, 0.12]
df["x_position"] = df["group"].map(group_positions) + df.groupby("group").cumcount().map(lambda index: offsets[index % len(offsets)])
fig = go.Figure()
for group in group_order:
    points = df[df["group"] == group]
    fig.add_trace(go.Scatter(x=points["x_position"], y=points["value"], mode="markers", name=group, marker={"size": 10, "opacity": 0.78}))
fig.update_layout(title="Observations by region", xaxis={"title": "Region", "tickmode": "array", "tickvals": list(range(len(group_order))), "ticktext": group_order}, yaxis={"title": "Observed value"})
fig.show()`,
    'Python · Polars': `import polars as pl
import plotly.graph_objects as go
df = pl.DataFrame({"group": ["North"]*5 + ["South"]*5 + ["East"]*5, "value": [4,5,6,7,5,3,5,8,12,7,4,4,6,8,9]})
group_order = ["North", "South", "East"]
offsets = [-0.12, -0.06, 0, 0.06, 0.12]
groups = df.get_column("group").to_list()
values = df.get_column("value").to_list()
counts = {group: 0 for group in group_order}
x_positions = []
for group in groups:
    x_positions.append(group_order.index(group) + offsets[counts[group] % len(offsets)])
    counts[group] += 1
fig = go.Figure()
for group in group_order:
    indices = [index for index, value in enumerate(groups) if value == group]
    fig.add_trace(go.Scatter(x=[x_positions[index] for index in indices], y=[values[index] for index in indices], mode="markers", name=group, marker={"size": 10, "opacity": 0.78}))
fig.update_layout(title="Observations by region", xaxis={"title": "Region", "tickmode": "array", "tickvals": list(range(len(group_order))), "ticktext": group_order}, yaxis={"title": "Observed value"})
fig.show()`,
    JavaScript: `const groups = ['North','North','North','North','North','South','South','South','South','South','East','East','East','East','East']; const values = [4,5,6,7,5,3,5,8,12,7,4,4,6,8,9]; const offsets = [0,-0.1,0.1,-0.15,0.15];
const x = groups.map((group, i) => ({ North:0, South:1, East:2 }[group] + offsets[i % offsets.length]));
const data = [{ type:'scatter', mode:'markers', x, y:values, text:groups, marker:{ size:10, opacity:0.78 } }];
Plotly.newPlot('chart', data, { title:'Observations by region', xaxis:{ title:'Region', tickvals:[0,1,2], ticktext:['North','South','East'] }, yaxis:{ title:'Observed value' } }, { responsive:true });`
  }
};

const chartTitles = {
  bar: 'Bar chart', line: 'Line chart', scatter: 'Scatter plot', histogram: 'Histogram', box: 'Box plot', violin: 'Violin plot', area: 'Area chart', heatmap: 'Heatmap', pie: 'Pie chart', treemap: 'Treemap', sankey: 'Sankey diagram',
  dotplot: 'Dot plot', density: 'Density plot', dotchart: 'Dot chart', bubble: 'Bubble chart', gauge: 'Gauge chart', balloon: 'Balloon plot', mosaic: 'Mosaic plot', radar: 'Radar chart', sunburst: 'Sunburst chart', strip: 'Strip chart'
};
export function getSample(id) { return samples[id] || samples.bar; }
export function getChartInfo(id) { return descriptions[id] ? { ...descriptions[id], title: chartTitles[id] || id } : undefined; }

function makeJavaScriptExampleRunnable(source) {
  const plotCall = source.replaceAll("Plotly.newPlot('chart',", 'Plotly.newPlot(chart,');
  return [
    '// Requires Plotly.js 4.2.0 to be loaded before this script.',
    '// CDN: https://cdn.plot.ly/plotly-4.2.0.min.js',
    "const chart = document.createElement('div');",
    "chart.id = 'viznova-chart';",
    "chart.style.width = '100%';",
    "chart.style.minHeight = '420px';",
    'document.body.appendChild(chart);',
    '',
    plotCall
  ].join('\n');
}

export function getCode(id) {
  if (extendedCode[id]) return { ...extendedCode[id], JavaScript: makeJavaScriptExampleRunnable(extendedCode[id].JavaScript) };
  if (code[id]) return { ...code[id], JavaScript: makeJavaScriptExampleRunnable(code[id].JavaScript) };
  const rExamples = {
    pie: `library(plotly)
df <- data.frame(category = c("Core", "Growth", "Other"), share = c(46, 31, 23))
plot_ly(df, labels = ~category, values = ~share, type = "pie", hole = 0.35) | >
  layout(title = "Share of total by category")`,
    violin: `library(plotly)
df <- data.frame(group = rep(c("A", "B"), each = 8), value = c(4,5,6,7,4,4,5,10,3,5,8,12,5,6,8,9))
plot_ly(df, x = ~group, y = ~value, type = "violin", box = list(visible = TRUE), points = "all") | >
  layout(violinmode = "group")`,
    area: `library(plotly)
df <- data.frame(month = c("Jan", "Feb", "Mar", "Apr", "May", "Jun"), value = c(42,48,53,50,63,71))
plot_ly(df, x = ~month, y = ~value, type = "scatter", mode = "lines", fill = "tozeroy") | >
  layout(title = "Monthly volume over time")`,
    heatmap: `library(plotly)
z <- matrix(c(12,18,26,22,15,24,31,25,9,14,19,16,6,8,11,10), nrow = 4, byrow = TRUE)
plot_ly(x = c("Morning", "Midday", "Afternoon", "Evening"), y = c("Mon", "Tue", "Wed", "Thu"), z = z, type = "heatmap", colorscale = "Blues") | >
  layout(title = "Activity by day and time")`,
    treemap: `library(plotly)
labels <- c("Retail", "North", "South", "Digital", "Web", "Mobile", "Services", "Advisory", "Support")
parents <- c("", "Retail", "Retail", "", "Digital", "Digital", "", "Services", "Services")
values <- c(46, 28, 18, 39, 24, 15, 15, 9, 6)
plot_ly(type = "treemap", labels = labels, parents = parents, values = values, branchvalues = "total") | >
  layout(title = "Contribution by business area")`,
    sankey: `library(plotly)
plot_ly(type = "sankey", node = list(label = c("New cases", "Review", "Approved", "Completed", "Closed")),
        link = list(source = c(0,0,1,1,2,2), target = c(1,4,2,4,3,4), value = c(720,280,510,210,430,80))) | >
  layout(title = "Movement through a process")`,
  };
  const r = (rExamples[id] || `library(plotly)\ndf <- data.frame(category = c("A", "B", "C"), value = c(46, 31, 23))\nplot_ly(df, x = ~category, y = ~value, type = "bar")`) .replaceAll(' | >', ' |>');
  let pandas, polars, js;
  if (id === 'pie') {
    pandas = 'import pandas as pd\nimport plotly.express as px\ndf = pd.DataFrame({"category": ["Core", "Growth", "Other"], "share": [46,31,23]})\nfig = px.pie(df, names="category", values="share", hole=0.35)\nfig.show()';
    polars = pandas.replace('import pandas as pd', 'import polars as pl').replace('pd.DataFrame(', 'pl.DataFrame(');
    js = "const data = [{ type: 'pie', labels: ['Core','Growth','Other'], values: [46,31,23], hole: 0.35 }];\nPlotly.newPlot('chart', data, {}, { responsive: true });";
  } else if (id === 'violin') {
    pandas = 'import pandas as pd\nimport plotly.express as px\ndf = pd.DataFrame({"group": ["A"]*8 + ["B"]*8, "value": [4,5,6,7,4,4,5,10,3,5,8,12,5,6,8,9]})\nfig = px.violin(df, x="group", y="value", box=True, points="all")\nfig.show()';
    polars = pandas.replace('import pandas as pd', 'import polars as pl').replace('pd.DataFrame(', 'pl.DataFrame(');
    js = "const data = [{ type: 'violin', name: 'A', y: [4,5,6,7,4,4,5,10], box: { visible: true } }, { type: 'violin', name: 'B', y: [3,5,8,12,5,6,8,9], box: { visible: true } }];\nPlotly.newPlot('chart', data, { violinmode: 'group' }, { responsive: true });";
  } else if (id === 'area') {
    pandas = 'import pandas as pd\nimport plotly.express as px\ndf = pd.DataFrame({"month": ["Jan","Feb","Mar","Apr","May","Jun"], "value": [42,48,53,50,63,71]})\nfig = px.area(df, x="month", y="value", title="Monthly volume over time")\nfig.show()';
    polars = pandas.replace('import pandas as pd', 'import polars as pl').replace('pd.DataFrame(', 'pl.DataFrame(');
    js = "const data = [{ type: 'scatter', mode: 'lines', x: ['Jan','Feb','Mar','Apr','May','Jun'], y: [42,48,53,50,63,71], fill: 'tozeroy' }];\nPlotly.newPlot('chart', data, { title: 'Monthly volume over time' }, { responsive: true });";
  } else if (id === 'heatmap') {
    pandas = 'import pandas as pd\nimport plotly.express as px\ndf = pd.DataFrame([[12,18,26,22],[15,24,31,25],[9,14,19,16],[6,8,11,10]], index=["Mon","Tue","Wed","Thu"], columns=["Morning","Midday","Afternoon","Evening"])\nfig = px.imshow(df, text_auto=True, color_continuous_scale="Blues", labels={"x": "Time of day", "y": "Day", "color": "Cases"})\nfig.show()';
    polars = 'import polars as pl\nimport plotly.express as px\ndf = pl.DataFrame({"day": ["Mon","Tue","Wed","Thu"], "Morning": [12,15,9,6], "Midday": [18,24,14,8], "Afternoon": [26,31,19,11], "Evening": [22,25,16,10]})\nvalues = df.select(["Morning","Midday","Afternoon","Evening"]).to_numpy()\nfig = px.imshow(values, x=["Morning","Midday","Afternoon","Evening"], y=df["day"].to_list(), text_auto=True, color_continuous_scale="Blues")\nfig.show()';
    js = "const data = [{ type: 'heatmap', z: [[12,18,26,22],[15,24,31,25],[9,14,19,16],[6,8,11,10]], x: ['Morning','Midday','Afternoon','Evening'], y: ['Mon','Tue','Wed','Thu'], colorscale: 'Blues' }];\nPlotly.newPlot('chart', data, {}, { responsive: true });";
  } else if (id === 'treemap') {
    pandas = 'import pandas as pd\nimport plotly.express as px\ndf = pd.DataFrame({"label": ["Retail","North","South","Digital","Web","Mobile","Services","Advisory","Support"], "parent": ["","Retail","Retail","","Digital","Digital","","Services","Services"], "value": [46,28,18,39,24,15,15,9,6]})\nfig = px.treemap(df, names="label", parents="parent", values="value", branchvalues="total")\nfig.show()';
    polars = 'import polars as pl\nimport plotly.express as px\ndf = pl.DataFrame({"label": ["Retail","North","South","Digital","Web","Mobile","Services","Advisory","Support"], "parent": ["","Retail","Retail","","Digital","Digital","","Services","Services"], "value": [46,28,18,39,24,15,15,9,6]})\nfig = px.treemap(df, names="label", parents="parent", values="value", branchvalues="total")\nfig.show()';
    js = "const data = [{ type: 'treemap', labels: ['Retail','North','South','Digital','Web','Mobile','Services','Advisory','Support'], parents: ['','Retail','Retail','','Digital','Digital','','Services','Services'], values: [46,28,18,39,24,15,15,9,6], branchvalues: 'total' }];\nPlotly.newPlot('chart', data, {}, { responsive: true });";
  } else if (id === 'sankey') {
    pandas = 'import pandas as pd\nimport plotly.graph_objects as go\nlabels = ["New cases","Review","Approved","Completed","Closed"]\nlinks = pd.DataFrame({"source": [0,0,1,1,2,2], "target": [1,4,2,4,3,4], "value": [720,280,510,210,430,80]})\nfig = go.Figure(go.Sankey(node={"label": labels}, link={"source": links["source"], "target": links["target"], "value": links["value"]}))\nfig.show()';
    polars = 'import polars as pl\nimport plotly.graph_objects as go\nlabels = ["New cases","Review","Approved","Completed","Closed"]\nlinks = pl.DataFrame({"source": [0,0,1,1,2,2], "target": [1,4,2,4,3,4], "value": [720,280,510,210,430,80]})\nfig = go.Figure(go.Sankey(node={"label": labels}, link={"source": links.get_column("source").to_list(), "target": links.get_column("target").to_list(), "value": links.get_column("value").to_list()}))\nfig.show()';
    js = "const data = [{ type: 'sankey', node: { label: ['New cases','Review','Approved','Completed','Closed'] }, link: { source: [0,0,1,1,2,2], target: [1,4,2,4,3,4], value: [720,280,510,210,430,80] } }];\nPlotly.newPlot('chart', data, {}, { responsive: true });";
  } else {
    pandas = 'import pandas as pd\nimport plotly.express as px\ndf = pd.DataFrame({"category": ["A", "B", "C"], "value": [46, 31, 23]})\nfig = px.bar(df, x="category", y="value")\nfig.show()';
    polars = 'import polars as pl\nimport plotly.express as px\ndf = pl.DataFrame({"category": ["A", "B", "C"], "value": [46, 31, 23]})\nfig = px.bar(df, x="category", y="value")\nfig.show()';
    js = "const data = [{ type: 'bar', x: ['A','B','C'], y: [46,31,23] }];\nPlotly.newPlot('chart', data, {}, { responsive: true });";
  }
  return { R: r, 'Python · Pandas': pandas, 'Python · Polars': polars, JavaScript: makeJavaScriptExampleRunnable(js) };
}
