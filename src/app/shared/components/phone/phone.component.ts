import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../base/base.component';
import { Subject } from 'rxjs';
import { hasRequiredField } from '../utilities/has-required-field';


@Component({
  selector: 'phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent extends BaseComponent implements OnInit, OnDestroy {

  ;
	private destroy$ = new Subject();

  constructor(private builder: FormBuilder) {
    super(builder);
  }

  @Input('group')
  public phoneForm: FormGroup;

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.unsubscribe();
  }


  public get hasRequiredField() : boolean {
    return hasRequiredField((this.phoneForm.get('phone')));
  }


  public static buildForm(fb: FormBuilder, validators?: Validators[]): FormGroup {
		return fb.group({
      phone: [{value: '', disabled: false}, (validators)? validators: [Validators.required, Validators.minLength(14)]],
		});
	}
}
