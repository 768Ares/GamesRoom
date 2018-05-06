import { Routes, RouterModule } from '@angular/router';
import { OAndXComponent } from './o-and-x.component';
import { NgModule } from '@angular/core';
import { AuthGuardService } from '../auth/auth-guard.service';



const memoryRouting: Routes = [
  {
    path: '',
    component: OAndXComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(memoryRouting)],
  exports: [RouterModule]
})
export class OAndXRoutingModule {}
