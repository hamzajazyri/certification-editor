import { AfterViewInit, ChangeDetectorRef, Component, ComponentRef, EventEmitter, Input, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextWidgetComponent, TextWidgetModalComponent } from '../text-widget/text-widget.component';
import { ImageWidgetComponent, ImageWidgetModalComponent } from '../image-widget/image-widget.component';
import { WidgetInterface } from '../widget.interface';
import { DialogRef } from '@angular/cdk/dialog';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements AfterViewInit {

  @ViewChild('widgetViewRef', { read: ViewContainerRef }) widgetViewRef!: ViewContainerRef;

  @Input() widgetComponent!: keyof typeof ComponentMap;
  @Input() widgetData: any = {};

  @Output() onEditorEdit = new EventEmitter<Editor>();
  @Output() onEditorEditEnd = new EventEmitter<void>();

  compRef!: ComponentRef<WidgetInterface>;

  widgetConfig: WidgetConfig = {
    bgColor: '#fff',
    margin: 0,
    padding: 0
  };

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.compRef = this.widgetViewRef.createComponent<WidgetInterface>(ComponentMap[this.widgetComponent]);
    this.compRef.instance.setData(this.widgetData);
    this.compRef.instance.widgetConfig = this.widgetConfig;

    // redirect output events
    this.compRef.instance.onEditorEdit.subscribe( res => this.onEditorEdit.emit(res));
    this.compRef.instance.onEditorEditEnd.subscribe( res => this.onEditorEditEnd.emit(res));


    this.compRef.instance.setData({type: this.widgetComponent})

    this.widgetViewRef.insert(this.compRef.hostView, 0);
  }


  onEdit(){

    const modal : DialogRef<WidgetModalInterface> = this.compRef.instance.openModal();
    const componentType = ComponentModalMap[this.widgetComponent];

    (modal.componentInstance as  InstanceType<typeof componentType>).onValuesChange.subscribe( res => {
      console.log(res);
      this.widgetConfig = res.widgetConfig as WidgetConfig;
      this.compRef.instance.widgetConfig = this.widgetConfig;
      this.widgetData = res.data;
      this.compRef.instance.setData(this.widgetData);
      this.cdr.detectChanges();
    });
    // modal.componentInstance
  }

}

export const ComponentModalMap = {
  text: TextWidgetModalComponent,
  heading: TextWidgetModalComponent,
  image: ImageWidgetModalComponent
};

export const ComponentMap = {
  text:TextWidgetComponent,
  heading: TextWidgetComponent,
  image: ImageWidgetComponent
};


export interface WidgetModalInterface {
  onValuesChange: EventEmitter<any>
}


export interface WidgetConfig {
  padding: number;
  margin:number;
  bgColor: string;
}
