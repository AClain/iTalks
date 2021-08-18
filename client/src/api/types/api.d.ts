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
	startDate?: Date | null;
	endDate?: Date | null;
};

type ApiResult = AxiosResponse<ServiceResponse>;
type ApiArrayDataResult<T> = AxiosResponse<T[]>;
type ApiListDataResult<T> = AxiosResponse<ListDataResponse<T>>;

export { SingleDataResponse, ApiResult, ApiArrayDataResult, ApiListDataResult, Search, ListDataResponse };
