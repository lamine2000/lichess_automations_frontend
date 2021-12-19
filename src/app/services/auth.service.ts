import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private toastService: NbToastrService
  ) { }

  createNewUser(email:string, password: string){
    return new Promise(
      (resolve) => {
        this.auth.createUserWithEmailAndPassword(email, password)
          .then(
            (success) => {resolve(success);},
            (error) => {throw error;}
          )
          .catch(
            (error) => {
              this.toastService.show(
                `Une erreur est survenue lors de la création du compte ! ${error.code}`,
                `Erreur rencontrée`,
                {
                  position: NbGlobalPhysicalPosition.TOP_RIGHT,
                  duration: 10000,
                  destroyByClick: true,
                  status: 'danger'
                }
              );
            }
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
