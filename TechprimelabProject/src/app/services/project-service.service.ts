import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Project } from '../models/project';
import { Status } from '../models/status';

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {

  apiUrl:string="http://localhost:8080/"
  
  constructor(private http: HttpClient) { }

  public getRequest(url: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + url);
  }

  public postRequest(url: string, param: {}) {
    return this.http.post(this.apiUrl + url, param)
      .pipe(
        catchError(this.errorHandler.bind(this)) // then handle the error
      );
  }

  public putRequest(url: string, param: {}): Observable<any> {
    return this.http.put<any>(this.apiUrl + url, param).pipe(
      catchError(this.errorHandler)
    );
  }

  public deleteRequest(url: string, id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + url + id).pipe(
      catchError(this.errorHandler)
    );
  }

  public login(url: string, email: string, password: string): Observable<any> {
    console.warn("Inside login")
    return this.http.post<any>(`${this.apiUrl}${url}`, { email, password });
  }
  
  updateProjectStatus(url: string, projectId: number, statusId: number): Observable<any> {
    const urlWithParams = `${this.apiUrl}${url}/${projectId}`;
    console.log("Status ID:", statusId); // Logging to verify statusId value
    return this.http.put(urlWithParams, statusId);
  }
  
  


  // getAllProject():Observable<any>{
  //   return this.http.get<any>(this.url+"getAllProjects");
  // }

  // getAllReasons():Observable<any>{
  //   return this.http.get<any>(this.url+"reasons");
  // }

  // getAllType():Observable<any>{
  //   return this.http.get<any>(this.url+"type");
    
  // }

  // getAllPriority():Observable<any>{
  //   return this.http.get<any>(this.url+"priority")
  // }

  // getAllLocation():Observable<any>{
  //   return this.http.get<any>(this.url+"location")
  // }

  // getAllDivision():Observable<any>{
  //   return this.http.get<any>(this.url+"division")
  // }

  // getAllDepartment():Observable<any>{
  //   return this.http.get<any>(this.url+"department")
  // }

  // getAllCategory():Observable<any>{
  //   return this.http.get<any>(this.url+"category")
  // }



  // saveProject(project: Project): Observable<any> {
  //   return this.http.post<any>(this.url + "saveProject", project).pipe(
  //     catchError(this.errorHandler)
  //   );
  // }

  

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `error code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
  
}