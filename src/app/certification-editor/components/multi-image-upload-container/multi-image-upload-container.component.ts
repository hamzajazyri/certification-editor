import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from '../../directives/draggable.directive';

@Component({
  selector: 'app-multi-image-upload-container',
  standalone: true,
  imports: [CommonModule, DraggableDirective],
  templateUrl: './multi-image-upload-container.component.html',
  styleUrls: ['./multi-image-upload-container.component.scss']
})
export class MultiImageUploadContainerComponent {

  imageList: Array<string | ArrayBuffer> = [];


  onFileSelected(event: any): void {
    for( const file of event.target.files)
    if (file)
      this.readImage(file);

  }

  readImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageList.push(e.target.result);
    };
    reader.readAsDataURL(file);
  }

}
