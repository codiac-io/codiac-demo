import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  EventEmitter,
  Output
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BaseComponent } from "../base/base.component";
import { Subject, BehaviorSubject, Observable } from "rxjs";
import {
  tap,
  takeUntil,
  combineLatest,
  map,
  withLatestFrom
} from "rxjs/operators";
import * as _ from "lodash";
import { EmailComponent } from "../email/email.component";
import { PhoneComponent } from "../phone/phone.component";
import { Contact } from '../../state/contact/contact.model';

@Component({
  selector: "contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"]
})
export class ContactComponent extends BaseComponent
  implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  private defaultBehavior: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );

  @Input('noHeader') noHeader = false;


  constructor(private builder: FormBuilder) {
    super(builder);
  }

  private _contactForm: FormGroup;

  // Yet another RxForms issue. I cant get the init value as an Observable, so I have to listen to a @Input setter
  private initContactBSub: BehaviorSubject<Contact> = new BehaviorSubject(null);
  public get initContact$(): Observable<Contact> {
    return this.initContactBSub.asObservable();
  }

  private isDefaultBehaviorSub: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );
  public get isDefault$(): Observable<boolean> {
    return this.isDefaultBehaviorSub.asObservable();
  }

  expanded = true;

  @Input() additionalClasses = '';

  @Input() defaultContact$: Observable<Contact>;
  @Output() Remove$ = new EventEmitter();
  @Output() SetAsDefault$ = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Input() expand = true;

  @Input("group")
  public set contactForm(form: FormGroup) {
    this._contactForm = form;
    this.initContactBSub.next(form.value);
    this.setClientCardTitle();
  }

  public get contactForm(): FormGroup {
    return this._contactForm;
  }

  public contactCardTitle = '';
  public setClientCardTitle() {
    if (!this.isNewContact) {
      this.contactCardTitle = this.contactForm.get("firstName").value + ' ' + this.contactForm.get("lastName").value;
    } else {
      this.contactCardTitle = 'New Contact';
    }
    return this.contactCardTitle;
  }

  get isNewContact() {
    if (typeof this.contactForm.get("id").value !== 'number' && this.contactForm.get('id').value !== '' && this.contactForm.get('id').value !== null) {
      return false;
    } else {
      return true;
    }
  }

  ngOnInit() {
    // this is to update the VM so the comparison below will be up-to-date and a pure func
    this._contactForm.valueChanges
      .pipe(tap(v => this.initContactBSub.next(v)))
      .subscribe();

    // this decides whether this one is the default or not
    super.ngOnInit();
    this.initContact$
      .pipe(combineLatest(this.defaultContact$))
      .pipe(
        map(([formVal, setVal]) => {
          if (formVal && setVal) {
            _.isEqual(formVal.id, setVal.id)
              ? this.isDefaultBehaviorSub.next(true)
              : this.isDefaultBehaviorSub.next(false);
          } else {
            this.isDefaultBehaviorSub.next(false);
          }

        })
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  public static buildFormGroup(fb: FormBuilder): FormGroup {
    return fb.group({
      id: [],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      title: [""],
      email: EmailComponent.buildForm(fb),
      phone: PhoneComponent.buildForm(fb, [
        Validators.required,
        Validators.minLength(14)
      ])
    });
  }

  setDefault() {
    this.contactForm.controls.default.setValue(
      !this.contactForm.controls.default.value
    );
  }

  remove() {
    this.Remove$.emit(this.contactForm.value);
  }

  setAsDefault() {
    this.SetAsDefault$.emit(this.contactForm.value);
  }
}
