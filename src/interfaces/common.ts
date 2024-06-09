export interface IPaginationResponse<T> {
	meta: {
		page: number;
		limit: number;
		total: number;
	};
	data: T;
}
