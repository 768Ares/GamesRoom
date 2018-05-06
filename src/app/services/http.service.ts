import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Statistics } from '../models/statistics';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class HttpService {


  readonly URL_DB = 'https://api.mlab.com/api/1/databases/angular_db/collections/GameRoom';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getParams(): HttpParams {
    const uid = this.authService.user.uid;
    const query = {userId: uid};
    return new HttpParams().set('apiKey', 'hyW1Nild-Fjn6xNR30RF6c58Mlf5P3Is').append('q', JSON.stringify(query));
  }

  getStatistics() {
     return this.http.get<Array<Statistics>>(this.URL_DB, { params: this.getParams() });
   }

   saveStatistics(list: Array<Statistics>) {
    console.log('wywolanie saveStatistics');
    this.http.put(this.URL_DB, list[0], { params: this.getParams() }).subscribe(data => {
      console.log(data);
    });
   }

   generateStatistics(list: Array<Statistics>) {
    console.log('generateStatistics');
    this.http.post(this.URL_DB, list[0], { params: this.getParams() }).subscribe(data => {
      console.log(data);
    });
   }


}
