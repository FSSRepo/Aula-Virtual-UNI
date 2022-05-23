import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {
  constructor(
    private http: HttpClient
  ) { }

  getClasseById(id): Observable<any> {
   return this.http.get(Global.url + 'class/info/' + id,{
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
    withCredentials: true});
  }
  
  getPublicationsById(id): Observable<any> {
    return this.http.get(Global.url + 'publication/byclass/' + id, {
       headers: new HttpHeaders().append('Content-Type', 'application/json'),
     withCredentials: true});
   }
   
}
