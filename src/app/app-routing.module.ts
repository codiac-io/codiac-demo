import { PreloadAllModules, Routes, RouterModule } from '@angular/router';
import { CondensedComponent } from './layouts/condensed/condensed.component';
// import { CondensedComponent } from './@pages/layouts';
// import { CondensedDashboardComponent } from './dashboard/condensed/dashboard.component';
// import { pgUploadComponent } from './@pages/components/upload/upload.component';
import { LoadConfigGuard } from './shared/services/guards/load-config-guard';

const routes: Routes = [
  {
    path: '',
    canLoad: [LoadConfigGuard],
    component: CondensedComponent,
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule),
    data: { title: 'Welcome to Codiac' }
  },
  { path: 'password/:token', redirectTo: 'public/password/:token', pathMatch: 'prefix' },
  { path: 'request-reset', redirectTo: 'request-reset', pathMatch: 'prefix' },
];

export const AppRouting = RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules, enableTracing: false });
