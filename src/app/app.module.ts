import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { NgModule } from '@angular/core';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AddGroupComponent } from './components/home/add-group/add-group.component';
import { EditGroupComponent } from './components/home/edit-group/edit-group.component';
import { HeaderComponent } from './components/header/header.component';
import { GroupComponent } from './components/group/group.component';
import { AddContactComponent } from './components/group/add-contact/add-contact.component';
import { EditContactComponent } from './components/group/edit-contact/edit-contact.component';
import { ViewContactComponent } from './components/group/view-contact/view-contact.component';

import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { AuthGuard } from './guards/auth-guard.service';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    AddGroupComponent,
    EditGroupComponent,
    HeaderComponent,
    GroupComponent,
    AddContactComponent,
    EditContactComponent,
    ViewContactComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
