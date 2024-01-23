import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Translator } from '../models/translator.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  translate(translate: Translator): Observable<Translator> {
    return this.http.post<Translator>('http://localhost:8080/translator', translate);
  }
}
