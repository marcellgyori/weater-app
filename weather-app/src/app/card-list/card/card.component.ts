import { Component, Input, OnInit } from '@angular/core';
import { Weather } from '../../core/models';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiCallService } from '../../core/services/api-call-service.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() city!: string;
  weather!: Weather;
  iconSrc: string = '';
  isLoaded: boolean = false;
  isCantLoad: boolean = false;
  @Output() notLoadedEvent = new EventEmitter<string>();

  constructor(
    private spinner: NgxSpinnerService,
    private apiCallService: ApiCallService
  ) {}

  ngOnInit(): void {
    this.spinner.show(this.city);
    this.apiCallService.getGeoLocation(this.city).subscribe((response: any) => {
      if (response[0]) {
        let lat = response[0].lat;
        let lon = response[0].lon;
        this.apiCallService
          .getCurrentWeatherInformation(lat.toFixed(2), lon.toFixed(2))
          .subscribe((weatherResponse) => {
            let state = '';
            state += response[0].state ? response[0].state : '';
            state += response[0].state && response[0].country ? ', ' : '';
            state += response[0].country ? response[0].country : '';
            this.weather = {
              city: response[0].name,
              state: state,
              temperature: weatherResponse.main.temp,
              iconName: weatherResponse.weather[0].main,
            };
            this.iconSrc = `../../assets/icons/${this.setIconName(
              this.weather
            )}.png`;
            this.isLoaded = true;
          });
        this.spinner.hide(this.city);
      } else {
        this.addNewItem(this.city);
        setTimeout(() => {
          this.spinner.hide(this.city);
          this.isCantLoad = true;
        }, 2000);
      }
    });
  }
  setIconName(
    weather: Weather
  ): 'cloudy' | 'partly_cloudy' | 'rainy' | 'snowy' | 'sunny' {
    if (weather.iconName == 'Clouds') {
      return 'cloudy';
    }
    if (
      weather.iconName == 'Rain' ||
      weather.iconName == 'Thunderstorm' ||
      weather.iconName == 'Drizzle'
    ) {
      return 'rainy';
    }
    if (weather.iconName == 'Clear') {
      return 'sunny';
    }
    if (weather.iconName == 'Snow') {
      return 'snowy';
    }
    if (weather.iconName == 'Atmosphere') {
      return 'partly_cloudy';
    } else return 'sunny';
  }

  addNewItem(value: string) {
    this.notLoadedEvent.emit(value);
  }
}
