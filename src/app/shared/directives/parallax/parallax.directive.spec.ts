import { ParallaxDirective } from './parallax.directive';
import { TestBed } from '@angular/core/testing';
import { Renderer2, ElementRef } from '@angular/core';

describe('ParallaxDirective', () => {
  let renderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Renderer2]
    });

    renderer = TestBed.get(Renderer2);
  });

  it('should create an instance', () => {
    const directive = new ParallaxDirective(new ElementRef('div'), renderer);
    expect(directive).toBeTruthy();
  });
});
