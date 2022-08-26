import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VendorState } from '../reducers';

import * as fromVendors from '../reducers';

export const selectVendorState = createFeatureSelector<VendorState>('vendors');

export const selectAllVendors = createSelector(
  selectVendorState,
  fromVendors.selectAll
);

export const areVendorsLoaded = createSelector(
  selectVendorState,
  (state) => state.allVendorsLoaded
);
