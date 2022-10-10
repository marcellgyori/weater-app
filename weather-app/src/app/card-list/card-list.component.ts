import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../core/services/localstorage.service';

@Component({
  selector: 'card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  constructor(private localStorageService: LocalStorageService) {}
  cityList: string[] = [];
  inputValue: string = '';
  notLoadedList: string[] = [];

  ngOnInit(): void {
    if (this.localStorageService.getItem('cityList')) {
      this.cityList = JSON.parse(this.localStorageService.getItem('cityList')!);
    } else {
      this.cityList = [];
      this.cityList.push('Seattle');
      this.cityList.push('Miami');
      this.cityList.push('Barcelona');
      this.cityList.push('Tampa');
      this.cityList.push('kecskemét');
    }
  }

  addCity() {
    if (!this.notLoadedList.includes(this.inputValue)) {
      this.cityList.push(this.inputValue.toLowerCase());
      this.localStorageService.setItem(
        'cityList',
        JSON.stringify(this.cityList)
      );
    }
  }

  deleteCity(town: string) {
    this.cityList.splice(this.cityList.indexOf(town.toLowerCase()), 1);
    this.notLoadedList.splice(
      this.notLoadedList.indexOf(town.toLowerCase()),
      1
    );

    this.localStorageService.setItem('cityList', JSON.stringify(this.cityList));
  }

  addItemToNotLoadedList(notLoadedItem: string) {
    this.notLoadedList.push(notLoadedItem.toLowerCase());
  }
}
