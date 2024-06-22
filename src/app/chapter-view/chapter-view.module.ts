import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ChapterViewRoutingModule } from './chapter-view-routing.module';
import { ChapterViewComponent } from './chapter-view.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChapterViewRoutingModule
  ],
  declarations: [ChapterViewComponent],
})
export class ChapterViewModule { }
