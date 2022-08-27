import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VendorState, vendorsFeatureKey } from '../reducers';

import * as fromVendors from '../reducers';

export const selectVendorState =
  createFeatureSelector<VendorState>(vendorsFeatureKey);

export const selectAllVendors = createSelector(
  selectVendorState,
  fromVendors.selectAll
);

export const selectVendors = createSelector(selectAllVendors, (vendors) =>
  vendors.map((vendor) => vendor)
);

export const areVendorsLoaded = createSelector(
  selectVendorState,
  (state) => state.allVendorsLoaded
);
