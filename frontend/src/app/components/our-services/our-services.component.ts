import { Component, OnInit } from '@angular/core';
import {OurService} from './our-serv';
@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.css']
})

export class OurServicesComponent implements OnInit {

  public services: OurService[];

  constructor() {
    this.services = [
      new OurService('fas fa-chalkboard', 'Asesoria', 'Comunicate con un profesor para resolver tus dudas.'),
      new OurService('fas fa-sticky-note', 'Notas', 'Mira tus calificaciones. Aumenta tu rendimiento'),
      new OurService('fas fa-address-card', 'Contactos', 'Tienes algun problema con la plataforma?')
    ];
  }

  ngOnInit(): void {
  }

}
