import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableElementsTabComponent } from '../components/draggable-elements-tab/draggable-elements-tab.component';
import { EditorStyleTabComponent } from '../components/editor-style-tab/editor-style-tab.component';
import { EditorPreviewComponent } from '../components/editor-preview/editor-preview.component';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';


export enum EDITOR_TAB {
  STYLES,
  ELEMENTS
}

@Component({
  selector: 'app-editor-page',
  standalone: true,
  imports: [
    CommonModule,
    DraggableElementsTabComponent,
    EditorStyleTabComponent,
    EditorPreviewComponent,
    NgxEditorModule
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
  currentWidget: any;

  currentEditor: Editor | null = null;

  toolbar: Toolbar = toolbarEditorDefaultConfig;

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  onEventTrigger(event: { eventName: string, eventValue: any }) {
    switch (event.eventName) {
      case 'EDITOR_FOCUS_IN':
        this.currentEditor = null;
        setTimeout(() => {
          this.currentEditor = event.eventValue as Editor;
        }, 0);
        break;
      case 'WIDGET_EDIT':

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
