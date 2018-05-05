import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Statistics } from '../models/statistics';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StatisticService {

  private statisticsListObs = new BehaviorSubject<Array<Statistics>>([]);

  constructor(private httpService: HttpService) {
    this.httpService.getStatistics().subscribe(list => {

      if (list.length === 0) {
        const statisticsOb: Statistics = {memoryRound: 19999, snakeAple: 0, xandoWin: 0, xandoLoos: 0};
        list.push(statisticsOb);
        this.generateStatisticsListObs(list);
      }
      this.statisticsListObs.next(list);
    });

   }

   add(statistics: Statistics) {
     const list = this.statisticsListObs.getValue();
     list.push(statistics);
     this.statisticsListObs.next(list);
   }

   getStatisticsListObs(): Observable<Array<Statistics>> {
     return this.statisticsListObs.asObservable();
   }

   saveStatisticsListObs() {
     this.httpService.saveStatistics(this.statisticsListObs.getValue());
   }

   generateStatisticsListObs(list: Array<Statistics>) {
    this.httpService.generateStatistics(list);
  }
}
