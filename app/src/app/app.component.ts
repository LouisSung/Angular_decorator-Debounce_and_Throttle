import { Component, HostListener } from '@angular/core';
import { debounce_or_throttle } from '../../decorator.debounce-throttle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @HostListener('window:resize', ['$event'])
  @debounce_or_throttle()
  onResize(event) {
    console.log('onResize: ', new Date().getSeconds(), 's', new Date().getMilliseconds(), 'ms');
  }
}
