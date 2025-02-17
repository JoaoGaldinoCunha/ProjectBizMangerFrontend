import { Component, input, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-conteiner-history-and-obejective',
  imports: [CommonModule],
  templateUrl: './conteiner-history-and-obejective.component.html',
  styleUrl: './conteiner-history-and-obejective.component.css'
})
export class ConteinerHistoryAndObejectiveComponent {
  @Input() title: string = '';
  @Input() text: string = '';
  @Input() pathImage: string = '';
  @Input() image_location: 'left' | 'right' = 'left';  
  @Input() backgroundColor:'white'|'grey'='white'
  @Input() padding:'min'|'avg'|'max'='avg'

}
