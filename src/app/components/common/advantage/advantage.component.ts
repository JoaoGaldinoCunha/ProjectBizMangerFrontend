import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-advantage',
  imports: [],
  templateUrl: './advantage.component.html',
  styleUrl: './advantage.component.css'
})
export class AdvantageComponent {
@Input() title:string=''
@Input() imagePath:string=''
}
