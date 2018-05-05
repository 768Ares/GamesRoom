import { MemoryComponent } from './memory.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const memoryRouting: Routes = [
  {
    path: '',
    component: MemoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(memoryRouting)],
  exports: [RouterModule]
})
export class MemoryRoutingModule {}
