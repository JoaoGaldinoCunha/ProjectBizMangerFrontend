import { Component } from '@angular/core';
import { ListOptionsComponent } from '../../../common/list-options/list-options.component';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-default-screen',
  imports: [ListOptionsComponent,RouterOutlet],
  templateUrl: './default-screen.component.html',
  styleUrl: './default-screen.component.css'
})
export class DefaultScreenComponent {
constructor(private cookieService:CookieService,private router:Router){

}

  logout() {
    this.cookieService.deleteAll();

    this.router.navigate(['/']);

    history.pushState(null, '', '/');
    window.addEventListener('popstate', () => {
      history.pushState(null, '', '/');
    });
  }
}
