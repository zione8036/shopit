import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
  styles: [
  ]
})
export class GalleryComponent implements OnInit {
  
  selectImage :string;
  @Input() gallery :string[];


  ngOnInit(): void {
    if(this.hasImages){
      this.selectImage= this.gallery[0];
    }
    
  }
  Onchange(data:string){
    this.selectImage = data
  }
  get hasImages(){
    return this.gallery?.length >0;
  }

}
