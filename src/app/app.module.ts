import {HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { HttpService } from './services/http.service';
import { StatisticService } from './services/statistics.service';
import { RoomService } from './oAndX/services/room.service';



const config = {
  apiKey: 'AIzaSyDqTGkrghXccAbaQSDM-DOZb0GGky8gCz8',
    authDomain: 'stormtest-472aa.firebaseapp.com',
    databaseURL: 'https://stormtest-472aa.firebaseio.com',
    projectId: 'stormtest-472aa',
    storageBucket: 'stormtest-472aa.appspot.com',
    messagingSenderId: '310345883436'
};
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [AuthGuardService, AuthService, HttpService, StatisticService, RoomService],
  bootstrap: [AppComponent]
})
export class AppModule { }
