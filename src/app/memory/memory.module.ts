import { NgModule } from '@angular/core';
import { MemoryComponent } from './memory.component';
import { MemoryRoutingModule } from './memory.routing.module';
import { CommonModule } from '@angular/common';
import { CardService } from './services/card.service';
import { ScoreBoardComponent } from './score-board/score-board.component';

@NgModule({
  declarations: [MemoryComponent, ScoreBoardComponent],
  imports: [MemoryRoutingModule, CommonModule],
  providers: [CardService]
})
export class MemoryModule { }
