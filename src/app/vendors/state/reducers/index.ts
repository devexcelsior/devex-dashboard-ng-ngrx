import { Vendor, compareVendors } from '../../model/vendor.model';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { VendorActions } from '../../state/actions';

export const vendorsFeatureKey = 'vendors';

export interface VendorState extends EntityState<Vendor> {
  allVendorsLoaded: boolean;
}

export const adapter = createEntityAdapter<Vendor>({
  sortComparer: compareVendors,
});

export const initialVendorsState = adapter.getInitialState({
  allVendorsLoaded: false,
});

export const vendorsReducer = createReducer(
  initialVendorsState,

  on(VendorActions.allVendorsLoadSuccess, (state, action) =>
    adapter.setAll(action.vendors, { ...state, allVendorsLoaded: true })
  ),

  on(VendorActions.allVendorsLoadFailure, (state, action) => {
    return {
      ...state,
      allVendorsLoaded: false,
    };
  }),

  on(VendorActions.vendorUpdated, (state, action) =>
    adapter.updateOne(action.update, state)
  )
);

export const { selectAll } = adapter.getSelectors();
