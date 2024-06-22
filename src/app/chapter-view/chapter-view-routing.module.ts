import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChapterViewComponent } from './chapter-view.component';

const routes: Routes = [
  {
    path: '',
    component: ChapterViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChapterViewRoutingModule { }
