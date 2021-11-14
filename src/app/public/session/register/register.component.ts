import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { createUser } from 'src/app/shared/state/user';
import { Success } from '../../../shared/services/responses/success';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TenantService } from '../../../shared/state/tenant/tenant.service';
import { CurrentSubscriptionService } from '../../../shared/state/currentSubscription/current-subscription.service';
import { Tenant } from 'src/app/shared/state/tenant';
import { EmailComponent } from 'src/app/shared/components/email/email.component';
import { LoadingService } from '../../../shared/state/ui/loading/loading.service';
import { SessionUserService } from 'src/app/shared/state/session-user';
import { SessionFormatterService } from '../session-formatter.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterPageComponent implements OnInit {

  currentDate = new Date();

  private _validPassword: BehaviorSubject<boolean> = new BehaviorSubject(false);
  registrationForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    tenantName: ['', [Validators.required]],
    qtyUsers: [1, [Validators.required, Validators.pattern('^[1-9][0-9]*$'), Validators.minLength(1)]],
    email: EmailComponent.buildForm(this.fb),
    password: ['', Validators.required],
    passwordConfirmation: ['', Validators.required]
  });

  public freatures$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([
    'Pipeline',
    'Bid Inputs',
    'Client Directory',
    'Reporting',
    'Custom Settings & Configurations',
    'User Notifications',
    'One (1) Admin User']);

  messages: Map<string, string> = new Map();
  showPmtSubj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  submited$: Subject<unknown> = new Subject<unknown>();

  disabled: boolean = false;
  private regClickCount: number = 0;

  public get showPmt$(): Observable<boolean> {
    return this.showPmtSubj.asObservable();
  }

  get f() { return this.registrationForm.controls; }

  get validPassword$(): Observable<boolean> { return this._validPassword.asObservable(); };

  public get total(): number {
    return (this.f.qtyUsers.value && this.f.qtyUsers.value > 1) ? ((this.f.qtyUsers.value - 1) * 10) + 50 : 50;
  }

  apiMessageBsubj: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  public get apiMessage$(): Observable<string> {
    return this.apiMessageBsubj.asObservable();
  }

  constructor(
    private fb: FormBuilder,
    private tenantSvc: TenantService,
    private currSubSvc: CurrentSubscriptionService,
    private sessionUserService: SessionUserService,
    private router: Router,
    private route: ActivatedRoute,
    private sessionFormatter: SessionFormatterService,
    private loadingService: LoadingService
  ) {
    this.messages.set('Attempting to create a valid tenant code for',
      'We were unable to create this account. Please check if your company already has an account with BidStreak.');
    this.messages.set('That username already exists',
      'This email is already registered. Contact your company\'s BidStreak administrator to be added to their account.');

    this.initFormInteraction();
    sessionFormatter.addClass(' session-register');
  }

  ngOnInit() {
    this.submited$
      .pipe(tap(() => {
        this.disabled = true;
        this.loadingService.setLoading(this.constructor.name);
      }), map(() => {
        let newUser: any = createUser(this.registrationForm.value);
        delete newUser.passwordConfirmation;
        newUser.newUser = true;
        newUser.email = this.registrationForm.get('email').value;
        newUser.userName = newUser.email;
        newUser.qtyUsers = this.registrationForm.get('qtyUsers').value;
        return newUser;
      }))
      .pipe(switchMap(value => this.tenantSvc.registerTenant(value)))
      .pipe(map((response: Success<Tenant>) => {
        if (response.success) {
          this.tenantSvc.update(response.output);
          const user = Array.from(response.output.Users).find(u => u.tenantCode === response.output.code);
          this.sessionUserService.setSessionUser(user); // ***HACK*** api needs to obay camelcase
          try {
            this.currSubSvc.upsertStore(response.output.currentSubscription);
          } catch (e) {
            console.warn(e);
          }
          this.router.navigateByUrl('/public/card-info').catch(console.warn);
        } else
          this.apiMessageBsubj.next(response.message);
      }))
      .pipe(catchError((response, caught) => {
        this.messages.forEach((value, key) => {
          const error = response.error ? response.error : response;
          if (error && String(error.message).includes(key)) {
            this.apiMessageBsubj.next(value);
          } else {
            this.apiMessageBsubj.next(response.statusText || 'Something went wrong');
          }
        });
        this.disabled = false;
        return caught
      }))
      .pipe(tap(() => this.loadingService.clearAll()))
      .subscribe();
  }

  private initFormInteraction() {
    // clear password confirmation whenever password is updated
    this.f.password.valueChanges.subscribe(newPassword => this.f.passwordConfirmation.reset());
  }

  onStrengthChanged(strength) {
    this._validPassword.next((strength >= 80));
  }

  onSubmit() {
    this.submited$.next();
  }

  public finishReg() {
    this.router.navigateByUrl('/core/dashboard');
  }

  ngOnDestroy() {
    this.sessionFormatter.resetClass();
  }
}
