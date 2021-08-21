import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConfigbuilderAppComponent } from './configbuilder-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DesignService } from './services/design.service';
import { HttpClientModule } from '@angular/common/http';
import { ConfigsComponent } from './components/configs/configs.component';

const routes: Routes = [
  { path: '', component: ConfigbuilderAppComponent,
    children: [
      {path: ':slug', component: MainContentComponent },
      {path: '', component: MainContentComponent }
    ]},
  { path: '**', redirectTo: ''}
];


@NgModule({
  declarations: [
    ConfigbuilderAppComponent,
    ToolbarComponent,
    MainContentComponent,
    SidenavComponent,
    ConfigsComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    DesignService
  ]
})
export class ConfigbuilderModule { }
