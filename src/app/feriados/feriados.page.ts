import { Component, OnInit } from '@angular/core';
import { FeriadosService } from '../services/feriados.service';
import { Data } from '../interfaces/interfaces'
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-feriados',
  templateUrl: './feriados.page.html',
  styleUrls: ['./feriados.page.scss'],
})
export class FeriadosPage implements OnInit {

  feriados: Data[] = [];

  constructor(private feriadosService: FeriadosService, private menuController: MenuController) {

   }

  ngOnInit() {
    this.feriadosService.obtenerFeriados().subscribe(resp => {
      console.log('feriados', resp);
      this.feriados.push(...resp.data);
    })
  }
  showMenu(){
    this.menuController.open('first')
  }
}
