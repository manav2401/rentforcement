import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';



@Component({
  selector: 'app-product-addition-image',
  templateUrl: './product-addition-image.component.html',
  styleUrls: ['./product-addition-image.component.css']
})
export class ProductAdditionImageComponent implements OnInit {


  @Output() imageEvent = new EventEmitter<File>();

  @Output() backEvent = new EventEmitter<Number>();

  @Output() finalConfirmation = new EventEmitter<Boolean>();

  @Input() file: File;

  imageUrl: any

  urls = [];


  constructor( private route: Router) { }

  ngOnInit(): void {
    if(this.file){
      console.log("File Empty on child side");
    }
  }


  fetchImage(event: any) {

    this.file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event:any) => {
                  //console.log(event.target.result);
                   this.urls.push(event.target.result); 
                   this.imageUrl = event.target.result;
                }

                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }



  sendDataToParent(): void{
    if(this.file){
      this.imageEvent.emit(this.file);
    }
    else{
      console.log("File NOT fetched yet");
    }  
  }



  //To go back event must be emiites to tell the parent to shift to product addition while
  //retaining data of both the forms
  goBackToProductAddition(): void{
    this.sendDataToParent();
    this.backEvent.emit(1);
  }



  executeUpload(): void {
    this.sendDataToParent();
    this.finalConfirmation.emit(true);
    
    delay(500);

    this.route.navigate(['/dashboard/products','all']);

  }






  

}



// fetchImage( input: HTMLInputElement, event: any ){
      
  //     this.file = input.files[0];
  //     if(this.file){
  //       console.log("File Picked");
  //       var reader = new FileReader();

  //       reader.onload = (event:any) => {
  //       console.log(event.target.result);
  //       this.imageUrl = event.target.result;
  //       }
  //     }
  //     else{
  //       console.log("File not collected");
  //     }
    
  // }
