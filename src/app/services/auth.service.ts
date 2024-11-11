import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://tu-api-url.com/api'; // Reemplaza con la URL de tu API
  private users: any[] = []; // Simulación de base de datos local

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      // Almacena todos los detalles del usuario en localStorage
      localStorage.setItem('currentUser', JSON.stringify({ conductorId: user.id, ...user }));
      return of({ success: true, user: user });
    } else {
      return of({ success: false, message: 'Usuario o contraseña incorrectos' });
    }
  }
  
  
  logout() {
    localStorage.removeItem('currentUser');
  }

  resetPassword(username: string): Observable<any> {
    const user = this.users.find(u => u.username === username);
    if (user) {
      return of({ success: true, message: 'Instrucciones enviadas al correo' });
    } else {
      return of({ success: false, message: 'Usuario no encontrado' });
    }
  }

  register(user: any): Observable<any> {
    if (this.users.some(u => u.username === user.username)) {
      return of({ success: false, message: 'El usuario ya existe' });
    }
    this.users.push(user);
    return of({ success: true, message: 'Usuario registrado con éxito' });
  }

  getCurrentUser() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    console.log('Current user:', user); // Para depuración
    return user;
  }

  isLoggedIn(): boolean {
    const currentUser = this.getCurrentUser();
    return !!currentUser && !!currentUser.username;
  }
}
