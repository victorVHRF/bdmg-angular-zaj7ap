import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formulario } from './formulario.model';

@Injectable()
export class AppService {
  constructor(private http: HttpClient) {}

  getCepData(cep: string): Observable<Formulario> {
    return this.http.get<Formulario>(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
