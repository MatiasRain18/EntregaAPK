import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  username: string = '';
  submitted: boolean = false;

  constructor(private router: Router) {}

  recuperar() {
    this.submitted = true;

    if (!this.username) {
      alert('Por favor, ingresa tu nombre de usuario.');
      return;
    }

    // Aquí puedes agregar lógica para enviar el email de recuperación
    alert('Instrucciones de recuperación enviadas a tu email.');
    this.router.navigate(['/login']);
  }
}
