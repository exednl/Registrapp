import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaFeriados } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FeriadosService {

  constructor(private http: HttpClient) { }


  obtenerFeriados(){
    return this.http.get<RespuestaFeriados>('https://api.victorsanmartin.com/feriados/en.json')
  }

}