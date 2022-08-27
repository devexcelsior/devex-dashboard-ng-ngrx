import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vendor } from '../model/vendor.model';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class VendorsHttpService {
  private endpoint = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  findAllVendors(): Observable<Vendor[]> {
    return this.http
      .get(`${this.endpoint}/vendors`)
      .pipe(map((res: any) => res));
  }

  findVendorByUrl(vendorUrl: string): Observable<Vendor> {
    return this.http.get<Vendor>(`/api/vendors/${vendorUrl}`);
  }

  //   findVendors(
  //     vendorId: number,
  //     pageNumber = 0,
  //     pageSize = 3
  //   ): Observable<Vendor[]> {
  //     return this.http.get<Vendor[]>('/api/vendors', {
  //       params: new HttpParams()
  //         .set('vendorId', vendorId.toString())
  //         .set('sortOrder', 'asc')
  //         .set('pageNumber', pageNumber.toString())
  //         .set('pageSize', pageSize.toString()),
  //     });
  //   }

  saveVendor(vendorId: string | number, changes: Partial<Vendor>) {
    return this.http.put('/api/vendor/' + vendorId, changes);
  }
}
