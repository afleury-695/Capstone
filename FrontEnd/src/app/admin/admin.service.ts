import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  authenticated = true;

  constructor() { }

  isAuthenticated(): boolean {
    return this.authenticated;
  }
}
