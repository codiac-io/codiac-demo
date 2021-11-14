import { Component, OnInit } from '@angular/core';
import { Tenant } from 'src/app/shared/state/tenant';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'bds-tenant-selector',
  templateUrl: './tenant-selector.component.html',
  styleUrls: ['./tenant-selector.component.scss']
})
export class TenantSelectorComponent implements OnInit {

  public tenants: Partial<Tenant>[] = [];
  public user = this.loginService.userPropertiesCaptured;

  tenantForm = new FormGroup({ tenant: new FormControl(null) });

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    const tenants: Partial<Tenant>[] = [];
    const tenantProfiles = this.loginService.profiles;

    const noTenantList = !tenantProfiles || tenantProfiles.length === 0;

    if (noTenantList) {
      // redirect to login
      this.router.navigateByUrl('/public/login');
    } else {
      tenantProfiles.forEach(tenantProfile => {
        const tenant: Partial<Tenant> = {
          id: (tenants.length + 1).toString(),
          code: tenantProfile.tenantCode,
          currentSubscription: tenantProfile.currentSubscription,
          Users: [], // ***HACK*** api needs to obay camelcase
          subscriptions: [],
          created: new Date(Date.now()),
          createdBy: '',
          modified: new Date(Date.now()),
          modifiedBy: ''
        };
        tenants.push(tenant);
      });

      this.tenants = tenants;
    }

    this.tenantForm.get('tenant').valueChanges.subscribe(selection => {
      this.handleTenantSelection(selection);
    });
  }

  // when select something, either emit the value or more likely, will need to set the authTokenSvc.update() and navigate to URL
  handleTenantSelection(selectedTenant) {
    // re-issue login attempt using same credentials but complemented by tenantCode value
    const userWithSelectedTenant = {
      ...this.loginService.userWithoutTenant,
      tenantCode: selectedTenant
    };

    this.loginService.execute(userWithSelectedTenant);
  }
}
