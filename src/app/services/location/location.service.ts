import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SEARCH_CONFIG } from 'src/app/global-config';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private httpClient: HttpClient) { }

  getCityState(zipcode) {
    let ApiURL = SEARCH_CONFIG.ZIPCODE_API_URL+SEARCH_CONFIG.ZIPCODE_API+'/info.json/'+zipcode;
    return this.httpClient.get(ApiURL);
  }
}
