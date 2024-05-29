import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private API_Key = 'deee73e16a744109936185922240505'
  constructor(private http:HttpClient) {}

  getData():Observable<any>{
    return this.http.get('http://localhost:3000/documents')
  }
}
