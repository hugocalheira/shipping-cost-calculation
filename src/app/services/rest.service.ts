import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(
    private _http: HttpClient
  ) { }

  readonly ROOT_URL: string = 'http://www.mocky.io/v2/';

  readonly URIs: any = {
    shippingCompany: '5b719bfe3200005c00f36f02',
    shippingModality: '5b719be93200005c00f36f01',
    regions: '5b71c6c73200005519f36fa0',
    fare: '5c080edd300000e251d25ea3'
  };

  getData(path) {
    return this._http.get<any>(this.ROOT_URL + this.URIs[path]);
  }
}
