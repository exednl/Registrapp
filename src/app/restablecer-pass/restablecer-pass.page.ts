import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-restablecer-pass',
  templateUrl: './restablecer-pass.page.html',
  styleUrls: ['./restablecer-pass.page.scss'],
})
export class RestablecerPassPage implements OnInit {

  restablecer = {
    email: ''
  };

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  restablecerContrasena() {
    const email = this.restablecer.email;
  
    this.afAuth.sendPasswordResetEmail(email)
      .then(() => {
        console.log('Correo de restablecimiento enviado correctamente');
        // Puedes redirigir al usuario a una página de éxito o mostrar un mensaje.
      })
      .catch((error) => {
        console.error('Error al enviar el correo de restablecimiento', error);
        // Puedes mostrar un mensaje de error al usuario.
      });
  }
}  
