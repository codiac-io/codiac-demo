import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOverlayComponent } from './search-overlay.component';
import { FormsModule } from '@angular/forms';
import { pagesToggleService } from '../../services/toggler.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchOverlayComponent', () => {
  let component: SearchOverlayComponent;
  let fixture: ComponentFixture<SearchOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, NoopAnimationsModule],
      providers: [
        { provide: pagesToggleService, useClass: pagesToggleService }
      ],
      declarations: [SearchOverlayComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
