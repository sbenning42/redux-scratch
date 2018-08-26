import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthUser } from '../../redux/redux-scratch';

import { Observable, of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';

export interface SteamuloUser {
  id: string,
  creation: number,
  civilite: number,
  email: string,
  nom: string,
  prenom: string,
  age: number,
  dateNaissance: string,
  telephoneMaison: string,
  telephonePortable: string,
  anciennete: number,
  cbEnregistree: any,
  codePostal: string,
  derniereCommande: any,
  idAdresseFacturation: number,
  profilage: boolean,
  newsLetterCarrefour: boolean,
  newsLetterPartenaire: boolean,
  carteFid: boolean,
  cartePass: boolean,
  optinGroupe: boolean,
}
/*

  age: 33,
  anciennete: 0,
  carteFid: false,
  cartePass: false,
  cbEnregistree: null,
  civilite: 0,
  codePostal: "66750",
  creation: 1535297877000,
  dateNaissance: "1985-05-05",
  derniereCommande: null,
  email: "sben@sben.sben",
  id: "3958286745868498672",
  idAdresseFacturation: 3958286745868498400,
  newsLetterCarrefour: false,
  newsLetterPartenaire: false,
  nom: "SBEN",
  optinGroupe: false,
  prenom: "sben",
  profilage: true,
  telephoneMaison: null,
  telephonePortable: "0600000000"
*/

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }

  login(credentials: {login: string, password: string}): Observable<AuthUser> {
    return this.http.post<AuthUser>('http://www.recette.spectacles.carrefour.fr/api/internautes/login',
      credentials,
      {withCredentials: true}
    );
  }

}
