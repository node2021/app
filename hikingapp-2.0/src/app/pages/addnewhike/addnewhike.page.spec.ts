import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddnewhikePage } from './addnewhike.page';

describe('AddnewhikePage', () => {
  let component: AddnewhikePage;
  let fixture: ComponentFixture<AddnewhikePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnewhikePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();
 
    fixture = TestBed.createComponent(AddnewhikePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
