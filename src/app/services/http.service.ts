import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Statistics } from '../models/statistics';
import { AuthService } from '../auth/auth.service';
import { Room } from '../models/room';

@Injectable()
export class HttpService {


  readonly URL_DB_STAT = 'https://api.mlab.com/api/1/databases/angular_db/collections/GameRoomStatistics';
  readonly URL_DB_X_AND_O = 'https://api.mlab.com/api/1/databases/angular_db/collections/X_AND_O_Rooms';
  readonly apiKey = {name: 'apiKey', value: 'hyW1Nild-Fjn6xNR30RF6c58Mlf5P3Is'};

  constructor(private http: HttpClient, private authService: AuthService) {}

  getParams(): HttpParams {
    const uid = this.authService.user.uid;
    const query = {userId: uid};
    return new HttpParams().set(this.apiKey.name, this.apiKey.value).append('q', JSON.stringify(query));
    // return new HttpParams().set('apiKey', 'hyW1Nild-Fjn6xNR30RF6c58Mlf5P3Is').append('q', JSON.stringify(query));
  }

  getApiKey(): HttpParams {
    const uid = this.authService.user.uid;
    const query = {userId: uid};
    return new HttpParams().set(this.apiKey.name, this.apiKey.value);
  }

  getStatistics() {
     return this.http.get<Array<Statistics>>(this.URL_DB_STAT, { params: this.getParams() });
   }

   saveStatistics(list: Array<Statistics>) {
    this.http.put(this.URL_DB_STAT, list[0], { params: this.getParams() }).subscribe(data => {
      console.log(data);
    });
   }

   generateStatistics(list: Array<Statistics>) {
    this.http.post(this.URL_DB_STAT, list[0], { params: this.getParams() }).subscribe(data => {
      console.log(data);
    });
   }

   getRooms() {
    return this.http.get<Array<Room>>(this.URL_DB_X_AND_O, { params: this.getApiKey() });
  }

  newRoom(list: Array<Room>) {
   this.http.put(this.URL_DB_X_AND_O, list, { params: this.getApiKey() }).subscribe(data => {
     console.log(data);
   });
  }
}
