import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ImageHandlerService } from './image-handler.service';

@Component({
  selector: 'app-image-handler',
  templateUrl: './image-handler.component.html',
  styleUrls: ['./image-handler.component.css']
})
export class ImageHandlerComponent implements OnInit {

  @Output() fileUploadEvent = new EventEmitter<Array<File>>();

  images: FileList;
  files: Array<File>;

  message: string;
  constructor(private imgService: ImageHandlerService) {
    
    this.files = new Array<File>();
   }

  ngOnInit(): void {

  }

  addToList( input: HTMLInputElement ){
    console.log("File Picked");
    this.images = input.files;
    let i: number;
    for(i=0;i<this.images.length;i++){
      this.files.push(this.images.item(i))
    }
    // this.files.push(file);
    if(this.files.length > 0){
      
      //this.fileUploadEvent.emit(this.files);

    }
    else{
      console.log("File not collected");
    }
    
  }

  sendToParentForUpload(){

    // if(this.files.length > 0){
    //   this.imgService.uploadImage(this.files).subscribe();
    // }

    // if(this.files.length > 0){
    //   console.log("sending to parent");
      
    //   this.fileUploadEvent.emit(this.files);

    // }
    // else{
    //   console.log("Upload atleast one image");
    // }
    
  }

  // onPicked( input: HTMLInputElement ){
  //   console.log("File Picked");
  //   const file = input.files[0];
  //   if(file){
  //     this.imgService.uploadImage(file).subscribe();

  //   }
  //   else{
  //     console.log("File not collected");
  //   }
    
  // }


  

}
