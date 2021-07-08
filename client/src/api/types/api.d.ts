import { AxiosResponse } from "axios";

type SingleDataResponse<T> = {
	data: T;
};

type Error = {
	[x: string]: any;
};

type ServiceResponse = {
	success: boolean;
	errors?: Array<Error>;
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
	search?: string;
};

export { SingleDataResponse, ApiResult, ListDataResponse, Search };
