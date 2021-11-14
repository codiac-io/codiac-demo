import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BaseComponent } from '../base/base.component';
import { Subject } from 'rxjs';
import { hasRequiredField } from '../utilities/has-required-field';


@Component({
  selector: 'email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent extends BaseComponent implements OnInit, OnDestroy {
  
  ;
	private destroy$ = new Subject();

  constructor(private builder: FormBuilder) { 
    super(builder);
  }

  @Input('group')
  public emailForm: FormGroup;

  ngOnInit() {
    super.ngOnInit();
    this.emailForm;
  }

  ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.unsubscribe();
  }
  
  
  public get hasRequiredField() : boolean {
    return hasRequiredField((this.emailForm.get('email')));
  }
  

  public static buildForm(fb: FormBuilder, validators?: Validators[]): FormControl {
    return new FormControl('', [Validators.required, Validators.email]);
	}
}
