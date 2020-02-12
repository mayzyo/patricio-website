import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public loggedIn: boolean = true;

  constructor() { }
}
