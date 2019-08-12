import { ElementRef } from '@angular/core';
import { InputFormatDirective } from './input-format.directive';

describe('InputFormatDirective', () => {
    it('should create an instance', () => {
        const directive = new InputFormatDirective(new ElementRef(null));
        expect(directive).toBeTruthy();
    });
});
