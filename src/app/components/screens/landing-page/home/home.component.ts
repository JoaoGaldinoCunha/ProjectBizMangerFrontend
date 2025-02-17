import { Component } from '@angular/core';
import { ButtonComponent } from '../../../common/button/button.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

constructor(private router: Router) {}
  RedirectToRegistry() {
    this.router.navigate(['/register']);
  }
}
