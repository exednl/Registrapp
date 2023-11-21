import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/authentication.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.page.html',
  styleUrls: ['./registro-usuario.page.scss'],
})
export class RegistroUsuarioPage implements OnInit {
  formReg: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public authService: AuthenticationService,
    public router: Router
  ) {}

  ngOnInit() {
    this.formReg = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      emailPersonal: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"),
        ],
      ],
    });
  }

  get errorControl() {
    return this.formReg?.controls;
  }

  async signUp() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    if (this.formReg?.valid) {
      try {
        // Registra al usuario con datos adicionales
        const user = await this.authService.registerUser(
          this.formReg.value.email,
          this.formReg.value.password,
          {
            nombre: this.formReg.value.nombre,
            emailPersonal: this.formReg.value.emailPersonal,
            telefono: this.formReg.value.telefono,
          }
        );

      
        loading.dismiss();
        this.router.navigate(['/inicio']); 
      } catch (error) {
        console.log(error);
        loading.dismiss();
      }
    }
  }
}
