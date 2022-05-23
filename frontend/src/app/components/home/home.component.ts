import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { CoreService } from 'src/app/services/core.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [CoreService]
})
export class HomeComponent implements OnInit {
  public username: string;
  public password: string;
  public loginError: boolean;
  public loginMessage: string;
  public loginStudent: boolean;

  constructor(
    private core: CoreService,
    private router: Router
  ) {
    this.username = '';
    this.password = '';
    this.loginError = false;
    this.loginMessage = '';
    this.loginStudent = true;
  }

  ngOnInit(): void {
    $('.field-box input').on('focus', function() {
      $(this).addClass('focus');
    });
    $('.field-box input').on('blur', function() {
      if ($(this).val() === '') {
        $(this).removeClass('focus');
      }
    });
    if (localStorage.getItem('login') === 'done'){
      this.router.navigate(['/student']);
    }
  }

  choose(student){
    this.loginStudent = student;
    this.loginError = false;
  }

  login() {
    this.core.login(this.loginStudent, this.username, this.password).subscribe(response => {
      if (response.status === 'done'){
        localStorage.setItem('login', 'done');
        if (this.loginStudent){
          this.router.navigate(['/student']);
        } else {
          this.router.navigate(['/teacher']);
        }
      }
    },
    error => {
      if (error.status === 401){
        this.loginError = true;
        if (error.error.info.message === 'pwd_inv'){
          this.loginMessage = 'contraseña invalida';
        }else if (error.error.info.message === 'un_inv'){
          this.loginMessage = this.loginStudent ? '# carnet invalido' : 'Cedula invalida';
        }else{
          this.loginMessage = 'Introduzca sus datos correctamente!!';
        }
      }
    });
  }
}
