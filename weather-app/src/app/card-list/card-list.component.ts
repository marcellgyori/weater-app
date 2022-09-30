import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../api-call-service.service';
import { Weather } from '../models';

@Component({
  selector: 'card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  constructor(private apiCallService: ApiCallService) {}
  townList: Weather[] = [];
  value: string = 'Clear me';

  ngOnInit(): void {
    this.apiCallService.getGeoLocation('Seattle').subscribe((response: any) => {
      let lat = response[0].lat;
      let lon = response[0].lon;
      this.apiCallService
        .getWeatherInformation(lat.toFixed(2), lon.toFixed(2))
        .subscribe((weatherResponse) => {
          let state = '';
          state += response[0].state ? response[0].state : '';
          state += response[0].state && response[0].country ? ', ' : '';
          state += response[0].country ? response[0].country : '';
          this.townList.push({
            city: response[0].name,
            state: state,
            temperature: weatherResponse.main.temp,
            iconName: weatherResponse.weather[0].main,
          });
        });
    });
    this.apiCallService.getGeoLocation('Miami').subscribe((response: any) => {
      let lat = response[0].lat;
      let lon = response[0].lon;
      this.apiCallService
        .getWeatherInformation(lat.toFixed(2), lon.toFixed(2))
        .subscribe((weatherResponse) => {
          let state = '';
          state += response[0].state ? response[0].state : '';
          state += response[0].state && response[0].country ? ', ' : '';
          state += response[0].country ? response[0].country : '';
          this.townList.push({
            city: response[0].name,
            state: state,
            temperature: weatherResponse.main.temp,
            iconName: weatherResponse.weather[0].main,
          });
        });
    });
    this.apiCallService
      .getGeoLocation('Barcelona')
      .subscribe((response: any) => {
        let lat = response[0].lat;
        let lon = response[0].lon;
        this.apiCallService
          .getWeatherInformation(lat.toFixed(2), lon.toFixed(2))
          .subscribe((weatherResponse) => {
            let state = '';
            state += response[0].state ? response[0].state : '';
            state += response[0].state && response[0].country ? ', ' : '';
            state += response[0].country ? response[0].country : '';
            this.townList.push({
              city: response[0].name,
              state: state,
              temperature: weatherResponse.main.temp,
              iconName: weatherResponse.weather[0].main,
            });
          });
      });
    this.apiCallService.getGeoLocation('Tampa').subscribe((response: any) => {
      let lat = response[0].lat;
      let lon = response[0].lon;
      this.apiCallService
        .getWeatherInformation(lat.toFixed(2), lon.toFixed(2))
        .subscribe((weatherResponse) => {
          let state = '';
          state += response[0].state ? response[0].state : '';
          state += response[0].state && response[0].country ? ', ' : '';
          state += response[0].country ? response[0].country : '';
          this.townList.push({
            city: response[0].name,
            state: state,
            temperature: weatherResponse.main.temp,
            iconName: weatherResponse.weather[0].main,
          });
        });
    });
    this.apiCallService
      .getGeoLocation('Kecskemét')
      .subscribe((response: any) => {
        let lat = response[0].lat;
        let lon = response[0].lon;
        this.apiCallService
          .getWeatherInformation(lat.toFixed(2), lon.toFixed(2))
          .subscribe((weatherResponse) => {
            let state = '';
            state += response[0].state ? response[0].state : '';
            state += response[0].state && response[0].country ? ', ' : '';
            state += response[0].country ? response[0].country : '';
            this.townList.push({
              city: response[0].name,
              state: state,
              temperature: weatherResponse.main.temp,
              iconName: weatherResponse.weather[0].main,
            });
          });
      });
    console.log({ townlist: this.townList });
  }
}
