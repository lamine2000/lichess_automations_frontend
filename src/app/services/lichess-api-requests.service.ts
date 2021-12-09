import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LichessApiRequestsService {

  constructor(private http: HttpClient) { }

  sendPrivateMessage(lichessUsername: string, message: string) {
    let options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept': '*/*'
      })
    };

    let body = {text: message, dest: lichessUsername, token: environment.sendMessageToken};

    let baseUrl = 'https://lichess-automations.herokuapp.com/send/';

    this.http.post(baseUrl, body, options)
      .subscribe({
          next: data => {
            //console.log(`réponse : ${data}`);
          },
          error: err => {
            //console.log(`erreur: `, err);
          }
        }
      );
  }
}
