import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SpaceProgramService } from './space-program.service';

describe('SpaceProgramService', () => {
  let service: SpaceProgramService;
  let httpMock: HttpTestingController;
  let URL = 'https://api.spaceXdata.com/v3/launches?limit=100';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SpaceProgramService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAllLaunches: should get all the launches', fakeAsync(() => {
    service.getAllLaunches().subscribe((res) => expect(res).toEqual({}));
    tick();
    const req = httpMock.expectOne(URL, 'API call to get All Launches');
    expect(req.request.method).toBe('GET');
    req.flush({});
  }));

  it('getLaunches: should get launches', fakeAsync(() => {
    const endpoint = URL + '&launch_success=true';
    service.getLaunches(true).subscribe((res) => expect(res).toEqual({}));
    tick();
    const req = httpMock.expectOne(endpoint, 'API call to get Launches');
    expect(req.request.method).toBe('GET');
    req.flush({});
  }));

  it('getLand: should get land details', fakeAsync(() => {
    const endpoint = URL + '&land_success=true';
    service.getLand(true).subscribe((res) => expect(res).toEqual({}));
    tick();
    const req = httpMock.expectOne(endpoint, 'API call to get All Launches');
    expect(req.request.method).toBe('GET');
    req.flush({});
  }));

  it('getYear: should get details for year', fakeAsync(() => {
    const endpoint = URL + '&launch_year=2014';
    service.getYear('2014').subscribe((res) => expect(res).toEqual({}));
    tick();
    const req = httpMock.expectOne(endpoint, 'API call to get Launches');
    expect(req.request.method).toBe('GET');
    req.flush({});
  }));

  it('getAll: should get all details', fakeAsync(() => {
    const endpoint =
      URL + '&launch_success=true&land_success=true&launch_year=2014';
    service
      .getAll(true, true, '2014')
      .subscribe((res) => expect(res).toEqual({}));
    tick();
    const req = httpMock.expectOne(endpoint, 'API call to get All Launches');
    expect(req.request.method).toBe('GET');
    req.flush({});
  }));

  it('getLaunchLand: should get launch and land details', fakeAsync(() => {
    const endpoint = URL + '&launch_success=true&land_success=true';
    service
      .getLaunchLand(true, true)
      .subscribe((res) => expect(res).toEqual({}));
    tick();
    const req = httpMock.expectOne(endpoint, 'API call to get Launches');
    expect(req.request.method).toBe('GET');
    req.flush({});
  }));
});
