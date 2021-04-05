export class SpaceXProgramModel {
  public mission_name: string;
  public flight_number: number;
  public mission_id: any;
  public launch_year: number;
  public launch_success: boolean;
  public land_success: boolean;

  constructor(data: any) {
    this.mission_name = data.mission_name;
    this.flight_number = data.flight_number;
    this.mission_id = data.mission_id;
    this.launch_year = data.launch_year;
    this.launch_success = data.launch_success;
    this.land_success = data.rocket.first_stage.cores[0].land_success;
  }
}
