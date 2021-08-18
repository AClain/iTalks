import { FC, useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { api } from "api/api.request";
import { AxiosError } from "axios";
import { Category as CategoryType } from "api/types/category";
import Category from "components/Submodules/Category/Category";
import Flex from "components/Elements/Layout/Flex/Flex";
import { FlexDirectionEnum, FlexJustifyEnum } from "components/Elements/Layout/Flex/Flex.d";
import Loading from "components/Elements/Animations/Loading/Loading";

const CategoryList: FC<{}> = () => {
	const [loading, setLoading] = useState(true);
	const [categories, setCategories] = useState<CategoryType[]>([]);

	useEffect(() => {
		setLoading(true);

		api.category
			.all()
			.then((res) => {
				setCategories(res.data);
			})
			.catch((err: AxiosError) => {
				console.error(err);
			})
			.finally(() => {
				setLoading(false);
			});
		return () => {};
	}, []);

	return (
		<>
			{loading ? (
				<Flex direction={FlexDirectionEnum.Horizontal} justify={FlexJustifyEnum.Center}>
					<Loading radius={15} />
				</Flex>
			) : (
				categories.length > 0 && categories.map((c, k) => <Category key={k} category={c} />)
			)}
		</>
	);
};

export default CategoryList;
