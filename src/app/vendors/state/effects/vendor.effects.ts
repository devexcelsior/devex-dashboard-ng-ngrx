import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { VendorActions } from '../actions';
import { VendorsHttpService } from '../../services/vendors-http.service';
import { concatMap, map, tap } from 'rxjs/operators';
import { allVendorsLoaded } from '../actions/vendor.actions';

@Injectable()
export class VendorsEffects {
  constructor(
    private actions$: Actions,
    private vendorsHttpService: VendorsHttpService
  ) {}

  loadVendors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VendorActions.loadAllVendors),
      concatMap((action) => this.vendorsHttpService.findAllVendors()),
      map((vendors) => allVendorsLoaded({ vendors }))
    )
  );

  saveVendor$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(VendorActions.vendorUpdated),
        concatMap((action) =>
          this.vendorsHttpService.saveVendor(
            action.update.id,
            action.update.changes
          )
        )
      ),
    { dispatch: false }
  );
}
