import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {DragDropModule} from '@angular/cdk/drag-drop';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {ChatComponent} from './chat/chat.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {ChatModalComponent} from './chat/chat-modal/chat-modal.component';
import { MatDialogModule, MatFormFieldModule} from "@angular/material";
import {environment} from "../environments/environment";
import {StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import * as login from "./store/login.reducer";
import {AuthGuard} from "./auth-guard.service";
import * as config from './app.configurations';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'user', component: ChatComponent, canActivate: [AuthGuard]},
  {path: 'sign', component: SignUpComponent},
  {path: '', component: LoginComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    SignUpComponent,
    ChatModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DragDropModule,
    RouterModule.forRoot(
      appRoutes,
    ),
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    StoreModule.forRoot({
      client: login.reducer,
      config: config.reducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      name: 'Chat-Application',
      logOnly: environment.production,
    })
  ],
  entryComponents: [
    ChatModalComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
