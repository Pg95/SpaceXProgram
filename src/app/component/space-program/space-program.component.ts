import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { SpaceProgramService } from 'src/app/service/space-program.service';
import { SpaceXProgramModel } from 'src/app/model/spaceXprogram.model';

@Component({
  selector: 'app-space-program',
  templateUrl: './space-program.component.html',
  styleUrls: ['./space-program.component.css'],
})
export class SpaceProgramComponent implements OnInit {
  launches: Array<SpaceXProgramModel> = [];
  launchYear: any = [];
  launchStatus: boolean = false;
  landStatus: boolean = false;
  year: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    public router: Router,
    private spaceProgram: SpaceProgramService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.getLaunches();
    }
  }
  ngOnInit() {}

  getLaunches() {
    this.spaceProgram.getAllLaunches().subscribe((data: any) => {
      this.launches = data;
      if (this.launches) {
        this.launchYear = this.launches
          .map((element) => element.launch_year)
          .sort()
          .filter((v, i, a) => a.indexOf(v) === i);
      }
    });
  }

  getDataForAll() {
    this.spaceProgram
      .getAll(this.launchStatus, this.landStatus, this.year)
      .subscribe((data) => {
        this.launches = data;
        this.router.navigate([''], {
          queryParams: {
            limit: 100,
            launch_success: this.launchStatus,
            land_success: this.landStatus,
            launch_year: this.year,
          },
        });
      });
  }

  filterYear(year) {
    this.year = year;
    if (
      this.launchStatus === true &&
      this.landStatus === true &&
      this.year !== ''
    ) {
      this.getDataForAll();
    } else {
      this.spaceProgram.getYear(this.year).subscribe((data) => {
        this.launches = data;
        this.router.navigate([''], {
          queryParams: { limit: 100, year: this.year },
        });
      });
    }
  }

  filterLaunch(status: boolean) {
    this.launchStatus = status;
    if (
      this.year !== '' &&
      this.landStatus === true &&
      this.launchStatus == true
    ) {
      this.getDataForAll();
    } else {
      this.spaceProgram.getLaunches(this.launchStatus).subscribe((data) => {
        this.launches = data;
        this.router.navigate([''], {
          queryParams: { limit: 100, launch_success: this.launchStatus },
        });
      });
    }
  }

  filter_land(status: boolean) {
    this.landStatus = status;
    if (
      this.year !== '' &&
      this.launchStatus === true &&
      this.landStatus === true
    ) {
      this.getDataForAll();
    } else if (this.launchStatus === true && this.landStatus === true) {
      this.spaceProgram
        .getLaunchLand(this.launchStatus, this.landStatus)
        .subscribe((data) => {
          this.launches = data;
          this.router.navigate([''], {
            queryParams: {
              limit: 100,
              launch_success: this.launchStatus,
              land_success: this.landStatus,
            },
          });
        });
    } else {
      this.spaceProgram.getLand(this.landStatus).subscribe((data) => {
        this.launches = data;
      });
      this.router.navigate([''], {
        queryParams: { limit: 100, land_success: this.landStatus },
      });
    }
  }
}
