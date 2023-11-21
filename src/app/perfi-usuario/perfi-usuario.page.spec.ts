import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfiUsuarioPage } from './perfi-usuario.page';

describe('PerfiUsuarioPage', () => {
  let component: PerfiUsuarioPage;
  let fixture: ComponentFixture<PerfiUsuarioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PerfiUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
