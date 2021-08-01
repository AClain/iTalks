export type tabHeader = {
	title: string;
	icon?: JSX.Element;
	color?: string;
};

export interface CenteredTabsProps {
	activeTab?: number;
	tabHeaders: tabHeader[];
	tabPanels: Array<JSX.Element | string>;
	light?: boolean;
	[x: string]: any;
}
