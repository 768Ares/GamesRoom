import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SnakeComponent } from './snake.component';


const snakeRouting: Routes = [
  {
    path: '',
    component: SnakeComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(snakeRouting) ],
  exports: [ RouterModule ]
})
export class SnakeRoutingModule {}
