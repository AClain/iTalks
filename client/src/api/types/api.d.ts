import { AxiosResponse } from "axios";

type SingleDataResponse<T> = {
	data: T;
};

type Error = {
	[x: string]: any;
};

type ServiceResponse = {
	[x: string]: any;
};

type ListDataResponse<T> = {
	count: number;
	total: number;
	items: T[];
};

type Search = {
	page: number;
	limit: number;
	search?: string;
};

type ApiResult = AxiosResponse<ServiceResponse>;
type ApiListDataResult<T> = AxiosResponse<ListDataResponse<T>>;

export { SingleDataResponse, ApiResult, ApiListDataResult, Search };
