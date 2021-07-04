import { FC, useState } from "react";
import { Tabs, Tab, Box } from "@material-ui/core";

import { useStyles } from "./CenteredTabs.styles";
import { CenteredTabsProps, tabHeader } from "./CenteredTabs.d";
import TabPanel from "../TabPanel/TabPanel";

const CenteredTabs: FC<CenteredTabsProps> = ({ activeTab, tabHeaders, tabPanels, light, ...rest }) => {
	const styles = useStyles();
	const [value, setValue] = useState(activeTab ?? 0);

	const handleChange = (event: any, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Box className={styles.container}>
			<Tabs
				TabIndicatorProps={{ style: { background: tabHeaders[value].color } }}
				value={value}
				onChange={handleChange}
				indicatorColor='primary'
			>
				{tabHeaders.map((tabHeader: tabHeader, i) => (
					<Tab
						style={{
							color: value === i ? tabHeader.color : light ? "var(--bg)" : "var(--text)",
						}}
						className={styles.tab}
						label={tabHeader.title}
						icon={tabHeader.icon}
						key={i}
						value={i}
					/>
				))}
			</Tabs>
			{tabPanels.map((tabPanel: JSX.Element | string, i) => (
				<TabPanel key={i} value={value} index={i}>
					{tabPanel}
				</TabPanel>
			))}
		</Box>
	);
};

export default CenteredTabs;
