import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../base/base.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent extends BaseComponent implements OnInit, OnDestroy {

	private destroy$ = new Subject();

  constructor(private builder: FormBuilder) {
    super(builder);
  }

  @Input('group')
  public addressFormGroup: FormGroup;

  ngOnInit() {
    super.ngOnInit();
    this.addressFormGroup;
  }

  ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.unsubscribe();
	}

  public static buildFormGroup(fb: FormBuilder): FormGroup {
		return fb.group({
    name: [''],
		street: ['', [Validators.required]],
		// street2: [''],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zip: ['', Validators.required],
		});
	}
}
