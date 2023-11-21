import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})



export class RegistroPage implements OnInit {
  

  constructor(private menuController: MenuController, private AlertController: AlertController) {  }



  showMenu(){
    this.menuController.open('second')
  }

  async ngOnInit(){

    let usuario = JSON.parse(localStorage.getItem('usuario')|| '[]')
    console.log(usuario)

    const alert = await this.AlertController.create({
      subHeader : 'Bievenid@ Docente!',
      message: '¡Hola! ' + usuario.nombre,
      buttons: ['Aceptar'],
    });

    await alert.present();
    return;







  }

  
  


}
