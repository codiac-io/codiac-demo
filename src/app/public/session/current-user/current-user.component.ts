import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { AddressComponent } from 'src/app/shared/components/address/address.component';
import { ContactComponent } from 'src/app/shared/components/contact/contact.component';
import { User, UserService, UserQuery } from 'src/app/shared/state/user';
import { EmailComponent } from 'src/app/shared/components/email/email.component';

@Component({
  selector: 'current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.scss']
})
export class CurrentUserComponent extends BaseComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject();

  constructor(private builder: FormBuilder, private userService: UserService, private userQuery: UserQuery) {
    super(builder);
  }

  showAddresses: boolean = true;
  addresses: FormArray;
  contacts: FormArray;
  selctedClientIdBehavior: BehaviorSubject<string> = new BehaviorSubject('');

  userForm: FormGroup;
  @Input('group')
  public set userFormGroup(value: FormGroup) {
    this.userForm = value;
    // this.addresses = this._userFormGroup.get('addresses') as FormArray;
    // this.contacts = this._userFormGroup.get('contacts') as FormArray;

    // this.defaultContactBehaviorSub.next(this._userFormGroup.value.defaultContact);
  }

  @Input()
  set ShowAddresses(value: boolean) {
    this.showAddresses = value;
  }

  @Input('disabled')
  set disabled(value: boolean) {
    (value) ? this.userForm.disable() : this.userForm.enable();
    this.userForm.controls.name.enable();
  }

  removeValidation() {
    for (const field in this.userForm.controls) {
      this.userForm.get(field).validator = null;
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  public static buildFormGroup(fb: FormBuilder): FormGroup {
    return fb.group({
      id: [{ value: '', disabled: false }],
      firstName: [{ value: '', disabled: false }, Validators.required],
      lastName: [{ value: '', disabled: false }, Validators.required],
      roles: [{ value: '', disabled: false }, Validators.required],
      email: EmailComponent.buildForm(fb),
      // phone: PhoneComponent.buildForm(fb, [Validators.minLength(14)]),
    });
  }

  roles = [
    { value: 'User', label: 'Contributor' },
    { value: 'Admin', label: 'Admin' },
  ];

  onClientSelect(obj) {
    this.userForm.patchValue(obj.item);
  }

  addAddress(): void {
    this.addresses.push(AddressComponent.buildFormGroup(this.formBuilder));
  }

  addContact(): void {
    this.contacts.push(ContactComponent.buildFormGroup(this.formBuilder));
  }

  remove(value: User) {
    let contacts: User[] = this.userForm.controls['contacts'].value;
    let idx = contacts.indexOf(value);
    (this.userForm.controls['contacts'] as FormArray).removeAt(idx);
    this.userForm.markAsDirty();
  }
}
