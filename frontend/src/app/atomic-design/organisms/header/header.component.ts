import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public name: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const userName = localStorage.getItem('userName')!;
    if (userName !== null) {
      this.name = userName;
    }
  }

  public logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);
  }
}
