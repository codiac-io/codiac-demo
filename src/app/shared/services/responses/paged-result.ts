import { Pagination } from './pagination';
import { Success } from './success';

export interface PagedResult<T> extends Success<T[]> {
	pagination: Pagination;
}
