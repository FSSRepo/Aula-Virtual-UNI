import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})

export class CoreService {

  constructor(
    private http: HttpClient
  ) { }

  public login(student, username, password): Observable<any> {
    if (student) {
      const header = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.post(Global.url + 'student/login', { username, password }, {withCredentials: true, headers: header });
    } else {
      const header = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.post(Global.url + 'teacher/login', { username, password }, {withCredentials: true, headers: header });
    }
  }
  
  public logout(): Observable<any> {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(Global.url + '/logout', {withCredentials: true, headers: header })
  }
}
