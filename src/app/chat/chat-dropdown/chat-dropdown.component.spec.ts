import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatDropdownComponent } from './chat-dropdown.component';

describe('ChatDropdownComponent', () => {
  let component: ChatDropdownComponent;
  let fixture: ComponentFixture<ChatDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
