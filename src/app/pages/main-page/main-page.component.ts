import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  word!: string;
  file!: File;
  colorList!: string[];

  temImgUrl: SafeUrl="";

  colorString!: String;

  three:string = "three";
  five:string = "five";
  seven:string = "seven";

  constructor(
    private sanitizer: DomSanitizer,
    private fileUploadService: FileUploadService
  ) { }

  ngOnInit(): void {
  }

  onChange(event:any) {
    this.file = event.target.files[0];
  }

  onUpload(groupNum:any) {

    this.colorList =[];

    console.log(this.file);

    this.temImgUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.file));

    this.fileUploadService.upload(this.file, groupNum).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {

          this.colorList = event;
          this.getString();
          console.log(event);

        }
      }
    );
  }

  cleanColor(){
    this.colorList = [];
    this.temImgUrl="";
  }

  getString(){
    this.colorString ="";
    for (let index = 0; index < this.colorList.length; index++) {
      this.colorString += (this.colorList[index]);

      if(index!=(this.colorList.length-1)){
        this.colorString+=",";
      }

    }
  }

  copyString(inputElement:any){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

}
