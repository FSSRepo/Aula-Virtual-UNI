import { Component, OnInit } from '@angular/core';
import {CoreService} from './../../services/core.service';
import { Router ,RouterEvent } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
    providers: [CoreService]
})
export class NavBarComponent implements OnInit {
  public logout_btn:boolean;

  constructor(
    private core: CoreService,
    private router: Router
  ) { this.logout_btn = false; }

  ngOnInit(): void {
    this.router.events.subscribe((e: RouterEvent) => {
      this.logout_btn = localStorage.getItem('login') === 'done';
   });
    
  }
 logout(){
    this.core.logout().subscribe(response => {
      if (response.status === 'done'){
        localStorage.removeItem('login');
        this.router.navigate(['/home']);
      }
      this.logout_btn = localStorage.getItem('login') === 'done';
    },
    error => {
      console.log('Error '+ error);
    });
  }
}
