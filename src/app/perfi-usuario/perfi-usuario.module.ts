import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfiUsuarioPageRoutingModule } from './perfi-usuario-routing.module';

import { PerfiUsuarioPage } from './perfi-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfiUsuarioPageRoutingModule
  ],
  declarations: [PerfiUsuarioPage]
})
export class PerfiUsuarioPageModule {}
