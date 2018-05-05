import { OnInit, Component } from '@angular/core';
import { CardService } from '../services/card.service';
import { Statistics } from '../../models/statistics';
import { StatisticService } from '../../services/statistics.service';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css']
})
export class ScoreBoardComponent implements OnInit {
  attemptIdx: number;
  statisticsList: Array<Statistics> = [];

  constructor(private cardService: CardService, private statisticService: StatisticService) {

      this.statisticService.getStatisticsListObs().subscribe((statistics: Array<Statistics>) => {
        this.statisticsList = statistics;
      });
  }

  ngOnInit() {
    this.cardService.getAttemptIdxObs().subscribe(idx => {
      this.attemptIdx = idx;
    });
  }

}
