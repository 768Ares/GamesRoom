import { Routes, RouterModule } from '@angular/router';
import { OAndXComponent } from './o-and-x.component';
import { NgModule } from '@angular/core';



const memoryRouting: Routes = [
  {
    path: '',
    component: OAndXComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(memoryRouting)],
  exports: [RouterModule]
})
export class OAndXRoutingModule {}
