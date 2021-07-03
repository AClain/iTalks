import { AxiosResponse } from "axios";

type SingleDataResponse<T> = {
	data: T;
};

type ServiceResponse = {
	success: boolean;
	message: string;
};

type ApiResult = AxiosResponse<ServiceResponse>;

type ListDataResponse<T> = {
	count: number;
	total: number;
	items: T[];
};

type Search = {
	page: number;
	limit: number;
};

export { SingleDataResponse, ApiResult, ListDataResponse, Search };
