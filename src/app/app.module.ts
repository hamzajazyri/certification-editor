import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditorPageComponent } from './editor/editor-page/editor-page.component';
import { RouterModule, Routes } from '@angular/router';



const ROUTES: Routes = [
  {
    path: 'v1',
    loadComponent: () => import('./editor/editor-page/editor-page.component')
      .then(c => c.EditorPageComponent),
    pathMatch: 'full'
  }, {
    path: 'preview',

    loadComponent: () => import('./editor/editor-page/editor-page.component')
      .then(c => c.EditorPreviewPageComponent),
    pathMatch: 'full'
  }, {
    path: '',
    loadComponent: () => import('./certification-editor/certification-editor.component')
      .then(c => c.CertificationEditorComponent),
  }
]


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    EditorPageComponent,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
