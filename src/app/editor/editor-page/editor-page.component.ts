import { ChangeDetectorRef, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableElementsTabComponent } from '../components/draggable-elements-tab/draggable-elements-tab.component';
import { EditorStyleTabComponent } from '../components/editor-style-tab/editor-style-tab.component';
import { EditorPreviewComponent } from '../components/editor-preview/editor-preview.component';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { IEditor, IWidget } from '../editor.model';
import { WidgetStyleTabComponent } from '../components/widget-style-tab/widget-style-tab.component';
import { EditorService } from '../services/editor.service';
import { IFormGroupStyle } from '../shared/form-group-style/form-group-style.component';
import { jsPDF } from 'jspdf';

export enum EDITOR_TAB {
  STYLES,
  ELEMENTS,
  WIDGET_EDIT
}

@Component({
  selector: 'app-editor-page',
  standalone: true,
  imports: [
    CommonModule,
    DraggableElementsTabComponent,
    EditorStyleTabComponent,
    EditorPreviewComponent,
    NgxEditorModule,
    WidgetStyleTabComponent
  ],
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.scss']
})
export class EditorPageComponent {

  TAB = EDITOR_TAB;

  currentTab = EDITOR_TAB.STYLES;

  /**
   * Holds the reference to the currently selected widget for editing.
   */
  currentWidget: {widget: IWidget, variablesGroups: Array<IFormGroupStyle>} | null = null;

  currentEditor: Editor | null = null;

  toolbar: Toolbar = toolbarEditorDefaultConfig;

  constructor(
    private cdr: ChangeDetectorRef,
    private editorSrv: EditorService
  ) { }

  logTemplate() {
    this.editorSrv.log();
  }

  onEventTrigger(event: { eventName: string, eventValue: any }) {
    switch (event.eventName) {
      case 'EDITOR_FOCUS_IN':
        this.currentEditor = null;
        setTimeout(() => {
          this.currentEditor = event.eventValue as Editor;
        }, 0);
        break;
      case 'WIDGET_DELTED':
        if (this.currentWidget?.widget === event.eventValue) {
          this.currentTab = EDITOR_TAB.ELEMENTS;
          this.currentWidget = null;
        }
        break;
      case 'WIDGET_EDIT_ON':
        this.currentTab = EDITOR_TAB.WIDGET_EDIT;
        this.currentWidget = event.eventValue;
        break;
    }
  }
}

export const toolbarEditorDefaultConfig: Toolbar = [
  ['bold', 'italic'],
  ['underline', 'strike'],
  ['blockquote'],
  ['ordered_list', 'bullet_list'],
  [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
  // ['link', 'image'],
  ['text_color'],
  ['align_left', 'align_center', 'align_right', 'align_justify'],
];




@Component({
  selector: 'app-editor-preview-page',
  standalone: true,
  imports: [
    CommonModule,
    EditorPreviewComponent
  ],
  template: `
    <div class="jz-editor-prev">
      <div class="editor-preview-container" #editorPreviewRef id="print-content">
        <app-editor-preview [editable]="false" ></app-editor-preview>
      </div>
      <button (click)="print()">Download PDF </button>
    </div>
  `,
  styles: [
    `.jz-editor-prev {
      background:#eee;
    }`,
    `.editor-preview-container {
      margin:auto;
      width:fit-content;
    }`,
    `button {
      position:fixed;
      right:20px;
      bottom:20px;
    }`,
    `.editor-preview {
      border:3px solid red;
    }`
  ],
  encapsulation: ViewEncapsulation.None
})
export class EditorPreviewPageComponent {

  @ViewChild('editorPreviewRef', { static: false}) editorPreviewRef!: ElementRef<HTMLDivElement>;

  constructor(
    private editorSrv: EditorService
  ) {
    this.editorSrv.emitNewValue(templateExample as IEditor);
  }

  print() {
    const pdf = new jsPDF();
    pdf.html(document.querySelector('#print-content') as HTMLElement, {
      callback: (doc) => {
        doc.save('filename.pdf');
      },
      width: this.editorPreviewRef.nativeElement.clientWidth,
      autoPaging: false,
    });
  }

}




export const templateExample = {
  "grid": {
      "columnsSize": 12,
      "rowsSize": 24,
      "width": 854,
      "height": 1054,
      "style": {
          "backgroundColor": "#ffffff",
          "padding": 0
      }
  },
  "widgets": [
      {
          "datasource": {},
          "gridConfig": {
              "x": 3,
              "y": 3,
              "cols": 6,
              "rows": 5
          },
          "variables": {
              "headers": "head1, head2, head3, head4"
          },
          "schema": [],
          "style": {
              "borderWidth": 0,
              "borderColor": "#ffffff",
              "borderStyle": "solid",
              "borderRadius": 0,
              "verticalAlign": "left",
              "horizantalAlign": "top",
              "padding": 0,
              "backgroundColor": "#ffffff"
          },
          "widgetType": "DynamicTable"
      }
  ],
  "datasource": {}
}
