import { Component, OnInit } from '@angular/core';
import { Vendor } from '../model/vendor.model';

@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.scss'],
})
export class LookupComponent implements OnInit {
  vendors: Vendor[];

  constructor() {}

  ngOnInit(): void {}
}
