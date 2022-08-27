import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from '../../state/reducers';
import { select, Store } from '@ngrx/store';
import { filter, finalize, first, tap } from 'rxjs/operators';
import { VendorActions } from '../state/actions';
import { areVendorsLoaded } from '../state/selectors/vendor.selectors';

@Injectable()
export class VendorsResolver implements Resolve<any> {
  loading = false;

  constructor(private store: Store<AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      select(areVendorsLoaded),
      tap((vendorsLoaded) => {
        if (!this.loading && !vendorsLoaded) {
          this.loading = true;
          this.store.dispatch(VendorActions.loadAllVendors());
        }
      }),
      filter((coursesLoaded) => coursesLoaded),
      first(),
      finalize(() => (this.loading = false))
    );
  }
}
