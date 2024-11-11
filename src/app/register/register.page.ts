import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  submitted: boolean = false;

  constructor(private router: Router, private usuarioService: UsuarioService) {}

  register() {
    this.submitted = true;

    if (!this.username || !this.email || !this.password || !this.confirmPassword) {
      alert('Por favor, completa todos los campos');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const nuevoUsuario = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    this.usuarioService.crearUsuario(nuevoUsuario).subscribe(response => {
      alert('Usuario registrado con éxito');
      this.router.navigate(['/login']);
    }, error => {
      alert('Error al registrar el usuario');
      console.error(error);
    });
  }

  irALogin() {
    this.router.navigate(['/login']);
  }
}
