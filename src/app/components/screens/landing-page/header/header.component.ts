import { Component } from '@angular/core';
import { ButtonComponent } from '../../../common/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  constructor(private router: Router) {}
  RedirectToRegistry() {
    this.router.navigate(['/register']);

  }
  RedirectToLogin() {
    this.router.navigate(['/login']);

  }
}
