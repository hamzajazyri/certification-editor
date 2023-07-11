import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridsterContainerComponent } from './components/gridster-container/gridster-container.component';
import { GridsterCardsComponent } from './components/gridster-cards/gridster-cards.component';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-certification-editor',
  standalone: true,
  imports: [CommonModule, GridsterContainerComponent, GridsterCardsComponent, NgxEditorModule],
  templateUrl: './certification-editor.component.html',
  styleUrls: ['./certification-editor.component.scss']
})
export class CertificationEditorComponent {

  currentEditor: Editor | null = null;

  showMenu(editor: Editor) {
    console.log("show menu");
    this.currentEditor = editor;
  }
  hideMenu(){
    console.log("hide menu")
    this.currentEditor = null;
  }


  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    // ['link', 'image'],
    ['text_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
}
