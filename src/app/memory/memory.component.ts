import { Component, OnInit } from '@angular/core';
import { CardService } from './services/card.service';
import { Icard } from './model/icard';
import { Statistics } from '../models/statistics';
import { StatisticService } from '../services/statistics.service';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css']
})
export class MemoryComponent implements OnInit {
  private cardsLiit: number;
  cardsArray: Array<Icard> = [];

  private oneVisible = false;
  private visibleIdx;
  private cardVisibleIdx;
  private clickCard = true;



  constructor(private cardService: CardService) {
    this.cardService.getCardListObs().subscribe((card: Array<Icard>) => {
      this.cardsArray = card.slice();
    } );

  }

  ngOnInit() {
  }



  revealCard(card: Icard) {
    this.cardService.getRevealCard(card);
    this.getMyStyle(card);
  }

  getMyStyle(card: Icard) {
    const myStyle = {
      'opacity': card.opacityCard,
      'width': '100%',
      'height': 'auto'
    };
    return myStyle;
  }

}
