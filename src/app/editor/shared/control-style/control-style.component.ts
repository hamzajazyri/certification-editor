import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IFormControlStyle } from '../form-group-style/form-group-style.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs';

@Component({
  selector: 'app-control-style',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './control-style.component.html',
  styleUrls: ['./control-style.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ControlStyleComponent implements OnInit {

  @Output() onControlValueChange = new EventEmitter<any>();
  @Input() control!: IFormControlStyle;

  inpControl = new FormControl();

  ngOnInit(): void {
    this.inpControl.setValue(this.control.value, {emitEvent: false});
    this.inpControl.valueChanges.pipe(
      debounceTime(100)
    ).subscribe(
      val => this.onControlValueChange.emit(val)
    );
  }
}
