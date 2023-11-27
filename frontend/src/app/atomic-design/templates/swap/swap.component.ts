import { Component } from '@angular/core';

@Component({
  selector: 'app-swap',
  templateUrl: './swap.component.html',
  styleUrls: ['./swap.component.scss'],
})
export class SwapComponent {
  public specificAuthor = '';

  authorName(name: string) {
    this.specificAuthor = name;
  }
}
