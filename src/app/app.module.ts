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
import {SERVER_PORT} from "./app.configurations";
import {AddChatModalComponent} from './chat/add-chat-modal/add-chat-modal.component';
import { MatDialogModule, MatFormFieldModule} from "@angular/material";

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'user', component: ChatComponent},
  {path: 'sign', component: SignUpComponent},
  {path: '', component: LoginComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    SignUpComponent,
    AddChatModalComponent,
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
  ],
  providers: [
    {provide: SERVER_PORT, useValue: SERVER_PORT},
  ],
  entryComponents: [
    AddChatModalComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
