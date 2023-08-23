import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JCollapseComponent } from './components/j-collapse/j-collapse.component';
import { JEditorComponent } from './j-editor/j-editor.component';
import { DraggableDirective } from './directives/draggable.directive';
import { MultiImageUploadContainerComponent } from './components/multi-image-upload-container/multi-image-upload-container.component';
import { jsPDF } from 'jspdf';
import { VariablesContainerComponent } from './components/variables-container/variables-container.component';

@Component({
  selector: 'app-certification-editor',
  standalone: true,
  imports: [CommonModule, JCollapseComponent, JEditorComponent, DraggableDirective, MultiImageUploadContainerComponent, VariablesContainerComponent],
  templateUrl: './certification-editor.component.html',
  styleUrls: ['./certification-editor.component.scss']
})
export class CertificationEditorComponent {


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
