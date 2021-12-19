import {Component, OnInit} from '@angular/core';
import { LichessApiRequestsService } from 'src/app/services/lichess-api-requests.service';
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../model/user.model";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";
import {Md5} from "ts-md5";
import {NgModel} from "@angular/forms";
import {NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  confirmationCode!: number;
  messageSentAt = new Date();
  username!: string;
  passwordField!: NgModel;
  inputStyles = {
    'email': 'basic',
    'lichessUsername': 'basic',
    'code': 'basic',
    'password': 'basic',
    'confirmPassword': 'basic'
  };

  constructor(
    private lichess: LichessApiRequestsService,
    private authService: AuthService,
    private db: AngularFirestore,
    private router: Router,
    private toastService: NbToastrService
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

  getState1(){
    return this.getDiffTime() > 5 * 60 * 1000;
  }

  getState2(code: string){
    return !this.getState1() &&
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
        this.db.collection("/users").doc<User>(this.username.toLocaleLowerCase()).set(
          {
            uid: userAuth.uid,
            email: email,
            lichessUsername: this.username,
            password: Md5.hashStr(password),
            lichessToken: ''
          }
        )
          .then(() => {this.router.navigate(['/auth', 'signin'])})
      },
        reason => { throw reason;}
      )
      .catch(() => { });
  }

  styleInput(field: NgModel){
    switch(field.name){
      case 'email':
        this.inputStyles.email = field.value != '' && field.value.match(/^\S+@\S+\.\S+$/) ? 'basic' : 'danger';
        break;

      case 'lichessUsername':
        this.inputStyles.lichessUsername = field.value == '' ? 'danger' : 'basic';
        break;

      case 'code':
        this.inputStyles.code = this.confirmationCode !== field.value || this.getDiffTime() > 5 * 60 * 1000 ? 'danger' : 'basic';
        break;

      case 'confirmPassword':
        this.inputStyles.confirmPassword = field.value !== this.passwordField.value ? 'danger' : 'basic';
        break;

    }

  }

  canGoNext(...fields: NgModel[]){
    for (let field of fields){
      // @ts-ignore
      let ok = field.value != '' && this.inputStyles[field.name] == 'basic';
      if(!ok)
        return false;
    }
    return true;
  }

  setPasswordField(passwordField: NgModel){
    this.passwordField = passwordField;
  }

  checkForUniqueUsername(usernameField: NgModel){
    this.db
      .collection('/users')
      .doc<User>(usernameField.value.toLowerCase())
      .get()
      .subscribe(
      (data) => {
      if(!data.exists){
        this.sendConfirmationCode(this.username);
      }
      else{
        this.toastService.show(
          `Un compte possède déja le username lichess suivant : ${usernameField.value} !\nRedirection en cours... `,
          `Erreur rencontrée`,
          {
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
            duration: 5000,
            destroyByClick: true,
            status: 'danger'
          }
        );
        setTimeout(
          () => {
            this.router.navigate(['/auth', 'signin']);
            this.toastService.show(
              `Vous avez été redirigé vers la page de connexion`,
              `Redirection effectuée`,
              {
                position: NbGlobalPhysicalPosition.TOP_RIGHT,
                duration: 10000,
                destroyByClick: true,
                status: 'success'
              }
            );
            },
          0);
      }
    });
  }
}
