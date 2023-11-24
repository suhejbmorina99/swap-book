import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-swap',
  templateUrl: './swap.component.html',
  styleUrls: ['./swap.component.scss'],
})
export class SwapComponent {
  public specificAuthor = '';

  returnAuthortWP(name: string) {
    // console.log('1');
    // console.log(name);
    this.specificAuthor = name;
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log('ngOnChanges triggered');
  //   console.log('specificAuthor:', this.specificAuthor);
  //   console.log(this.specificAuthor);
  // }
}
