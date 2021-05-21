import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { AddNewHikeService } from './addnewhikeservice';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize, map, takeUntil } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

// add new hike functionality, when user clicks plus button from home screen 
//add new hike feature is invoked.
@Component({
  selector: 'app-addnewhike',
  templateUrl: './addnewhike.page.html',
  styleUrls: ['./addnewhike.page.scss'],
})
export class AddnewhikePage implements OnInit {

  AddNewForm: FormGroup;
  task: AngularFireUploadTask;
  public selectedImage;
  public selectedImageSrc;
  public editKey = '';
  public isEditMode = false;
  public existingImage = '';

  constructor(
    private storage: AngularFireStorage,
    private addnewService: AddNewHikeService,
    private router: Router,
    public fb: FormBuilder,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    public toastController: ToastController
  ) { }
 

  ionViewWillEnter() {
    this.route.params.subscribe(param => {
      if (param['key'] && param['key'] != '') {
        this.editKey = param['key'];
        this.isEditMode = true;
        this.getData(this.editKey);
      } else {
        this.isEditMode = false;
      }
    });
  }

  go_back(){
    this.navCtrl.back();
  }

  ngOnInit() {
    this.AddNewForm = this.fb.group({
      name: [''],
      level: [''],
      distance: [''],
      starts: [''],
      ends: [''],
      image: ['', []]
    })
    // this.getData("-MRB8K6Zkc_n5b8SFC4q")
  }

  formSubmit() {
    if (!this.AddNewForm.valid) {
      console.log('form not valid');
      return false;
    } else {
      this.uploadAndSave(this.selectedImage);
    }
  }

  //get existing data for update
  getData(key) {
    this.addnewService.getNewHikeSpot(key).subscribe(data => {
      this.AddNewForm.patchValue(data);
      this.existingImage = data['image'];
    });
  }

  // User can select the file and  upload the image of new hike to add
  //Below function is used to upload.
  async onFileSelect(event: FileList) {
    const file = event.item(0)
    if (file.type.split('/')[0] !== 'image') {
      const toast = await this.toastController.create({
        message: 'Invalid image file format. Only image file allowed',
        color: 'danger',
        duration: 4000
      });
      toast.present();
      return;
    }
    this.selectedImage = file;
    var reader = new FileReader();
    let self = this;
    reader.onload = function (e) {
      self.selectedImageSrc = e.target.result;
    }
    reader.readAsDataURL(file);
  }

  // This is the function used when the user selects the file and submit.
  //the image/file get stored in firestore.
  public async uploadAndSave(file) {
    let url = '';
    if (this.selectedImage != null && this.selectedImage != undefined) {
      const path = `freakyStorage/${new Date().getTime()}_${file.name}`;
      const fileRef = this.storage.ref(path);
      this.task = this.storage.upload(path, file);
      await this.task.snapshotChanges().toPromise()
      url = await fileRef.getDownloadURL().toPromise();
    }
    this.AddNewForm.get('image').setValue(url);
    if (this.isEditMode) {
      this.addnewService.updateNewHikeSpot(this.editKey, this.AddNewForm.value).then(res => {
        this.AddNewForm.reset();
        this.router.navigate(['/calories']);
      }).catch(error => console.log(error));
    } else {
      this.addnewService.createNewHikeSpot(this.AddNewForm.value).then(res => {
        this.AddNewForm.reset();
        this.router.navigate(['/calories']);
      }).catch(error => console.log(error));
    }
  }
}