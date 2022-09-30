import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  constructor(private http: HttpClient) {}

  getGeoLocation(town: string): Observable<any> {
    return this.http.get<any>(
      `http://api.openweathermap.org/geo/1.0/direct?q=${town}&limit=5&appid=${environment.api_key}`
    );
  }

  getWeatherInformation(lat: string, lon: string): Observable<any> {
    return this.http.get<any>(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${environment.api_key}`
    );
  }
}
