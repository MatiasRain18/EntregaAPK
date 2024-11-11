import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.page.html',
  styleUrls: ['./pasajero.page.scss'],
})
export class PasajeroPage implements OnInit {
  nombreUsuario: string = '';
  viajes: any[] = [];

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    this.nombreUsuario = currentUser.username;
    this.obtenerViajes();
  }

  obtenerViajes() {
    this.usuarioService.getViajes().subscribe(
      (data) => {
        this.viajes = data;
      },
      (error) => {
        console.error('Error al obtener viajes', error);
      }
    );
  }

  reservarViaje(viajeId: number) {
    const currentUser = this.authService.getCurrentUser();
    this.usuarioService.reservarViaje(viajeId, currentUser.id).subscribe(
      (response) => {
        console.log('Viaje reservado', response);
        this.obtenerViajes();
      },
      (error) => {
        console.error('Error al reservar viaje', error);
        alert('Error al reservar el viaje: ' + (error.error?.message || 'Por favor, inténtalo de nuevo.'));
      }
    );
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
