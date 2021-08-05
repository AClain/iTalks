import { FC, useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { api } from "api/api.request";
import { AxiosError } from "axios";
import { Category } from "api/types/category";

const CategoryList: FC<{}> = () => {
	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		api.category
			.all()
			.then((res) => {
				console.log(res);
				if (res.status === 201) {
					setCategories(res.data.items);
				}
			})
			.catch((err: AxiosError) => {
				console.error(err);
			});
		return () => {};
	}, []);

	return <Box></Box>;
};

export default CategoryList;
