import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {DragDropModule} from '@angular/cdk/drag-drop';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {ChatComponent} from './chat/chat.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {AccountService} from "./services/app.account-service";
import {SERVER_PORT} from "./app.configurations";

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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DragDropModule,
    RouterModule.forRoot(
      appRoutes,
    )
  ],
  providers: [{provide: SERVER_PORT, useValue: SERVER_PORT}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
