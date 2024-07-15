import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'studymaterial',
      },
      {
        path: 'studymaterial',
        loadChildren: () => import('../studymaterial/studymaterial.module').then((m) => m.StudymaterialPageModule),
      },
      {
        path: 'document',
        loadChildren: () => import('../document/document.module').then((m) => m.DocumentPageModule),
      },
      {
        path: 'PracticeTest',
        loadChildren: () => import('../testlist/testlist.module').then((m) => m.TestlistPageModule),
      },
      {
        path: 'AchievementTest',
        loadChildren: () => import('../testlist/testlist.module').then((m) => m.TestlistPageModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then((m) => m.ProfilePageModule),
      },
      {
        path: 'help',
        loadChildren: () => import('../help/help.module').then((m) => m.HelpPageModule),
      },
      {
        path: 'about',
        loadChildren: () => import('../about/about.module').then((m) => m.AboutPageModule),
      },
      {
        path: 'test',
        loadChildren: () => import('../test/test.module').then(m => m.TestPageModule)
      },
      {
        path: 'video-page/:id',
        loadChildren: () => import('../video-page/video-page.module').then(m => m.VideoPagePageModule)
      },
      {
        path: 'chapterView',
        loadChildren: () => import('../chapter-view/chapter-view.module').then(m => m.ChapterViewModule)
      },
      {
        path: 'adminpage',
        loadChildren: () => import('../admin-page/admin-page.module').then( m => m.AdminPageModule)
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardPageRoutingModule { }
