import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-uploadmodal',
  templateUrl: './uploadmodal.component.html',
  styleUrls: ['./uploadmodal.component.scss'],
})
export class UploadmodalComponent implements OnInit {

  @Input() data;
  form: FormGroup;
  formData: any = {};

  constructor(public modalController: ModalController,
              private fb: FormBuilder,
              public dataService:DataService,
              public toast: ToastService) { }

  ngOnInit() {
    if (this.data.segment == 'chapter') {
      this.createFormForChapter();
    }
  }

  createFormForChapter() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  dismiss(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.formData = this.form.value;
      this.dataService.postChapterData(this.formData).subscribe(
        data => {
          this.toast.sucessToast('Data uploaded successfully');
        },
        error => {
          this.toast.warningToast("Error uploading data");
        }
      );
    }
  }
  
}