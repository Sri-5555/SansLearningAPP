import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestPage } from './test.page';
import { TestGuard } from '../guard/test.guard';

const routes: Routes = [
  {
    path: '',
    component: TestPage,
    canDeactivate:[TestGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestPageRoutingModule {}
