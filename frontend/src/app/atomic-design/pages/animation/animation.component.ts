import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss'],
})
export class AnimationComponent {
  @ViewChild('alertPopupTitle', { static: true }) alertPopupTitle!: ElementRef;

  ngAfterViewInit() {
    setTimeout(() => {
      this.alertPopupTitle.nativeElement.innerText = 'Confirmed!';
    }, 500);
  }
}
