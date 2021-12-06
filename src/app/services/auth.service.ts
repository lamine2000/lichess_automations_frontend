import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth
  ) { }

  createNewUser(email:string, password: string){
    return new Promise(
      (resolve, reject) => {
        this.auth.createUserWithEmailAndPassword(email, password)
          .then(
            (success) => {resolve(success);},
            (error) => {reject(error);}
          );
      }
    );
  }

  signIn(email: string, password: string){
    return new Promise(
      (resolve, reject) => {
        this.auth.signInWithEmailAndPassword(email, password).then(
          (success) => {resolve(success);},
          (error) => {reject(error);}
        );
      }
    );
  }

  signOut(){
    return new Promise(
      (resolve, reject) => {
        this.auth.signOut().then(
          (success) => {resolve(success);},
          (error) => {reject(error);}
        );
      }
    );
  }
}
