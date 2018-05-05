import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found.component';



const pageRouting: Routes = [
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(pageRouting)],
  exports: [RouterModule]
})
export class PageNotFoundRoutingModule {}
