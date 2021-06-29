import PropTypes from "prop-types";

import { Box } from "@chakra-ui/react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";

import PostListTab from "./Tabs/PostListTab";

const ProfilTabs = ({ profil }) => {
	return (
		<Box w='70%'>
			<Heading>{profil.info.username}</Heading>
			<Tabs>
				<TabList>
					<Tab>Posts</Tab>
					<Tab>Commentaires</Tab>
					<Tab>Votes</Tab>
					<Tab>Sauvegardés</Tab>
				</TabList>

				<TabPanels>
					<TabPanel>
						<PostListTab posts={profil.info.posts} />
					</TabPanel>
					<TabPanel>
						<p>Commentaires</p>
					</TabPanel>
					<TabPanel>
						<p>Votes</p>
					</TabPanel>
					<TabPanel>
						<p>Sauvegardés</p>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Box>
	);
};

ProfilTabs.propTypes = {
	profil: PropTypes.object.isRequired,
};

export default ProfilTabs;
