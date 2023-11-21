// perfil-usuario.page.ts

import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-perfi-usuario',
  templateUrl: './perfi-usuario.page.html',
  styleUrls: ['./perfi-usuario.page.scss'],
})
export class PerfiUsuarioPage implements OnInit {
  userData: any;
  showEditForm: boolean = false;
  newUserData: any = {};

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        // Recupera datos del usuario desde Firestore
        this.firestore.collection('users').doc(user.uid).valueChanges().subscribe((data) => {
          this.userData = data;
        });
      }
    });
  }

  openEditForm() {
    // Mostrar el formulario de edición
    this.showEditForm = true;

    // Inicializar el objeto de datos para la edición con los valores actuales
    this.newUserData = { ...this.userData };
  }

  saveChanges() {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        // Guardar los cambios en Firestore
        this.firestore.collection('users').doc(user.uid).update(this.newUserData);

        // Ocultar el formulario de edición
        this.showEditForm = false;
      }
    });
  }
}