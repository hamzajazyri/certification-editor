import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-spacer-element',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './spacer-element.component.html',
  styleUrls: ['./spacer-element.component.scss']
})
export class SpacerElementComponent {

  @Input() data: any;

  values = [1,2,3,4,5];

  spaceValue = new FormControl<number>(10);


}
