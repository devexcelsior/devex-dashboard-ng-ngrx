import { createAction, props } from '@ngrx/store';
import { Vendor } from '../../model/vendor.model';
import { Update } from '@ngrx/entity';

export const loadAllVendors = createAction(
  '[Vendors Resolver] Load All Vendors'
);

export const allVendorsLoadSuccess = createAction(
  '[Load All Vendors Effect] All Vendors Loaded',
  props<{ vendors: Vendor[] }>()
);

export const allVendorsLoadFailure = createAction(
  '[Load All Vendors Failure] All Vendors Load Failure',
  props<{ error: any }>()
);

export const vendorUpdated = createAction(
  '[Edit Vendor Dialog] Vendor Updated',
  props<{ update: Update<Vendor> }>()
);
