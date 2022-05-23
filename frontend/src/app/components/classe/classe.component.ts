import { Component, OnInit, OnChanges } from '@angular/core';
import * as $ from 'jquery';
import {ClasseService} from './../../services/classe.service';
import { Router,ActivatedRoute,Params} from '@angular/router';
import { Classe } from 'src/app/models/classe';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.css'],
  providers: [ClasseService]
})
export class ClasseComponent implements OnInit  {
  public parallaxImage: string;
  public classe: Classe;

  constructor(
    private clser: ClasseService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.parallaxImage = 'url("../../../assets/images/classes-vit.jpg")';
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.clser.getClasseById(params.id).subscribe(
        response => {
          if(response.status === 'done'){
            const {name, group, unit, photo, progress, teacher} = response;
            this.classe = new Classe(params.id, name, unit, group, photo, progress, teacher, false);
            this.parallaxImage = 'url("' + Global.url + 'get-photo/' + photo + '")';
          }
        },
        error => {
          console.log(error);
        });
      });
    
    

    $('.field-box input').on('focus', function() {
      $(this).addClass('focus');
    });
    $('.field-box input').on('blur', function() {
      if ($(this).val() === '') {
        $(this).removeClass('focus');
      }
    });
  }
}
