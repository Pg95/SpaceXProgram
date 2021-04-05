import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class SpaceProgramService {
  Url = "https://api.spaceXdata.com/v3/launches?limit=100";

  constructor(private Http: HttpClient) {}

  // https://api.spaceXdata.com/v3/launches?limit=100
  getAllLaunches(): Observable<any> {
    return this.Http.get(this.Url);
  }

  // https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true
  getLaunches(param): Observable<any> {
    return this.Http.get(this.Url + "&launch_success=" + param);
  }

  // https://api.spaceXdata.com/v3/launches?limit=100&land_success=true
  getLand(param): Observable<any> {
    return this.Http.get(this.Url + "&land_success=" + param);
  }
  
  // https://api.spaceXdata.com/v3/launches?limit=100&launch_year=2014
  getYear(param): Observable<any> {
    return this.Http.get(this.Url + "&launch_year=" + param);
  }

  //https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true&land_success=true&launch_year=2014
  getAll(launchSuccess, landSuccess, launchYear): Observable<any> {
    return this.Http.get(
      this.Url +
        "&launch_success=" +
        launchSuccess +
        "&land_success=" +
        landSuccess +
        "&launch_year=" +
        launchYear
    );
  }

  //https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true&land_success=true
  getLaunchLand(launchSuccess, landSuccess): Observable<any> {
    return this.Http.get(
      this.Url +
        "&launch_success=" +
        launchSuccess +
        "&land_success=" +
        landSuccess
    );
  }
}
