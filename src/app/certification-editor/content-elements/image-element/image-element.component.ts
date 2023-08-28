import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorService } from '../../services/editor.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-image-element',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-element.component.html',
  styleUrls: ['./image-element.component.scss']
})
export class ImageElementComponent {

  @Input() data: any;

  isEditMode$!: Observable<boolean>;

  constructor(
    private editorSrv: EditorService
  ) {
    this.isEditMode$ = this.editorSrv.isEditMode$;
  }
}
