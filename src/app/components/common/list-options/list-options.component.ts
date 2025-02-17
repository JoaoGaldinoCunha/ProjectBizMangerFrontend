import { Component,OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/login/login.service';
@Component({
  selector: 'app-list-options',
  imports: [RouterLink,CommonModule],
  templateUrl: './list-options.component.html',
  styleUrls: ['./list-options.component.css'] 
})
export class ListOptionsComponent  {
  tipoUsuario: string ;  
  cookieService: any;


  constructor(private loginService: LoginService) {
    this.tipoUsuario = this.loginService.role || this.cookieService.get('role');
  }



}
