/** Parse a comma-separated file with quoted values, embedded line breaks and escaped quotes. */
export function parseCSV(text) {
  const input = String(text).replace(/^\uFEFF/, '');
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  let afterQuote = false;

  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];
    const next = input[index + 1];

    if (quoted) {
      if (character === '"' && next === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
        afterQuote = true;
      } else {
        field += character;
      }
      continue;
    }

    if (character === '"') {
      if (field.trim() || afterQuote) throw new Error(`Unexpected quote at character ${index + 1}.`);
      quoted = true;
    } else if (character === ',' ) {
      row.push(field);
      field = '';
      afterQuote = false;
    } else if (character === '\n' || character === '\r') {
      if (character === '\r' && next === '\n') index += 1;
      if (afterQuote && character !== '\n' && character !== '\r') throw new Error('Unexpected content after a quoted CSV field.');
      row.push(field);
      if (row.some(value => value.trim())) rows.push(row);
      row = [];
      field = '';
      afterQuote = false;
    } else {
      if (afterQuote && !/\s/.test(character)) throw new Error(`Unexpected content after a quoted CSV field at character ${index + 1}.`);
      if (!afterQuote) field += character;
    }
  }

  if (quoted) throw new Error('The CSV contains an unfinished quoted field. Check the file and try again.');
  row.push(field);
  if (row.some(value => value.trim())) rows.push(row);
  if (rows.length < 2) throw new Error('The CSV needs a header row and at least one data row.');

  const seen = new Map();
  const headers = rows[0].map((value, index) => {
    const base = value.trim() || `column_${index + 1}`;
    const occurrence = (seen.get(base) || 0) + 1;
    seen.set(base, occurrence);
    return occurrence === 1 ? base : `${base}_${occurrence}`;
  });
  if (headers.length < 2) throw new Error('The CSV needs at least two columns to create a chart.');

  const records = rows.slice(1).map((values, index) => {
    if (values.length !== headers.length) {
      throw new Error(`Row ${index + 2} has ${values.length} fields; the header contains ${headers.length}. Check for a missing delimiter or quote.`);
    }
    return Object.fromEntries(headers.map((header, column) => [header, values[column].trim()]));
  });
  if (records.length > 10000) throw new Error('This browser exercise is limited to 10,000 rows. Filter or sample the dataset and try again.');
  return records;
}

