import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Icard } from '../model/icard';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Statistics } from '../../models/statistics';
import { StatisticService } from '../../services/statistics.service';



@Injectable()
export class CardService {

  private cardList: Array < Icard > = [];
  private cardIdxArray = [];
  private cardBackgroundIdxArray = [];
  private cardsNumber = 12;
  private hideCardss = 12;
  private oneVisible = false;
  private visibleIdx;
  private cardVisibleIdx;
  private clickCard = true;
  private attemptIdx = 0;
  private attemptIdxO = [];
  private statisticsList: Array<Statistics> = [];

  private cardListObs = new BehaviorSubject<Array<Icard>>([]);
  private attemptIdxObs = new BehaviorSubject<number>(0);
  private statisticsListObs = new BehaviorSubject<Array<Statistics>>([]);

  constructor(private statisticService: StatisticService) {
    this.gameStart();


    this.statisticService.getStatisticsListObs().subscribe((statistics: Array<Statistics>) => {
      this.statisticsList = statistics;
    });
  }

  gameStart() {
    this.cardList = [];
    this.cardBackgroundIdxArray = [];
    this.attemptIdxO = [];
    this.hideCardss = 12;
    this.attemptIdx = 0;
    this.generateCardsIdx(this.cardsNumber);
    for (let i = 0; i < 12; i++) {
      this.generateCardBackgroundIdx(this.cardIdxArray);
      this.cardList.push(this.generateCardObject(i));
    }
    this.cardListObs.next(this.cardList);
  }

  generateCardObject(i) {
    let card: Icard;
   return card =  {
      cardIdx: i,
      backIdx: this.cardBackgroundIdxArray[i],
      backgroundIdx: 999,
      background: this.cardBackgroundIdxArray[i] + '.jpg',
      lock: false,
      opacityCard: 1
    };
  }

  generateCardsIdx(idx) {
    for (let i = 0; i < idx; i++) {
      this.cardIdxArray.push(i);
    }
  }

  generateCardBackgroundIdx(array: Array<number>) {
    const idx = Math.floor(Math.random() * array.length);
    let rand = array[idx];
    array.splice(idx, 1);
    if (rand >= this.cardsNumber / 2 ) {
      rand = rand - this.cardsNumber / 2;
    }
    this.cardBackgroundIdxArray.push(rand);
  }


  getCardListObs(): Observable<Array<Icard>> {
    return this.cardListObs.asObservable();
  }

  getAttemptIdxObs(): Observable<number> {
    return this.attemptIdxObs;
  }

  getStatisticsListObs(): Observable<Array<Statistics>> {
    return this.statisticsListObs;
  }

  getRevealCard(card: Icard) {
    if ((!card.lock) && (this.clickCard)) {
      card.backgroundIdx = card.backIdx;
      card.lock = true;

      if (!this.oneVisible) {
        this.oneVisible = true;
        this.visibleIdx = card.backIdx;
        this.cardVisibleIdx = card.cardIdx;
      } else {
        if (this.visibleIdx === card.backIdx) {
          this.deleteCards(card);
          } else {
          this.restoreCards(card);
        }
      }

    }
  }

  deleteCards(card: Icard) {
    const self = this;
      this.clickCard = false;
      this.oneVisible = false;
      this.attemptIdx += 1;
      this.attemptIdxObs.next(this.attemptIdx);
      setTimeout(function() {
        self.cardList[self.cardVisibleIdx].opacityCard = 0.04;
        card.opacityCard = 0.04;
        self.clickCard = true;
        self.hideCardss -= 2;
        console.log(self.hideCardss);
        if (self.hideCardss === 0) {
          if (self.attemptIdx < self.statisticsList[0].memoryRound) {
            self.statisticsList[0].memoryRound = self.attemptIdx;
            self.statisticService.saveStatisticsListObs();
            self.gameStart();
          }
        }
      }, 500);
  }

  restoreCards(card: Icard) {
    const self = this;
    this.clickCard = false;
    this.cardList[this.cardVisibleIdx].lock = false;
    card.lock = false;
    this.oneVisible = false;
    this.attemptIdx += 1;
    this.attemptIdxObs.next(this.attemptIdx);
    setTimeout(function() { card.backgroundIdx = 999;
      self.cardList[self.cardVisibleIdx].backgroundIdx = 999;
      self.clickCard = true;
    }, 850);
  }

}
