// login.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  tipoUsuario: string = '';
  submitted: boolean = false;

  constructor(
    private router: Router, 
    private usuarioService: UsuarioService,
    private alertController: AlertController
  ) {}

  ingresar() {
    this.submitted = true;

    if (this.username && this.password && this.tipoUsuario) {
      this.usuarioService.login(this.username, this.password).subscribe(
        response => {
          if (response.success) {
            // Combinar la funcionalidad anterior con la nueva
            const userData = {
              ...response.user,
              conductorId: response.user.id,  // Mantener compatibilidad con código existente
              rol: this.tipoUsuario
            };

            // Guardar en localStorage
            localStorage.setItem('currentUser', JSON.stringify(userData));

            // Redirigir según el rol
            if (this.tipoUsuario === 'conductor') {
              this.router.navigate(['/home']);
            } else {
              this.router.navigate(['/pasajero']);
            }
          } else {
            this.presentAlert('Error', response.message || 'Credenciales incorrectas');
          }
        },
        error => {
          console.error('Error en login:', error);
          this.presentAlert('Error', 'Error al iniciar sesión');
        }
      );
    } else {
      this.presentAlert('Error', 'Por favor, completa todos los campos');
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  restablecerContrasena() {
    this.router.navigate(['/reset-password']);
  }
}