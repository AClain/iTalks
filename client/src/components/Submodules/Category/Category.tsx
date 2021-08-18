import { FC } from "react";
import { Category as CategoryType } from "api/types/category";
import Flex from "components/Elements/Layout/Flex/Flex";
import { FlexAlignEnum, FlexDirectionEnum, FlexJustifyEnum } from "components/Elements/Layout/Flex/Flex.d";
import Title from "components/Elements/Typograhpy/Title/Title";
import ResetLink from "components/Elements/Typograhpy/Link/ResetLink";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";
import { HiTag } from "react-icons/hi";

export interface CategoryProps {
	category: CategoryType;
}

const Category: FC<CategoryProps> = ({ category }) => {
	return (
		<Flex
			p='35px 0px'
			direction={FlexDirectionEnum.Horizontal}
			align={FlexAlignEnum.Start}
			justify={FlexJustifyEnum.SpaceEvenly}
		>
			<Flex width='80%' direction={FlexDirectionEnum.Vertical}>
				<ResetLink to={"/category/" + category.id} color={category.color}>
					<Flex direction={FlexDirectionEnum.Horizontal} align={FlexAlignEnum.Center}>
						<HiTag style={{ marginRight: "15px" }} fontSize='18px' color={category.color} />
						<Title semantic={TitleVariantEnum.H4}>{category.name}</Title>
					</Flex>
				</ResetLink>
				<span>{category.description}</span>
			</Flex>
			<Flex direction={FlexDirectionEnum.Vertical}>
				<Title semantic={TitleVariantEnum.H5}>{category.post_count.toString()}</Title>
				<span>Posts</span>
			</Flex>
		</Flex>
	);
};

export default Category;
