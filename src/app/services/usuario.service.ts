import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrlUsuarios = 'http://localhost:3000/api/usuarios';
  private apiUrlViajes = 'http://localhost:3000/api/viajes';
  private apiUrlReservas = 'http://localhost:3000/api/reservas';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<any> {
    return this.http.get(this.apiUrlUsuarios);
  }

  crearUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiUrlUsuarios, usuario);
  }
  crearViaje(viaje: any, conductorId: number): Observable<any> {
    return this.http.post(this.apiUrlViajes, {
      conductor_id: conductorId, // ID del conductor
      destino: viaje.destino,
      costo: viaje.costo,
      asientos_disponibles: viaje.asientos_disponibles,
      hora_salida: viaje.hora_salida,
      fecha: viaje.fecha
    });
  }

  getViajes(): Observable<any> {
    return this.http.get(this.apiUrlViajes);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrlUsuarios}/login`, { username, password });
  }
  

  // Nueva forma de reservar un viaje, pasando IDs dinámicos
  reservarViaje(viajeId: number, pasajeroId: number): Observable<any> {
    return this.http.post(this.apiUrlReservas, { viaje_id: viajeId, pasajero_id: pasajeroId });
  }


}