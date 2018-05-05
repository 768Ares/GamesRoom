import { SnakeComponent } from './snake.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnakeRoutingModule } from './snake.routing.module';



@NgModule({
  declarations: [SnakeComponent],
  imports: [SnakeRoutingModule, CommonModule]
})
export class SnakeModule { }
