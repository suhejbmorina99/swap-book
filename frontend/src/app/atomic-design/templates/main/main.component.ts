import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  public redirectTo: boolean = false;

  constructor(private router: Router) {}

  navigateTo() {
    if (this.redirectTo) {
      this.router.navigate(['swap']);
    }
  }

  onRedirectToSwap(redirectTo: boolean) {
    this.redirectTo = redirectTo;
  }

  ngOnInit() {}
}
