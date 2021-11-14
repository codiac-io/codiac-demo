import { FormControl, FormGroup, Validators } from '@angular/forms';
import { hasRequiredField } from '../../components/utilities/has-required-field';

describe('hasRequiredField()', () => {
  it('should return false if passed in anything other than AbstractControl', () => {
    const notAbstractControl = [
      null,
      undefined,
      1,
      'hi',
      () => {},
      new Proxy({}, {}),
      NaN,
      Infinity,
    ];

    notAbstractControl.forEach(value => {
      expect(hasRequiredField(<any>value)).toBe(false);
    });
  });

  it('should return false if passed in control without any validators', () => {
    expect(hasRequiredField(new FormControl(''))).toBe(false);
  });

  it('should return false if passed in group without any validators', () => {
    const formGroup = new FormGroup({
      hi: new FormControl(''),
    });

    expect(hasRequiredField(formGroup)).toBe(false);
  });

  it('should return false if passed in control without required validator', () => {
    expect(hasRequiredField(new FormControl('', Validators.max(5)))).toBe(
      false,
    );
  });

  it('should return false if passed in group without required validators', () => {
    const formGroup = new FormGroup({
      hi: new FormControl('', Validators.max(5)),
    });

    expect(hasRequiredField(formGroup)).toBe(false);
  });

  it('should return true if passed in control with the required validator', () => {
    expect(hasRequiredField(new FormControl('', Validators.required))).toBe(
      true,
    );
  });

  it('should return true if passed in group with nested required validator', () => {
    const formGroup = new FormGroup({
      hi: new FormGroup({
        nested: new FormControl('', Validators.required)
      })
    });

    expect(hasRequiredField(formGroup)).toBe(true);
  });

  it('should return true if passed in group with required validator', () => {
    const formGroup = new FormGroup({
      hi: new FormControl('', Validators.required),
    });

    expect(hasRequiredField(formGroup)).toBe(true);
  });
});