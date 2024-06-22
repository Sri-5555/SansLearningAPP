import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { EditProfilePageRoutingModule } from './edit-profile-routing.module';
import { EditProfilePage } from './edit-profile.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditProfilePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditProfilePage]
})
export class EditProfilePageModule {}
