import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudymaterialPageRoutingModule } from './studymaterial-routing.module';

import { StudymaterialPage } from './studymaterial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudymaterialPageRoutingModule
  ],
  declarations: [StudymaterialPage]
})
export class StudymaterialPageModule {}