export function csvCell(value, { spreadsheetSafe = false } = {}) {
  let text = String(value ?? '');
  // Guard text cells against spreadsheet formula execution on export.
  if (spreadsheetSafe && typeof value === 'string' && /^[\s]*[=+@-]/.test(text)) text = `'${text}`;
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export function rowsToCSV(headers, rows, { spreadsheetSafe = false } = {}) {
  const options = { spreadsheetSafe };
  return [headers.map(value => csvCell(value, options)).join(','), ...rows.map(row => row.map(value => csvCell(value, options)).join(','))].join('\r\n');
}


/** Infer a useful first chart from a dataset without assuming the first two columns are numeric. */
export function inferCSVDefaults(records) {
  if (!Array.isArray(records) || !records.length) return null;
  const columns = Object.keys(records[0] || {});
  if (columns.length < 2) return null;

  const isNumericColumn = column => {
    const values = records.map(record => String(record[column] ?? '').trim()).filter(Boolean);
    return values.length > 0 && values.every(value => Number.isFinite(Number(value)));
  };
  const isTemporalColumn = column => {
    if (/(^|[_\s-])(date|datetime|time|month|year|quarter|week|period)(s|[_\s-]|$)/i.test(column)) return true;
    const values = records.map(record => String(record[column] ?? '').trim()).filter(Boolean);
    return values.length > 0 && values.every(value =>
      /^\d{4}-\d{2}(?:-\d{2})?(?:[T ][0-9:.+\-Z]+)?$/.test(value)
    );
  };

  const numericColumns = columns.filter(isNumericColumn);
  const temporalColumn = columns.find(isTemporalColumn);
  if (temporalColumn) {
    const yKey = numericColumns.find(column => column !== temporalColumn);
    if (yKey) return { xKey: temporalColumn, yKey, type: 'line', aggregation: 'sum' };
  }

  const categoricalColumn = columns.find(column => !numericColumns.includes(column));
  if (categoricalColumn) {
    const yKey = numericColumns.find(column => column !== categoricalColumn);
    if (yKey) return { xKey: categoricalColumn, yKey, type: 'bar', aggregation: 'sum' };
  }

  if (numericColumns.length >= 2) {
    return { xKey: numericColumns[0], yKey: numericColumns[1], type: 'scatter', aggregation: 'none' };
  }

  const yKey = numericColumns[0];
  const xKey = columns.find(column => column !== yKey);
  if (xKey && yKey) return { xKey, yKey, type: 'bar', aggregation: 'sum' };
  return { xKey: columns[0], yKey: columns[1], type: 'bar', aggregation: 'sum' };
}

/** Validate, filter, split into series and optionally aggregate observations before plotting. */
export function buildChartPoints(records, {
  xKey,
  yKey,
  type = 'bar',
  aggregation = 'sum',
  seriesKey = '',
  filterKey = '',
  filterValue = '__all__'
}) {
  if (!Array.isArray(records) || !records.length) throw new Error('Load a CSV file before creating a chart.');
  if (!['bar', 'line', 'scatter'].includes(type)) throw new Error('Choose a supported chart type.');
  if (!['none', 'sum', 'mean', 'count'].includes(aggregation)) throw new Error('Choose a supported aggregation.');
  if (type === 'scatter' && aggregation !== 'none') throw new Error('Scatter plots use individual observations. Set aggregation to “No aggregation”.');
  if (seriesKey && [xKey, yKey].includes(seriesKey)) throw new Error('Choose a series column that is different from the X and Y columns.');
  if (filterKey && [xKey, yKey].includes(filterKey)) throw new Error('Choose a filter column that is different from the X and Y columns.');

  const selectedRecords = filterKey && filterValue !== '__all__'
    ? records.filter(record => String(record[filterKey] ?? '') === String(filterValue))
    : records;
  if (!selectedRecords.length) throw new Error('The selected filter does not match any rows.');

  const valid = [];
  let missing = 0;
  let invalidY = null;
  let invalidX = null;

  selectedRecords.forEach((record, index) => {
    const xRaw = String(record[xKey] ?? '').trim();
    const yRaw = String(record[yKey] ?? '').trim();
    if (!xRaw || !yRaw) {
      missing += 1;
      return;
    }
    let x = xRaw;
    if (type === 'scatter') {
      x = Number(xRaw);
      if (!Number.isFinite(x)) {
        invalidX ??= index + 2;
        return;
      }
    }
    const y = aggregation === 'count' ? 1 : Number(yRaw);
    if (!Number.isFinite(y)) {
      invalidY ??= index + 2;
      return;
    }
    const series = seriesKey ? (String(record[seriesKey] ?? '').trim() || '(Unspecified)') : '';
    valid.push({ x, y, series });
  });

  if (invalidY !== null) throw new Error(`The selected Y column contains a non-numeric value at row ${invalidY}. Choose a numeric column or clean the CSV.`);
  if (invalidX !== null) throw new Error(`A scatter plot requires a numeric X column (first issue at row ${invalidX}). Choose a numeric column or use a bar or line chart.`);
  if (!valid.length) throw new Error('No rows contain usable values in both selected columns.');

  if (seriesKey) {
    const distinctSeries = new Set(valid.map(point => point.series));
    if (distinctSeries.size > 20) throw new Error('The selected series column has more than 20 categories. Filter the data or choose a column with fewer categories.');
  }

  let points = valid;
  if (aggregation !== 'none') {
    const groups = new Map();
    for (const point of valid) {
      const key = JSON.stringify([String(point.x), point.series]);
      if (!groups.has(key)) groups.set(key, { x: point.x, series: point.series, total: 0, count: 0 });
      const group = groups.get(key);
      group.total += point.y;
      group.count += 1;
    }
    points = [...groups.values()].map(group => ({
      x: group.x,
      series: group.series,
      y: aggregation === 'mean' ? group.total / group.count : aggregation === 'count' ? group.count : group.total
    }));
  }

  // Sort numeric and ISO date values for line charts. Keep categorical order stable.
  if (type === 'line' && points.every(point => typeof point.x === 'string' && /^\d{4}-\d{2}(?:-\d{2})?$/.test(point.x))) {
    points.sort((left, right) => left.x.localeCompare(right.x));
  } else if (type === 'line' && points.every(point => Number.isFinite(Number(point.x)) && String(point.x).trim() !== '')) {
    points.sort((left, right) => Number(left.x) - Number(right.x));
  }

  const yLabel = aggregation === 'sum' ? `Sum of ${yKey}`
    : aggregation === 'mean' ? `Mean of ${yKey}`
      : aggregation === 'count' ? `Count of ${yKey}` : yKey;
  return {
    points: points.map(point => ({ ...point, xKey, yKey: yLabel, type, aggregation, seriesKey })),
    missing,
    sourceRows: records.length,
    filteredRows: selectedRecords.length,
    plottedRows: points.length,
    aggregation,
    yLabel,
    seriesKey,
    filterKey,
    filterValue
  };
}
