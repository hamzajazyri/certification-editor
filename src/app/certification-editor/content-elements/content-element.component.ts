import { Component, ComponentRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { EditorService } from '../services/editor.service';
import { ContentElementData, ContentElementStyle, initContentElementData } from './content-element.interface';
import { JCollapseComponent } from '../components/j-collapse/j-collapse.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-content-element',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content-element.component.html',
  styleUrls: ['./content-element.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContentElementComponent {

  @Input() data: ContentElementData = initContentElementData;
  @Input() insideDropZone = false;
  @ViewChild('containerRef', { static: true, read: ViewContainerRef }) containerRef!: ViewContainerRef;

  @Output() onContentDelete = new EventEmitter();

  isEditMode$!: Observable<boolean>;
  contentCompRef!: ComponentRef<any> | null;

  constructor(
    private editorSrv: EditorService
  ) {
    this.isEditMode$ = this.editorSrv.isEditMode$;
  }

  updateContent(compRef: ComponentRef<any>) {
    this.containerRef.clear();
    this.containerRef.insert(compRef.hostView);
    this.contentCompRef = compRef;
  }

  removeContent() {
    this.containerRef.clear();
    this.contentCompRef = null;
    this.onContentDelete.emit();
  }

}




@Component({
  selector: 'app-content-element-container-config',
  standalone: true,
  imports: [CommonModule, JCollapseComponent],
  template: `
    <j-collapse headerName="Paddings">
      <div class="inp-grid">
        <div>
          <label>Top</label>
          <input type="number" placeholder="Top" />
        </div>
        <div>
          <label>Bottom</label>
          <input type="number" placeholder="Bottom" />
        </div>
        <div>
          <label>Left</label>
          <input type="number" placeholder="Left" />
        </div>
        <div>
          <label>Right</label>
          <input type="number" placeholder="Right" />
        </div>
      </div>
    </j-collapse>
  `,
  styles: [
    `.inp-grid {
      display:grid;
      grid-template-columns: 1fr 1fr;
      max-width: 100%;
      gap: 10px;
      background:#C9D1DA;
      padding:10px;
      border-radius: 7px;
    }`,
    `input {
      max-width: 100%;
      width: 100%;
      border-radius: 6px;
      border: 1px solid #DBDBDB;
      background: #FFF;
      box-shadow: 1px 2px 0px 0px rgba(0, 0, 0, 0.03);
      height: 35px;
      outline: none;
      color: #393939;
      font-size: 14px;
      font-weight: 400;
      padding: 0px 5px;
      margin-top:5px;
    }`
  ]
})
export class ContentElementContainerConfigComponent implements OnInit {
  @Input() values!: ContentElementStyle;

  styleForm = new FormGroup({
    paddingTop: new FormControl<number>(0),
    paddingBottom: new FormControl<number>(0),
    paddingLeft: new FormControl<number>(0),
    paddingRight: new FormControl<number>(0),
  })

  ngOnInit(): void {
    if(this.values)
      this.styleForm.patchValue({...this.values});
  }
}
