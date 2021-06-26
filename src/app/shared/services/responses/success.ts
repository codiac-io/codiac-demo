export class Success<T> {
	public success: boolean;
	public output?: T;
	public message?: string;
	public error?: any;
}