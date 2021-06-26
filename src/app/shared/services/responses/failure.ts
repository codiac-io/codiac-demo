import { ValidationItem } from './validation-item';
import { FailureType } from './failure-type';

export class Failure {
	failureType: FailureType;
	failureCode: string;
	message: string;

	validationItems?: ValidationItem[] = [];

	// only in dev
	stackTrace?: string;

	static fromError(error: Error, failureCode: string = null): Failure {
		const failure = new Failure();
		failure.failureType = FailureType.General;
		failure.failureCode = failureCode || error.name;
		failure.message = error.message;
		failure.stackTrace = error.stack;

		failure.validationItems = [];

		return failure;
	}

	static isFailure(object: any): boolean {
		return !!object
			&& !!(object as any).failureCode
			&& !!(object as any).failureType;
	}
}

export class HttpFailure extends Failure {
	method?: 'GET' | 'PUT' | 'POST';
	url?: string;
	statusCode?: number;
}
