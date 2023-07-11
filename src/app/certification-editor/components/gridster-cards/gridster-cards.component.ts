import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from '../../directives/draggable.directive';



@Component({
  selector: 'app-editor-tool-card',
  standalone: true,
  imports: [CommonModule, DraggableDirective],
  template: `
    <div class="tool-card" Draggable [component]="component">
      <div class="tool-card-content">
        <img [src]="iconUrl" class="tool-icon" [alt]="text" />
        <h5>{{text}}</h5>
        <img src="assets/editor-tools-icons/scrollable-icon.svg" alt="scrollable icon"/>
      </div>
    </div>
  `,
  styles: [
    `.tool-card {
      border-radius: 4px;
      border: 1px solid rgba(36, 28, 21, 0.15);
      background: rgba(255, 255, 255, 0.50);
      box-shadow: 2px 2px 4px 0px rgba(36, 28, 21, 0.07);
      width:100%;
      max-width: 120px;
      height: 120px;
    }`,
    `.tool-card-content {
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content: center;
      width: 100%;
      height:100%;
      pointer-events: none;
    }`,
    `h5 {
      margin:15px 0px;
      font-weight: 500;
      font-size:15px;
    }`
  ]
})
export class EditorToolCardComponent {
  @Input() text!: string;
  @Input() iconUrl!: string;
  @Input() component!: string;
}


@Component({
  selector: 'app-gridster-cards',
  standalone: true,
  imports: [CommonModule, EditorToolCardComponent],
  templateUrl: './gridster-cards.component.html',
  styleUrls: ['./gridster-cards.component.scss']
})
export class GridsterCardsComponent {

  tools = [{
      iconUrl: 'assets/editor-tools-icons/heading-icon.svg',
      text: 'Heading',
      html: 'heading'
    }, {
      iconUrl: 'assets/editor-tools-icons/auto-icon.svg',
      text: 'Auto Generation',
      html: 'Auto Generation'
    }, {
      iconUrl: 'assets/editor-tools-icons/image-icon.svg',
      text: 'Image',
      html: 'image'
    },{
      iconUrl: 'assets/editor-tools-icons/paragraph-icon.svg',
      text: 'Paragraph',
      html: 'text'
    }
  ];

}


