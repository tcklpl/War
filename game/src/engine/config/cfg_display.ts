import type { ConfigPage } from './cfg_page';

export class ConfigDisplay implements ConfigPage {
	page = 'display';
	theme = 'dark';
	showPerformance = false;
	showPerformanceCharts = false;
}
