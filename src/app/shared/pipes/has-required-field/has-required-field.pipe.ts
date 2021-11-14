import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { hasRequiredField } from '../../components/utilities/has-required-field';

import * as hashSum from 'hash-sum';

@Pipe({
  name: 'hasRequiredField',
  pure: false,
})
export class HasRequiredFieldPipe implements PipeTransform {
  cachedControlHash: string = null;
  cachedResult: boolean = null;

  transform(control: AbstractControl): boolean {
    const newHashOfControl = hashSum(control);

    if (newHashOfControl !== this.cachedControlHash) {
        const nowHasRequiredField = hasRequiredField(control);

        this.cachedControlHash = hashSum(control);
        this.cachedResult = nowHasRequiredField;

        return nowHasRequiredField;
    }

    return this.cachedResult;
  }
}