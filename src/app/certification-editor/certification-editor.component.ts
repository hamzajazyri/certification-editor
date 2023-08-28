import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JCollapseComponent } from './components/j-collapse/j-collapse.component';
import { JEditorComponent } from './j-editor/j-editor.component';
import { DraggableDirective } from './directives/draggable.directive';
import { MultiImageUploadContainerComponent } from './components/multi-image-upload-container/multi-image-upload-container.component';
import { jsPDF } from 'jspdf';
import { VariablesContainerComponent } from './components/variables-container/variables-container.component';
import { EditorService } from './services/editor.service';
import { ContentElementContainerConfigComponent } from './content-elements/content-element.component';

@Component({
  selector: 'app-certification-editor',
  standalone: true,
  imports: [CommonModule, JCollapseComponent, JEditorComponent, DraggableDirective, MultiImageUploadContainerComponent, VariablesContainerComponent, ContentElementContainerConfigComponent],
  templateUrl: './certification-editor.component.html',
  styleUrls: ['./certification-editor.component.scss']
})
export class CertificationEditorComponent {

  isEditMode = true;

  constructor(
    private editorSrv: EditorService
  ) {}

  deleteTemplate() {
    alert("DELETE FN");
  }

  saveTemplate() {
    alert("SAVE TEMPLATE");
  }

  updateMode() {
    if(this.isEditMode) {
      this.isEditMode = false;
      this.editorSrv.setPreviewMode();
      return;
    }
    this.isEditMode = true;
    this.editorSrv.setEditMode();
  }

  generatePDF() {
      var pdf = new jsPDF('p', 'px', 'a4');
      document.getElementById('ngxPrintId')!.style.transform = 'scale(.5) translate(-50%, -50%)';
      pdf.html(document.getElementById('ngxPrintId')!, {
        callback: function (pdf) {
          pdf.save('BOM NAME - Z2Data BOM Analysis.pdf');
          document.getElementById('ngxPrintId')!.style.transform = 'none';
        }
      });
  }

}
