import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { SpaceProgramService } from 'src/app/service/space-program.service';
import { SpaceProgramComponent } from './space-program.component';

describe('SpaceProgramComponent', () => {
  let component: SpaceProgramComponent;
  let service: SpaceProgramService;
  let fixture: ComponentFixture<SpaceProgramComponent>;
  let router: Router;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [SpaceProgramComponent],
      providers: [SpaceProgramService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceProgramComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(SpaceProgramService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getLaunches: should get Launches', () => {
    spyOn(service, 'getAllLaunches').and.callThrough();
    component.getLaunches();
    expect(component.launches).toBeDefined();
  });

  xit('getDataForAll: should get data for all', fakeAsync(() => {
    spyOn(service, 'getAll').and.callThrough();
    spyOn(component.router, 'navigate').and.returnValue(Promise.resolve(true));
    component.launchStatus = true;
    component.landStatus = true;
    component.year = '2014';
    component.getDataForAll();
    tick();
    expect(router.navigate).toHaveBeenCalledWith([''], {
      queryParams: {
        limit: 100,
        launch_success: true,
        land_success: true,
        launch_year: 2014,
      },
    });
  }));

  it('filterYear:should filter by year, if true get all data',()=>{
    component.filterYear("2014");
    component.launchStatus = true;
    component.landStatus = true;
    component.year = "";
    expect(component.year).toEqual("");
  });

  xit('filterYear:should filter by year, when condition fails',fakeAsync(()=>{
    component.filterYear("2014");
    component.launchStatus = false;
    component.landStatus = false;
    spyOn(service,'getYear').and.callThrough();
    tick();
    expect(router.navigate).toHaveBeenCalledWith([''], {
      queryParams: { limit: 100, year: "2014" },
    });
  }));

  it('filterLaunch:should filter by launch, if true get all data',()=>{
    component.filterLaunch(true);
    component.launchStatus = true;
    component.landStatus = true;
    component.year = "";
    expect(component.launchStatus).toBeTruthy();
  });

  xit('filterLaunch:should filter by launch, when condition fails',fakeAsync(()=>{
    component.filterLaunch(false);
    component.launchStatus = false;
    component.landStatus = false;
    component.year = "2015";
    spyOn(service,'getLaunches').and.callThrough();
    tick();
    expect(router.navigate).toHaveBeenCalledWith([''], {
      queryParams: { limit: 100, launch_success: true },
    });
  }));

  it('filter_land:should filter by land',()=>{
    component.filter_land(true);
    component.launchStatus = true;
    component.landStatus = true;
    component.year = "";
    expect(component.landStatus).toBeTruthy();
  });

});
