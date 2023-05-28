import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

@NgModule({
  exports: [MatIconModule],
})
export class SbMaterialModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    const svgIconSetUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'assets/sb-icon-set.svg'
    );
    this.matIconRegistry.addSvgIconSetInNamespace('sb', svgIconSetUrl);
  }
}
