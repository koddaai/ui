export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  useChart,
} from './chart';

export type {
  ChartContainerProps,
  ChartTooltipContentProps,
  ChartLegendContentProps,
} from './chart';

export {
  koddaChartColors,
  createChartConfig,
  getChartColorPalette,
} from './chart-config';

export type { ChartConfig, KoddaChartColor } from './chart-config';

/* Re-exports do Recharts para conveniência */
export {
  AreaChart,
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
  RadialBarChart,
  ComposedChart,
  Area,
  Bar,
  Line,
  Pie,
  Radar,
  RadialBar,
  CartesianGrid,
  XAxis,
  YAxis,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Cell,
  ReferenceLine,
  ReferenceArea,
  Label,
  LabelList,
} from 'recharts';
