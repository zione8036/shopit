import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';
import { GalleryComponent } from './components/gallery/gallery.component';




@NgModule({
  imports: [CommonModule],
  declarations: [BannerComponent, GalleryComponent,],
  exports: [BannerComponent, GalleryComponent]
})
export class UiModule {}
