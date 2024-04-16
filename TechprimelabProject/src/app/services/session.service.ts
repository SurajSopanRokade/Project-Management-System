import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { User } from '../models/user';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private isLoggedIn = false;
  apiUrl:string="http://localhost:8080/user/"
  constructor(private http: HttpClient) {}

  setLoggedIn(status: boolean) {
    this.isLoggedIn = status;
    sessionStorage.setItem('isLoggedIn', status.toString());
  }

  isLoggedInUser(): boolean {
    const isLoggedInStr = sessionStorage.getItem('isLoggedIn');
    return isLoggedInStr ? JSON.parse(isLoggedInStr) : false;
  }

  logout() {
    this.setLoggedIn(false);

  }

  getSession():Observable<any>{
    var a=this.http.get(this.apiUrl+"getSession", { responseType: 'text' });
    console.log("Inside get session inside service : "+a)
    return a;
  }
  findByEmail(email: string): Observable<User> {
    const url = `${this.apiUrl}findByGmail/${email}`;
    var b= this.http.get<User>(url);
    console.warn("User object in service  : ",b);
    return b;
  }

  

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.apiUrl+'updateUser', user)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred:', error);
    throw error; // You can throw your custom error here or handle it based on your requirements
  }

}
