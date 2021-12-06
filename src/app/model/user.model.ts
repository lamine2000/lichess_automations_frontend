export class User {
  lichessToken: string;

  constructor(
    public uid: string,
    public email: string,
    public lichessUsername: string,
    public password: string){
    this.lichessToken = '';
  }
}
