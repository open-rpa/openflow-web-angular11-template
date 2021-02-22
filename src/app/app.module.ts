import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimeSinceModule } from '@thisissoon/angular-timesince';

import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { api_wsurl, authCodeFlowConfig } from './authCodeFlowConfig';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import { EntitiesComponent } from './entities/entities.component';
import { UsersComponent } from './users/users.component';
import { RPAWorkflowsComponent } from './rpaworkflows/rpaworkflows.component';
import { InfiniteScrollModule } from '@thisissoon/angular-infinite-scroll';
import { RPAWorkflowComponent } from './rpaworkflow/rpaworkflow.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    EntitiesComponent,
    UsersComponent,
    RPAWorkflowsComponent,
    RPAWorkflowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    OAuthModule.forRoot(), 
    TimeSinceModule,
    InfiniteScrollModule
  ],
  providers: [
    {provide: 'apiwsurl', useValue: api_wsurl},
    {provide: 'authCodeFlowConfig', useValue: authCodeFlowConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
