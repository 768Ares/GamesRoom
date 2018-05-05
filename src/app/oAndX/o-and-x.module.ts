import { NgModule } from '@angular/core';
import { OAndXComponent } from './o-and-x.component';
import { OAndXRoutingModule } from './o-and-x.routing.module';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [OAndXComponent],
  imports: [OAndXRoutingModule, CommonModule]
})
export class OAndXModule { }
