# Sample retail dataset

`retail_monthly.csv` is synthetic, illustrative practice data. It is not a real company dataset or a report of actual retail performance.

- **Rows:** 24 (six months × four regions)
- **Time period:** January-June 2025
- **Grain:** one row per month and region

| Column | Definition | Unit / format |
|---|---|---|
| `month` | Reporting month | `YYYY-MM` |
| `region` | Illustrative sales region | Category |
| `revenue_k` | Monthly revenue for the region | Thousands of currency units |
| `orders` | Number of orders in the region and month | Orders |
| `marketing_spend_k` | Marketing spend for the region and month | Thousands of currency units |

The data supports exercises in time trends, regional comparisons, aggregation, and relationships between marketing spend and order volume. Values are intentionally small and simple so the visualization mechanics are easy to inspect.
