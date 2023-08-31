import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCepMask]',
})
export class CepMaskDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = this.el.nativeElement as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');

    value.length <= 8
      ? (input.value = value.replace(/(\d{5})(\d{1,3})/, '$1-$2'))
      : (input.value = value.slice(0, 8).replace(/(\d{5})(\d{1,3})/, '$1-$2'));
  }
}

@Directive({
  selector: '[appComplementoMask]',
})
export class ComplementoMaskDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = this.el.nativeElement as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');

    value.length <= 3
      ? (input.value = value)
      : value.length <= 6
      ? (input.value = `${value.slice(0, 3)}.${value.slice(3)}`)
      : (input.value = `${value.slice(0, 3)}.${value.slice(3, 6)}`);
  }
}
