import { Component, Input, OnInit } from '@angular/core';
import { Weather } from '../models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() town!: Weather;
  iconSrc: string = '';

  constructor() {}

  ngOnInit(): void {
    this.iconSrc = `../../assets/icons/${this.setIconName()}.png`;
  }
  setIconName(): 'cloudy' | 'partly_cloudy' | 'rainy' | 'snowy' | 'sunny' {
    if (this.town.iconName == 'Clouds') {
      return 'cloudy';
    }
    if (
      this.town.iconName == 'Rain' ||
      this.town.iconName == 'Thunderstorm' ||
      this.town.iconName == 'Drizzle'
    ) {
      return 'rainy';
    }
    if (this.town.iconName == 'Clear') {
      return 'sunny';
    }
    if (this.town.iconName == 'Snow') {
      return 'snowy';
    }
    if (this.town.iconName == 'Atmosphere') {
      return 'partly_cloudy';
    } else return 'sunny';
  }
}
