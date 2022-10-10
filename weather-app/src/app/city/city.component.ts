import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Forecast } from '../core/models/forecast.model';
import { ApiCallService } from '../core/services/api-call-service.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
})
export class CityComponent implements OnInit {
  city!: string;
  forecastList: Forecast[] = [];
  loaded: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private apiCallService: ApiCallService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();

    this.route.queryParams.subscribe((params) => {
      this.city = params['city'];
    });
    this.apiCallService.getGeoLocation(this.city).subscribe((response: any) => {
      if (response[0]) {
        let lat = response[0].lat;
        let lon = response[0].lon;
        this.apiCallService
          .getForecastWeatherInformation(lat.toFixed(2), lon.toFixed(2))
          .subscribe((weatherResponse) => {
            this.city = weatherResponse.city.name;
            for (let i = 0; i < 5; i++) {
              let forecastToSave = new Forecast();
              forecastToSave.dateText = weatherResponse.list[i].dt_txt;
              forecastToSave.temperature = weatherResponse.list[i].main.temp;
              forecastToSave.iconName = weatherResponse.list[i].weather[0].main;
              this.forecastList.push(forecastToSave);
            }
            this.loaded = true;
            this.spinner.hide();
          });
      }
    });
  }
}
