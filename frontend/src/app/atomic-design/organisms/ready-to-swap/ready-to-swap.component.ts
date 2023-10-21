import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookServices } from 'src/app/store/services/book.services';

@Component({
  selector: 'app-ready-to-swap',
  templateUrl: './ready-to-swap.component.html',
  styleUrls: ['./ready-to-swap.component.scss'],
})
export class ReadyToSwapComponent {
  public userBooks: any[] = [];
  
  constructor(private bookService: BookServices, private router: Router) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.bookService.getUserBooks({ id: userId }).subscribe((data: any[]) => {
        this.userBooks = data;
        console.log(data);
      });
    }
  }
}
