import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ChapterViewRoutingModule } from './chapter-view-routing.module';
import { ChapterViewComponent } from './chapter-view.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChapterViewRoutingModule,
    PdfViewerModule
  ],
  declarations: [ChapterViewComponent],
})
export class ChapterViewModule { }
