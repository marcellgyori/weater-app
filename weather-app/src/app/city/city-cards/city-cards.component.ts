import { Component, Input, OnInit } from '@angular/core';
import { Forecast } from 'src/app/core/models/forecast.model';

@Component({
  selector: 'city-cards',
  templateUrl: './city-cards.component.html',
  styleUrls: ['./city-cards.component.scss'],
})
export class CityCardsComponent implements OnInit {
  @Input() forecast!: Forecast;
  iconSrc: string = '';

  constructor() {}

  ngOnInit(): void {
    this.iconSrc = `../../assets/icons/${this.setIconName()}.png`;
  }

  setIconName(): 'cloudy' | 'partly_cloudy' | 'rainy' | 'snowy' | 'sunny' {
    if (this.forecast.iconName == 'Clouds') {
      return 'cloudy';
    }
    if (
      this.forecast.iconName == 'Rain' ||
      this.forecast.iconName == 'Thunderstorm' ||
      this.forecast.iconName == 'Drizzle'
    ) {
      return 'rainy';
    }
    if (this.forecast.iconName == 'Clear') {
      return 'sunny';
    }
    if (this.forecast.iconName == 'Snow') {
      return 'snowy';
    }
    if (this.forecast.iconName == 'Atmosphere') {
      return 'partly_cloudy';
    } else return 'sunny';
  }
}
