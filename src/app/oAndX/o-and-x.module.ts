import { NgModule } from '@angular/core';
import { OAndXComponent } from './o-and-x.component';
import { OAndXRoutingModule } from './o-and-x.routing.module';
import { CommonModule } from '@angular/common';
import { BoardService } from './services/board.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [OAndXComponent],
  imports: [OAndXRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule],
  providers: [BoardService]
})
export class OAndXModule { }
