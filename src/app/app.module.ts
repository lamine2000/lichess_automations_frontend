import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./services/auth.service";
import {AuthGuardService} from "./services/auth-guard.service";
import {TournamentsService} from "./services/tournaments.service";
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';
import { NewTournamentComponent } from './components/new-tournament/new-tournament.component';
import { HeaderComponent } from './components/header/header.component';
import { FourOFourComponent } from './components/four-o-four/four-o-four.component';
import { ModifyTounamentComponent } from './components/modify-tounament/modify-tounament.component';
import { ModifyTokenComponent } from './components/modify-token/modify-token.component';

const appRoutes: Routes = [
  {path: '', component: SigninComponent},
  {path: 'auth/signup', component: SignupComponent},
  {path: 'auth/signin', component: SigninComponent},
  {path: 'user/:id', component: UserComponent},
  {path: 'user/:id/modify/tournament', component: ModifyTounamentComponent},
  {path: 'user/:id/modify/token', component: ModifyTokenComponent},
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
    ModifyTokenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    AuthService,
    AuthGuardService,
    TournamentsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
