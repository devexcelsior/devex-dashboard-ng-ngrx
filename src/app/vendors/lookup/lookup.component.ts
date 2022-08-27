import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/reducers';
import { Vendor } from '../model/vendor.model';
import { selectVendors } from '../state/selectors/vendor.selectors';

@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.scss'],
})
export class LookupComponent implements OnInit {
  allVendors$: Observable<Vendor[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.reload();
  }

  reload() {
    this.allVendors$ = this.store.pipe(select(selectVendors));

    this.allVendors$.subscribe((data) => {
      console.log('data:', data);
    });
  }
}
