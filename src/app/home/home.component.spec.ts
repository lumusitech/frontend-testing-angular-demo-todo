import { DebugElement } from "@angular/core";
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { AppModule } from "../app.module";
import { HomeComponent } from "./home.component";

fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let element: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    }).compileComponents().
      then(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement;
      });
  }));

  it('component should exist', () => {
    expect(component).toBeTruthy();
  });

  it('form should add a task', fakeAsync(() => {
    // fuerza la interfaz gráfica a que se actualice
    fixture.detectChanges();
    // Acelera el reloj en procesos que requieren más tiempo}
    // Se le puede pasar los milisegundos, si se deja vacío es 0 ms
    //tick();

    setInputValue('.form-control.autor', 'pruebaAutor');
    setInputValue('.form-control.titulo', 'pruebaTitulo');
    setInputValue('.form-control.descripcion', 'pruebaDescripcion');

    const buton = element.query(By.css('.btn.btn-success.btn-block'));
    buton.nativeElement.click();
    fixture.detectChanges();
    tick();

    const card = element.query(By.css('.card:first-child'));
    const titulo = card.query(By.css('.card-title'));
    const descripcion = card.query(By.css('.card-text'));
    const autor = card.query(By.css('.card-link'));

    expect(card).toBeTruthy('card should exist');
    expect(titulo.nativeElement.textContent).toEqual('pruebaTitulo');
    expect(descripcion.nativeElement.textContent).toEqual('pruebaDescripcion');
    expect(autor.nativeElement.textContent).toEqual('pruebaAutor');

    //////////////////////// Aux
    function setInputValue(selector: string, value: string) {
      fixture.detectChanges();
      tick();

      const inputSelected = element.query(By.css(selector));
      inputSelected.nativeElement.value = value;
      inputSelected.nativeElement.dispatchEvent(new Event('input'));
      tick();
    }
  }));

});
