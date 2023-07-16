import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CertificationEditorComponent } from './certification-editor/certification-editor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditorPageComponent } from './editor/editor-page/editor-page.component';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CertificationEditorComponent,
    EditorPageComponent,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
