import { AfterViewInit, ChangeDetectorRef, Component, ComponentRef, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
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

  @Output() onEventTrigger = new EventEmitter<{ eventName: string; eventValue: any; }>();

  @ViewChild('widgetRef') widgetRef!: ElementRef<HTMLDivElement>;
  @ViewChild('containerRef', { read: ViewContainerRef }) containerRef!: ViewContainerRef;

  componentRef!: ComponentRef<WidgetContentComponentInterface>;
  // create the default style of widget parent
  constructor(
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) { }
  ngAfterViewInit(): void {
    this.updateWidgetStyle();
    this.updateContent();
  }


  updateWidgetStyle() {
    for (let key of Object.keys(this.config.style)) {
      this.renderer.setStyle(this.widgetRef.nativeElement, key, this.config.style[key as keyof IWidgetStyle]);
    }
  }

  updateContent() {
    this.containerRef.clear();

    this.componentRef = this.containerRef.createComponent<WidgetContentComponentInterface>(ComponentMap[this.config.widgetType]);
    this.componentRef.instance.schema = this.config.schema;
    this.componentRef.instance.datasource = this.config.datasource;

    this.componentRef.instance.onEventTrigger.subscribe(res => {
      this.onEventTrigger.emit(res);
    });

    this.containerRef.insert(this.componentRef.hostView, 0);
    // this.cdr.detectChanges();
    // this.containerRef.insert()
  }
  // handle widget child


}
