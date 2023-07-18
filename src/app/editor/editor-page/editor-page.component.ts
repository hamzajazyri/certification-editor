import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableElementsTabComponent } from '../components/draggable-elements-tab/draggable-elements-tab.component';
import { EditorStyleTabComponent } from '../components/editor-style-tab/editor-style-tab.component';
import { EditorPreviewComponent } from '../components/editor-preview/editor-preview.component';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { IEditor, IWidget } from '../editor.model';
import { WidgetStyleTabComponent } from '../components/widget-style-tab/widget-style-tab.component';
import { EditorService } from '../services/editor.service';
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
  currentWidget: IWidget | null = null;

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
        if (this.currentWidget === event.eventValue) {
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
      <div class="editor-preview-container" #editorPreviewRef>
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
  ]
})
export class EditorPreviewPageComponent {

  @ViewChild('editorPreviewRef', { static: true, read: ElementRef }) editorPreviewRef!: ElementRef<HTMLDivElement>;

  constructor(
    private editorSrv: EditorService
  ) {
    this.editorSrv.emitNewValue(templateExample as IEditor);
  }

  print() {
    // add pdf properties,

    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Generate PDF from the HTML element
    pdf.html(this.editorPreviewRef.nativeElement, {
      callback: (doc) => {
        doc.save('filename.pdf');
      },
      width: this.editorPreviewRef.nativeElement.clientWidth,
      autoPaging: true,

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
        "x": 5,
        "y": 2,
        "cols": 2,
        "rows": 2
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
      "widgetType": "TextEditor"
    },
    {
      "datasource": {},
      "gridConfig": {
        "x": 4,
        "y": 6,
        "cols": 2,
        "rows": 2
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
      "widgetType": "ImageComp"
    },
    {
      "datasource": {},
      "gridConfig": {
        "x": 9,
        "y": 11,
        "cols": 3,
        "rows": 3
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
