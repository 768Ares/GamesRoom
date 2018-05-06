import { NgModule } from '@angular/core';
import { OAndXComponent } from './o-and-x.component';
import { OAndXRoutingModule } from './o-and-x.routing.module';
import { CommonModule } from '@angular/common';
import { OandxService } from './services/oandx.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [OAndXComponent],
  imports: [OAndXRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule],
  providers: [OandxService]
})
export class OAndXModule { }
