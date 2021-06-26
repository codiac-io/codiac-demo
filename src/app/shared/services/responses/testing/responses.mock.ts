import * as responses from '../';

export const fakeSuccess = <T = any>(success:boolean, output?: T, message?: string): responses.Success<T> => ({ success, output, message});

export const fakeFailure = <T = any>(
	failureType: responses.FailureType,
	failureCode: string,
	message: string): responses.Failure => ({
	failureType,
	failureCode,
	message,
	stackTrace: '',
	validationItems: []
});