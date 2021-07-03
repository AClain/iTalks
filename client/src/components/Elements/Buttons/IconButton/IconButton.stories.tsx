import { IconButton } from "./IconButton";
import { IconButtonProps } from "./IconButton.d";

import { HiCog } from "react-icons/hi";

export default {
	component: IconButton,
	title: "Elements/Buttons/IconButton",
};

const Template = (args: IconButtonProps) => <IconButton {...args}></IconButton>;

export const Default = Template.bind({});
// Default.args = {
// 	type: "purple",
// 	size: "md",
// 	light: true,
// 	icon: <HiCog />,
// };
