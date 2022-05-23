import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(
    private http: HttpClient
  ) { }

  /*
  hasHomeWork(classe, student): Observable<any> {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    const param = new HttpParams().set('student', student);
    return this._http.get(Global.url + 'class/homwork/' + classe, { headers: header, params : param});
  }*/
  getAssignments(): Observable<any> {
    return this.http.get(Global.url + 'student/get-homeworks',{
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }
  getClasses(): Observable<any> {
    return this.http.get(Global.url + 'student/get-classes',{
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }
  
  getProfile(): Observable<any>{
    return this.http.get(Global.url + 'student/profile',{
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }
}
