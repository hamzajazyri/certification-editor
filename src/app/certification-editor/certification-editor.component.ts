import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JCollapseComponent } from './components/j-collapse/j-collapse.component';
import { JEditorComponent } from './j-editor/j-editor.component';
import { DraggableDirective } from './directives/draggable.directive';
import { MultiImageUploadContainerComponent } from './components/multi-image-upload-container/multi-image-upload-container.component';

@Component({
  selector: 'app-certification-editor',
  standalone: true,
  imports: [CommonModule, JCollapseComponent, JEditorComponent, DraggableDirective, MultiImageUploadContainerComponent],
  templateUrl: './certification-editor.component.html',
  styleUrls: ['./certification-editor.component.scss']
})
export class CertificationEditorComponent {

}
