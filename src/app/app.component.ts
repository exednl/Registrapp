import { Component } from '@angular/core';


interface Componente{
  name:string;
  icon:string;
  redirecTo: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  componentes : Componente[]=[
    {
      name:'Login Alumno',
      icon: 'accessibility-outline',
      redirecTo:'/inicio'   
    },
    {
      name:'Registrarse | Alumno',
      icon: 'person-add-outline',
      redirecTo:'/registro-usuario'   
    },
    
    
    {
      name:'About Us ',
      icon:'happy-outline',
      redirecTo:'/about'   
    },


    


    
    







  ]
  constructor() {}
}
