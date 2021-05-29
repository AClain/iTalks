import { useState, useContext } from "react";

import { GlobalContext } from "../../providers/GlobalContext";

import { Stack } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";

import { HiChevronUp, HiChevronDown, HiOutlineSun, HiMoon } from "react-icons/hi";

const SwitchTheme = () => {
	const context = useContext(GlobalContext);

	const [hidden, setHidden] = useState(true);

	const changeMode = () => {
		if (context.theme === "dark") {
			context.setTheme("light");
			localStorage.setItem("theme", "light");
			return;
		}
		context.setTheme("dark");
		localStorage.setItem("theme", "dark");
	};

	return (
		<Stack
			position='fixed'
			alignItems='center'
			bottom={hidden ? "-9%" : "0px"}
			right='25px'
			w='auto'
			h='auto'
			p='0px 10px 20px 10px'
			bg='var(--text)'
			color='var(--bg)'
			boxShadow='var(--medium-box-shadow)'
			borderRadius='3px'>
			<Icon
				as={hidden ? HiChevronUp : HiChevronDown}
				fontSize='35px'
				color='var(--bg)'
				onClick={() => {
					setHidden(!hidden);
				}}
				_hover={{ cursor: "pointer" }}
			/>
			<Icon
				as={context.theme === "dark" ? HiOutlineSun : HiMoon}
				fontSize='50px'
				color='var(--bg)'
				onClick={changeMode}
				_hover={{ cursor: "pointer" }}
			/>
		</Stack>
	);
};

export default SwitchTheme;
