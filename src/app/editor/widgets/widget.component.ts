import { AfterViewInit, ChangeDetectorRef, Component, ComponentRef, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2, SimpleChanges, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IWidget, IWidgetStyle } from '../editor.model';
import { ComponentMap, WidgetContentComponentInterface } from './widget.model';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WidgetComponent implements AfterViewInit {

  @Input('config') config!: IWidget;
  @Input('editable') isEditable = true;

  @Output() onEventTrigger = new EventEmitter<{ eventName: string; eventValue: any; }>();
  @Output() onDelete = new EventEmitter<void>();

  @ViewChild('widgetRef') widgetRef!: ElementRef<HTMLDivElement>;
  @ViewChild('containerRef', { read: ViewContainerRef }) containerRef!: ViewContainerRef;

  componentRef!: ComponentRef<WidgetContentComponentInterface>;

  constructor(
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this.updateContent();
  }

  updateContent() {
    this.containerRef.clear();
    this.componentRef = this.containerRef.createComponent<WidgetContentComponentInterface>(ComponentMap[this.config.widgetType]);
    this.componentRef.instance.schema = this.config.schema;
    this.componentRef.instance.datasource = this.config.datasource;
    this.componentRef.instance.isEditMode = this.isEditable;
    this.componentRef.instance.variables = this.config.variables;
    this.componentRef.instance.onEventTrigger.subscribe(res => {
      this.onEventTrigger.emit(res);
    });

    this.containerRef.insert(this.componentRef.hostView, 0);
  }

  widgetEditHandler() {
    this.onEventTrigger.emit({
      eventName: 'WIDGET_EDIT_ON',
      eventValue: {
        widget: this.config,
        variablesGroups: this.componentRef.instance.variablesGroups
      }
    });
  }

}
