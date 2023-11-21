// authentication.service.ts

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private ngFireAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  async registerUser(email: string, password: string, additionalData: any) {
    try {
      const userCredential = await this.ngFireAuth.createUserWithEmailAndPassword(email, password);
      const userId = userCredential.user.uid;

      // Almacena los datos adicionales del usuario en Firestore
      await this.firestore.collection('users').doc(userId).set({
        nombre: additionalData.nombre,
        emailPersonal: additionalData.emailPersonal,
        telefono: additionalData.telefono,
      });

      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  async loginUser(email: string, password: string) {
    try {
      const userCredential = await this.ngFireAuth.signInWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(email: string) {
    try {
      return await this.ngFireAuth.sendPasswordResetEmail(email);
    } catch (error) {
      throw error;
    }
  }

  async signOut() {
    try {
      return await this.ngFireAuth.signOut();
    } catch (error) {
      throw error;
    }
  }

  async getProfile() {
    try {
      return await this.ngFireAuth.currentUser;
    } catch (error) {
      throw error;
    }
  }
}
