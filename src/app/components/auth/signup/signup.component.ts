import {Component, OnInit} from '@angular/core';
import { LichessApiRequestsService } from 'src/app/services/lichess-api-requests.service';
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../model/user.model";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";
import {Md5} from "ts-md5";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  confirmationCode!: number;
  messageSentAt = new Date();
  username!: string;

  constructor(
    private lichess: LichessApiRequestsService,
    private authService: AuthService,
    private db: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  sendConfirmationCode(lichessUsername: string) : void{
    this.username = lichessUsername;
    this.messageSentAt = new Date();
    this.confirmationCode = Math.floor(Math.random() * 1000000);

    let message = `Confirmation Code : ${this.confirmationCode}\n\nThis Code will only stay valid for five (5) minutes.\n\n_____________________________\nSent by lichessAutomations`;
    this.lichess.sendPrivateMessage(this.username, message);
  }

  getDiffTime() {
    let now = new Date();
    return now.getMilliseconds() - this.messageSentAt.getMilliseconds();
  }

  getState1(code: string){
    return this.getDiffTime() > 5 * 60 * 1000;
  }

  getState2(code: string){
    return !this.getState1(code) &&
      code &&
      this.confirmationCode !== eval(code) &&
      this.getDiffTime() < 5 * 60 * 1000;
  }

  storeUserData(email: string, password: string){
    this.authService.createNewUser(email, password)
      .then(
      (value) => {
        // @ts-ignore
        let userAuth = value.user;
        this.db.collection("/users").doc<User>(this.username).set(
          {
            uid: userAuth.uid,
            email: email,
            lichessUsername: this.username,
            password: Md5.hashStr(password),
            lichessToken: ''
          }
        )
          .then(() => {this.router.navigate(['/auth', 'signin'])});
      }/*,
        reason => { throw reason;}*/
      )
      .catch((reason) => { });
  }
}
