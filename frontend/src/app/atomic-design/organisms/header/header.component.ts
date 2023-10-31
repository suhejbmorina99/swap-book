import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public name: string = '';

  constructor() {}

  ngOnInit() {
    const userName = localStorage.getItem('userName')!;
    if (userName !== null) {
      this.name = userName;
    }
  }
}
