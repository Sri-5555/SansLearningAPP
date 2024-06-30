import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestlistPage } from './testlist.page';

const routes: Routes = [
  {
    path: '',
    component: TestlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestlistPageRoutingModule {}
