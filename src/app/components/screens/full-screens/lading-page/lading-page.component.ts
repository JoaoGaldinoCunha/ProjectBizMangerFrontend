import { Component } from '@angular/core';

import { FooterComponent } from '../../landing-page/footer/footer.component';
import { ConteinerHistoryAndObejectiveComponent } from '../../../common/conteiner-history-and-obejective/conteiner-history-and-obejective.component';
import { ValuesComponent } from '../../landing-page/values/values.component';
import { InformativeComponent } from '../../landing-page/informative/informative.component';
import { HomeComponent } from '../../landing-page/home/home.component';
import { HeaderComponent } from '../../landing-page/header/header.component';
FooterComponent
@Component({
  selector: 'app-lading-page',
  imports: [HeaderComponent,HomeComponent,ValuesComponent,InformativeComponent,ConteinerHistoryAndObejectiveComponent,FooterComponent],
  templateUrl: './lading-page.component.html',
  styleUrl: './lading-page.component.css'
})
export class LadingPageComponent {

}
