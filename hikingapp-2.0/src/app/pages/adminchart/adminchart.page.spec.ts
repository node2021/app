import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminchartPage } from './adminchart.page';

describe('AdminchartPage', () => {
  let component: AdminchartPage;
  let fixture: ComponentFixture<AdminchartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminchartPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminchartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
