import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { LookupComponent } from './lookup/lookup.component';
import { VendorsResolver } from './services/vendors.resolver';

const routes: Routes = [
  {
    path: '',
    component: LookupComponent,
    canActivate: [AuthGuard],
    resolve: {
      vendors: VendorsResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorsRoutingModule {}
