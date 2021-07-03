import { Button } from "./Button";
import { ButtonProps } from "./Button.d";

export default {
	component: Button,
	title: "Elements/Buttons/Button",
	argTypes: {
		fullWidth: {
			name: "fullWidth",
			type: {
				name: "boolean",
			},
		},
	},
};

const Template = (args: ButtonProps) => <Button {...args}></Button>;

export const Default = Template.bind({});
