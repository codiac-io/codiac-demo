import { Component, OnInit, Output, EventEmitter, ViewChild } from "@angular/core";
import { FormGroup, FormControl, FormArray, FormBuilder, AbstractControl } from "@angular/forms";

import { List } from "immutable";

@Component({
	selector: 'app-base',
	template: ''
})

export class BaseComponent implements OnInit {
	@Output() isFormValid: EventEmitter<any> = new EventEmitter<any>();
	formGroup: FormGroup;
	formGroupName: string;
	childComponents: BaseComponent[] = [];
	constructor(public formBuilder: FormBuilder) {
	}

	ngOnInit(): void {
		this.buildFormGroup(this.childComponents, this.formGroup);
	}

	buildFormGroup(components: BaseComponent[], formGroup: FormGroup) {
		components.forEach(comp => {
			formGroup.registerControl(comp.formGroupName, comp.formGroup);
			if ((comp as BaseComponent).childComponents.length > 0) {
				this.buildFormGroup(comp.childComponents, formGroup.controls[comp.formGroupName] as FormGroup);
			}
		});
	}

}