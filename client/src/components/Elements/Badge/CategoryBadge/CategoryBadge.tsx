import { Box } from "@material-ui/core";
import { CategoryShort } from "api/types/category";
import { FC } from "react";
import { useStyles } from "./CategoryBadge.styles";

interface CategoryBadgeProps {
	category: CategoryShort;
}

const CategoryBadge: FC<CategoryBadgeProps> = ({ category }) => {
	const styles = useStyles({ color: category.color, text_color: category.text_color });

	return <Box className={styles.container}>{category.name}</Box>;
};

export default CategoryBadge;
