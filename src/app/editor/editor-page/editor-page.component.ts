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
import html2canvas from 'html2canvas';

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
  currentWidget: { widget: IWidget, variablesGroups: Array<IFormGroupStyle> } | null = null;

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
      <div class="editor-preview-container" #editorPreviewRef>
        <app-editor-preview [editable]="false" [datasource]="data"></app-editor-preview>
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

  @ViewChild('editorPreviewRef', { static: false }) editorPreviewRef!: ElementRef<HTMLDivElement>;

  constructor(
    private editorSrv: EditorService
  ) {
    this.editorSrv.emitNewValue(templateExample as IEditor);
  }

  data = {
    obj: {
      entrypoint: [
        {
          key1: {
            val: 'val 1'
          },
          key2: 'val 2',
          key3: 'val 3',
          key4: 'val 4',
          key5: 'val 5',
        },{
          key1: {
            val: 'val 11'
          },
          key2: 'val 22',
          key3: 'val 33',
          key4: 'val 44',
          key5: 'val 55',
        },{
          key1: {
            val: 'val 111'
          },
          key2: 'val 222',
          key3: 'val 333',
          key4: 'val 444',
          key5: 'val 555',
        }
      ],
      user: {
        id:4,
        uuid: 'uuid',
        info: {
          name: 'name',
          age: 29
        }
      }
    }
  }

  print() {
    const nativeElement = this.editorPreviewRef.nativeElement;
    html2canvas(nativeElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 0, 0, 0, 0);
      pdf.save('certification-name.pdf');
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
              "x": 1,
              "y": 1,
              "cols": 4,
              "rows": 5
          },
          "variables": {
              "editorContent": "<p>user id #{id}</p><p>user uuid #{uuid}</p><p>user info name #{name}</p><p>user info age #{age}</p><p></p>"
          },
          "schema": [
              {
                  "textMatch": "id",
                  "mapTo": "obj.user.id"
              },
              {
                  "textMatch": "uuid",
                  "mapTo": "obj.user.uuid"
              },
              {
                  "textMatch": "name",
                  "mapTo": "obj.user.info.name"
              },
              {
                  "textMatch": "age",
                  "mapTo": "obj.user.info.age"
              }
          ],
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
              "x": 5,
              "y": 1,
              "cols": 4,
              "rows": 7
          },
          "variables": {},
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
              "x": 2,
              "y": 9,
              "cols": 8,
              "rows": 7
          },
          "variables": {
              "headers": "head1, head2, head3, head4, head5",
              "keys": "key1.val, key2, key3, key4, key5",
              "entryPoint": "obj.entrypoint"
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
