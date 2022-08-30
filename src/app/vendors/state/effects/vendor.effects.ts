import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { VendorActions } from '../actions';
import { VendorsHttpService } from '../../services/vendors-http.service';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class VendorsEffects {
  constructor(
    private actions$: Actions,
    private vendorsHttpService: VendorsHttpService,
    private router: Router
  ) {}

  loadVendors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VendorActions.loadAllVendors),
      switchMap(() =>
        from(this.vendorsHttpService.findAllVendors()).pipe(
          map((vendors) => VendorActions.allVendorsLoadSuccess({ vendors })),
          catchError((err: HttpErrorResponse) => {
            const error = {
              name: err.name,
              message: err.message,
              error: err.error,
            };
            return of(VendorActions.allVendorsLoadFailure(error));
          })
        )
      )
    )
  );

  loadAllVendorsFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(VendorActions.allVendorsLoadFailure),
        tap((action) => {
          if (action.error === 'Missing authorization header') {
            // Add toast notification - You are not authorized to view this page
            this.router.navigateByUrl('/login');
            return;
          }
          if (action.error === 'jwt expired') {
            // Add toast notification that session has expired
            this.router.navigateByUrl('/login');
            return;
          }
        })
      ),
    { dispatch: false }
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
