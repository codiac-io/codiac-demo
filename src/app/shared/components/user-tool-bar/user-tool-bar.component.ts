import { Component, OnInit } from '@angular/core';
import { User, UserQuery, UserService, createUser } from '../../state/user';
import { AuthTokenService } from '../../state/auth-token/auth-token.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthTokenQuery } from '../../state/auth-token';
import { map, filter, withLatestFrom, tap, concatMap, delay, distinctUntilChanged } from 'rxjs/operators';
import { Subject, combineLatest } from 'rxjs';
import { SessionUserService } from '../../state/session-user/session-user.service';
import { SessionUserQuery } from '../../state/session-user';
import { SessionUser } from '../../state/session-user/session-user.model';

@Component({
  selector: 'user-tool-bar',
  templateUrl: './user-tool-bar.component.html',
  styleUrls: ['./user-tool-bar.component.scss']
})
export class UserToolBarComponent implements OnInit {

  constructor(private sessionUserQuery: SessionUserQuery, private tokenService: AuthTokenService, private tokenQuery: AuthTokenQuery, private router: Router, private route: ActivatedRoute,) { }

  password: string;
  user: SessionUser;
  loggedOutSubj: Subject<boolean> = new Subject();

  ngOnInit() {
    this.sessionUserQuery.selectFirst()
      .pipe(map(user => { this.user = user }))
      .subscribe()
  }

  logoutClick() {
    this.tokenService.logout();
    this.router.navigateByUrl("/");
  }

  goToUser(user: User) {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: { ids: user.id },
        queryParamsHandling: 'merge'
      });
  }

  changeTheme(theme: any) {
    const key1 = `$color-master`;
    const value1 = "#bbbsb";
    const key2 = `color-master-bg`;
    const value2 = "#fff";
    document.documentElement.style.setProperty(key1, value1);
    document.documentElement.style.setProperty(key2, value2);
  }
}
