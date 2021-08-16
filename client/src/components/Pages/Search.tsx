// React
import { FC, useState } from "react";
// Librairies
import { Box } from "@material-ui/core";
import Title from "components/Elements/Typograhpy/Title/Title";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";
import Flex from "components/Elements/Layout/Flex/Flex";
import { FlexDirectionEnum } from "components/Elements/Layout/Flex/Flex.d";
import FormControl from "components/Elements/Form/FormControl/FormControl";
import { useForm } from "react-hook-form";
import { HiSearch } from "react-icons/hi";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { useStyles } from "./Search.styles";
import Button from "components/Elements/Buttons/Button/Button";

const Search: FC<{}> = () => {
	// Styles
	const styles = useStyles();
	// Hook form
	const { register, handleSubmit, getValues } = useForm();
	// States
	const [startDate, setStartDate] = useState<Date | null>(new Date());
	const [endDate, setEndDate] = useState<Date | null>(new Date());
	// Custom methods
	const onSubmit = () => {
		console.log(getValues("search"), startDate, endDate);
	};

	return (
		<Box width='100%'>
			<Title semantic={TitleVariantEnum.H1}>Recherche</Title>
			<form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
				<Flex direction={FlexDirectionEnum.Horizontal}>
					<FormControl
						label='Recherche'
						placeholder="Titre, nom d'utilisateur, catégorie ..."
						type='text'
						identifier='search'
						register={register}
						startIcon={<HiSearch />}
					></FormControl>
					<KeyboardDatePicker
						disableToolbar
						variant='inline'
						format='MM/dd/yyyy'
						margin='normal'
						id='startDate'
						label='Entre le'
						className={styles.input}
						value={startDate}
						onChange={(date: Date | null) => {
							setStartDate(date);
						}}
						KeyboardButtonProps={{
							"aria-label": "change date",
							style: { color: "var(--text)" },
						}}
						InputLabelProps={{ style: { color: "var(--text)" } }}
						InputProps={{ style: { color: "var(--text)" } }}
					/>
					<KeyboardDatePicker
						style={{ color: "var(--text)" }}
						disableToolbar
						variant='inline'
						format='MM/dd/yyyy'
						margin='normal'
						id='endDate'
						label='et le'
						className={styles.input}
						value={endDate}
						onChange={(date: Date | null) => {
							setEndDate(date);
						}}
						KeyboardButtonProps={{
							"aria-label": "change date",
							style: { color: "var(--text)" },
						}}
						InputLabelProps={{ style: { color: "var(--text)" } }}
						InputProps={{ style: { color: "var(--text)" } }}
					/>
				</Flex>
				<Button label='Appliquer' type='submit' />
			</form>
		</Box>
	);
};

export default Search;
