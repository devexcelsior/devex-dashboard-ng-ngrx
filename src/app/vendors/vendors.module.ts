import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorsRoutingModule } from './vendors-routing.module';
import { LookupComponent } from './lookup/lookup.component';
import { StoreModule } from '@ngrx/store';
import * as fromVendors from './state/reducers';
import { EffectsModule } from '@ngrx/effects';
import { VendorsEffects } from './state/effects/vendor.effects';
import { VendorsHttpService } from './services/vendors-http.service';
import { VendorsResolver } from './services/vendors.resolver';

@NgModule({
  declarations: [LookupComponent],
  imports: [
    CommonModule,
    VendorsRoutingModule,
    EffectsModule.forFeature([VendorsEffects]),
    StoreModule.forFeature(
      fromVendors.vendorsFeatureKey,
      fromVendors.vendorsReducer
    ),
  ],
  providers: [VendorsResolver, VendorsHttpService],
})
export class VendorsModule {}
