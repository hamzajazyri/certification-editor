import { ChangeDetectorRef, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableElementsTabComponent } from '../components/draggable-elements-tab/draggable-elements-tab.component';
import { EditorStyleTabComponent } from '../components/editor-style-tab/editor-style-tab.component';
import { EditorPreviewComponent } from '../components/editor-preview/editor-preview.component';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { IWidget } from '../editor.model';
import { WidgetStyleTabComponent } from '../components/widget-style-tab/widget-style-tab.component';
import { EditorService } from '../services/editor.service';
import { IFormGroupStyle } from '../shared/form-group-style/form-group-style.component';
import { EditorSchemaVariablesComponent } from '../components/editor-schema-variables/editor-schema-variables.component';
import { NgxPrintModule } from 'ngx-print';
import { jsPDF } from 'jspdf';

export enum EDITOR_TAB {
  STYLES,
  ELEMENTS,
  SCHEMA_VARIABLES,
  WIDGET_EDIT,

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
    WidgetStyleTabComponent,
    EditorSchemaVariablesComponent
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

  saveTemplate() {
    this.editorSrv.saveTemplate();
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
    EditorPreviewComponent,
    NgxPrintModule
  ],
  template: `
    <div class="jz-editor-prev">
      <div class="editor-preview-container" id="ngxPrintId" #editorPreviewRef>
        <app-editor-preview [editable]="false" [datasource]="data"></app-editor-preview>
      </div>
      <!-- <button ngxPrint printSectionId="ngxPrintId" printTitle="Print title" [useExistingCss]="true">Download PDF </button> -->
      <button (click)="downloadPDF()">downloadpdf</button>
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
    this.editorSrv.loadTemplate();
  }


  isHighDensity() {
    return ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches)) || (window.devicePixelRatio && window.devicePixelRatio > 1.3));
  }
  isRetina() {
    return ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx), only screen and (min-resolution: 75.6dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min--moz-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2)').matches)) || (window.devicePixelRatio && window.devicePixelRatio >= 2)) && /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
  }
  downloadPDF() {
    // if (this.isRetina() == true || this.isHighDensity() == true) {
    const template = localStorage.getItem('template');

    var w = document.getElementById('ngxPrintId')?.clientWidth || 1225;
    var h =document.getElementById('ngxPrintId')?.clientHeight || 1584;

    var pdf = new jsPDF('p', 'px', 'a4');

    pdf.internal.pageSize.width = w*1.6;
    pdf.internal.pageSize.height = h*2;
    // } else {
    //   var pdf = new jsPDF('p', 'pt', 'letter');
    // }
    pdf.html(document.getElementById('ngxPrintId')!, {
      callback: function (pdf) {
        pdf.save('BOM NAME - Z2Data BOM Analysis.pdf');
      }
    });
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
        }, {
          key1: {
            val: 'val 11'
          },
          key2: 'val 22',
          key3: 'val 33',
          key4: 'val 44',
          key5: 'val 55',
        }, {
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
        id: 4,
        uuid: 'uuid',
        info: {
          name: 'name',
          age: 29
        }
      }
    }
  }

}
