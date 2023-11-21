import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-home-alumno',
  templateUrl: './home-alumno.page.html',
  styleUrls: ['./home-alumno.page.scss'],
})
export class HomeAlumnoPage {
  public code!: string;
  public asistenciaData: any = null; // Inicializa asistenciaData

  constructor(
    private alertController: AlertController,
    private router: Router,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  async scanCode() {
    // Comprueba permisos de la cámara
    await BarcodeScanner.requestPermissions();

    // Comprueba si el escáner de códigos de barras de Google ML Kit está disponible
    await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable().then(async (data) => {
      if (data.available) {
        // Inicia el escáner de códigos de barras
        await this.startScanner().then(async (barcodes) => {
          this.code = barcodes[0].rawValue;
          await this.scan();
        });
      } else {
        // Instala el escáner de códigos de barras de Google ML Kit
        await BarcodeScanner.installGoogleBarcodeScannerModule().then(async () => {
          await this.startScanner().then(async (barcodes) => {
            this.code = barcodes[0].rawValue;
            await this.scan();
          });
        });
      }
    });
  }

  async startScanner() {
    const { barcodes } = await BarcodeScanner.scan({
      formats: [BarcodeFormat.QrCode],
    });
    return barcodes;
  }

  async scan() {
    // Obtén la referencia a la colección "asistencias" en Firestore
    const asistenciasCollection = this.firestore.collection('asistencias');

    // Obtiene el usuario actual
    const user = await this.afAuth.currentUser;

    if (user) {
      // Obtén datos adicionales del usuario desde la colección 'users'
      const userDocRef = this.firestore.collection('users').doc(user.uid);
      const userDoc = await userDocRef.get().toPromise();

      // Verifica si el documento existe antes de acceder a sus datos
      if (userDoc.exists) {
        const userData = userDoc.data() as any; // Ajusta según la estructura de tu colección 'users'

        // Utiliza datos específicos del usuario, ajusta según tu estructura de datos
        const userEmail = userData.emailPersonal || 'Correo por defecto';
        const userNombre = userData.nombre || 'Nombre por defecto';
        const userTelefono = userData.telefono || 'Teléfono por defecto';

        // Crea un objeto con los datos del usuario y otros detalles como la fecha y la hora
        this.asistenciaData = {
          correo: userEmail,
          nombre: userNombre,
          telefono: userTelefono,
          codigo: this.code,
          fechaHora: new Date().toISOString(),
        };

        console.log('Datos de asistencia:', this.asistenciaData); // Muestra los datos en la consola

        // Guarda los datos en la colección "asistencias" en Firestore
        try {
          await asistenciasCollection.add(this.asistenciaData);
          console.log('Datos de asistencia guardados en Firestore');

          // Navega a la página después de que los datos se hayan almacenado correctamente
          this.router.navigate(['/asistencia']);
        } catch (error) {
          console.error('Error al guardar datos de asistencia:', error);
        }
      }
    }
  }

  async ngOnInit() {
    const alert = await this.alertController.create({
      subHeader: 'Bienvenido Alumn@!',
      message: '¡Hola!',
      buttons: ['Aceptar'],
    });

    await alert.present();
    return;
  }
}
