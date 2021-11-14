import { Component, OnInit, ViewChild } from '@angular/core';
import { TenantQuery } from '../../../shared/state/tenant/tenant.query';
import { tap } from 'rxjs/operators';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { AuthTokenQuery } from '../../../shared/state/auth-token/auth-token.query';

@Component({
  selector: 'bds-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss']
})
export class TenantComponent implements OnInit {

  name = 'Set iframe source';
  baseUrl: string = "https://sandbox-bidstreakllc.mybillsystem.com/ManagedPortal/Home?token=";
  urlSafe: SafeResourceUrl;
  @ViewChild('slideUp', { static: true }) slideUp: ModalDirective;

  constructor(private tenantQuery: TenantQuery, public sanitizer: DomSanitizer, private authTokenQuery: AuthTokenQuery) { }

  ngOnInit() {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.baseUrl}${this.authTokenQuery.getPortalToken()}`);

    this.tenantQuery.selectAllWithApi()
      .pipe(tap(tenants =>
        console.log(tenants)))
      .subscribe();
  }
}
