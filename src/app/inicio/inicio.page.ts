import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/authentication.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  FormLogIn: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.FormLogIn = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async login() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    
    if (this.FormLogIn?.valid) {
      try {
        const user = await this.authService.loginUser(
          this.FormLogIn.value.email,
          this.FormLogIn.value.password
        );
        loading.dismiss();
        this.router.navigate(['/home-alumno']);
      } catch (error) {
        console.log(error);
        loading.dismiss();
      }
    }
  }
}
