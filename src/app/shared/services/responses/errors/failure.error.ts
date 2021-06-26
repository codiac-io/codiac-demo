import { Failure } from '../failure';
import { FailureType } from '../failure-type';

export abstract class FailureError extends Error {
	constructor(public failure: Failure) {
		super(failure.message);
	}

	static forValidationFailure(failure: Failure): ValidationFailureError {
		return new ValidationFailureError(failure);
	}

	static forGeneralFailure(failure: Failure): GeneralFailureError {
		return new GeneralFailureError(failure);
	}

	static create(failure: Failure): FailureError {
		return failure.failureType === FailureType.General
			? FailureError.forGeneralFailure(failure)
			: FailureError.forValidationFailure(failure);
	}
}

export class ValidationFailureError extends FailureError { }
export class GeneralFailureError extends FailureError { }
