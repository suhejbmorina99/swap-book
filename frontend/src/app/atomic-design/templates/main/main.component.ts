import { Component, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  public redirectTo: boolean = false;

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  navigateTo() {
    if (this.redirectTo) {
      this.router.navigate(['swap']);
    } else {
      this.snackBar.open('Register new book, to be able to swap', undefined, {
        duration: 2000,
      });
    }
  }

  onRedirectToSwap(redirectTo: boolean) {
    this.redirectTo = redirectTo;
  }

  editBook() {
    this.router.navigate(['edit-book']);
  }

  ngOnInit() {}
}
