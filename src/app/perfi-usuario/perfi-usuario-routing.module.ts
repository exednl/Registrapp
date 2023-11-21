import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfiUsuarioPage } from './perfi-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: PerfiUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfiUsuarioPageRoutingModule {}
