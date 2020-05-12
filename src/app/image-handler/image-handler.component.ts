import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ImageHandlerService } from './image-handler.service';

@Component({
  selector: 'app-image-handler',
  templateUrl: './image-handler.component.html',
  styleUrls: ['./image-handler.component.css']
})
export class ImageHandlerComponent implements OnInit {

  @Output() fileUploadEvent = new EventEmitter<File>();

  message: string;
  constructor(private imgService: ImageHandlerService) { }

  ngOnInit(): void {

  }

  // onPicked( input: HTMLInputElement ){
  //   console.log("File Picked");
  //   const file = input.files[0];
  //   if(file){
  //     this.fileUploadEvent.emit(file);

  //   }
  //   else{
  //     console.log("File not collected");
  //   }
    
  // }

  onPicked( input: HTMLInputElement ){
    console.log("File Picked");
    const file = input.files[0];
    if(file){
      this.imgService.uploadImage(file).subscribe();

    }
    else{
      console.log("File not collected");
    }
    
  }


  

}
