import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-values',
  imports: [],
  templateUrl: './card-values.component.html',
  styleUrl: './card-values.component.css'
})
export class CardValuesComponent {
@Input() title:string=''
@Input() text:string=''
@Input() imagePath:string=''

}
