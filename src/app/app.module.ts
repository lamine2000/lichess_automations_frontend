import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./services/auth.service";
import {AuthGuardService} from "./services/auth-guard.service";
import {TournamentsService} from "./services/tournaments.service";
import {SigninComponent} from './components/auth/signin/signin.component';
import {SignupComponent} from './components/auth/signup/signup.component';
import {UserComponent} from './components/user/user.component';
import {AdminComponent} from './components/admin/admin.component';
import {NewTournamentComponent} from './components/new-tournament/new-tournament.component';
import {HeaderComponent} from './components/header/header.component';
import {FourOFourComponent} from './components/four-o-four/four-o-four.component';
import {ModifyTounamentComponent} from './components/modify-tounament/modify-tounament.component';
import {ProfileComponent} from './components/profile/profile.component';
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";

const appRoutes: Routes = [
  {path: '', component: SigninComponent},
  {path: 'auth/signup', component: SignupComponent},
  {path: 'auth/signin', component: SigninComponent},
  {path: 'user/:id', component: UserComponent},
  {path: 'user/:id/profile', component: ProfileComponent},
  {path: 'user/:id/modify/tournament', component: ModifyTounamentComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'new/tournament', component: NewTournamentComponent},
  {path: '**', component: FourOFourComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    UserComponent,
    AdminComponent,
    NewTournamentComponent,
    HeaderComponent,
    FourOFourComponent,
    ModifyTounamentComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    AuthGuardService,
    TournamentsService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule{}
