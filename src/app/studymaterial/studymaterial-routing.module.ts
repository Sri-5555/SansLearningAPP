import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudymaterialPage } from './studymaterial.page';

const routes: Routes = [
  {
    path: '',
    component: StudymaterialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudymaterialPageRoutingModule {}
