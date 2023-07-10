import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CertificationEditorComponent } from './certification-editor/certification-editor.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CertificationEditorComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
