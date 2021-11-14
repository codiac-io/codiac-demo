import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { AddressComponent } from 'src/app/shared/components/address/address.component';
import { ContactComponent } from 'src/app/shared/components/contact/contact.component';
import { UserService } from '../../state/user/user.service';
import { UserQuery } from '../../state/user/user.query';
import { EmailComponent } from '../email/email.component';
import { Access } from '../../enum/access';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends BaseComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject();

  @Input() additionalClasses = '';
  @Input() isSendingResetPasswordLink = false;
  @Input() usersForm;
  @Input() fmUsers;

  @Output() reset = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() remove = new EventEmitter();
  @Output() resetPassword = new EventEmitter();
  @Output() emitSave = new EventEmitter();

  constructor(private builder: FormBuilder, private userService: UserService, private userQuery: UserQuery) {
    super(builder);
  }

  showAddresses: boolean = true;
  addresses: FormArray;
  contacts: FormArray;
  selctedClientIdBehavior: BehaviorSubject<string> = new BehaviorSubject('');

  get isExistingUser() {
    return this.userForm.get('id').value && this.userForm.get('id').value.length > 0;
  }

  get hasAccess(): boolean {
    return (this.userService.access() === Access.READWRITE) ? true : false;
  }

  get userCardTitle() {
    if (this.isExistingUser) {
      return this.originalUserProperties.firstName + ' ' + this.originalUserProperties.lastName;
    } else {
      return 'New User';
    }
  }

  private originalUserProperties;
  userForm: FormGroup;

  @Input('group')
  public set userFormGroup(formGroupValue: FormGroup) {
    this.userForm = formGroupValue;
    this.originalUserProperties = formGroupValue.value;
  }

  @Input()
  set ShowAddresses(value: boolean) {
    this.showAddresses = value;
  }

  @Input('disabled')
  set disabled(value: boolean) {
    (value) ? this.userForm.disable() : this.userForm.enable();
  }

  roles = [
    { value: 'User', label: 'Estimator' },
    { value: 'Admin', label: 'Admin' },
  ];

  public static buildFormGroup(fb: FormBuilder): FormGroup {
    return fb.group({
      id: [{ value: '', disabled: false }],
      firstName: [{ value: '', disabled: false }, Validators.required],
      lastName: [{ value: '', disabled: false }, Validators.required],
      role: [{ value: '', disabled: false }, Validators.required],
      email: EmailComponent.buildForm(fb),
      // password: [{ value: '', disabled: false }]
    });
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


  onClientSelect(obj) {
    this.userForm.patchValue(obj.item);
  }

  addAddress(): void {
    this.addresses.push(AddressComponent.buildFormGroup(this.formBuilder));
  }

  addContact(): void {
    this.contacts.push(ContactComponent.buildFormGroup(this.formBuilder));
  }

  onOpenChange(justOpened) {
    this.userForm.get('role').markAsTouched();
  }

  private _validPassword: BehaviorSubject<boolean> = new BehaviorSubject(false);

  get validPassword$(): Observable<boolean> {
    return this._validPassword.asObservable();
  };

  onStrengthChanged(strength) {
    this._validPassword.next((strength >= 80) ? true : false);
  }

  onRequestResetPassword() {
    this.resetPassword.emit();
  }
}
