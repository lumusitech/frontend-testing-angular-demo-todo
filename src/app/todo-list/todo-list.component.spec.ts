import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { AppModule } from '../app.module';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { TODOS } from '../test-data/todo.db';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


describe('Todo list component', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let element: DebugElement;

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TodoListComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement;
      });
  }));


  it('should exist the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show a task list', () => {
    component.todos = TODOS;
    fixture.detectChanges();

    const cards = element.queryAll(By.css('.card'));

    expect(cards).toBeTruthy('cards cannot be retrieved');
    expect(cards.length).toBe(3, 'cards should be 3');
  });

  it('should show the first task', () => {
    component.todos = TODOS;
    fixture.detectChanges();
    const todo = TODOS[0];

    const card = element.query(By.css('.card:first-child'));
    const title = card.query(By.css('.card-title'));
    const description = card.query(By.css('.card-text'));

    console.log(title);

    expect(card).toBeTruthy('card should exist');
    expect(title.nativeElement.textContent).toEqual(todo.titulo, 'card title should be equal');
    expect(description.nativeElement.textContent).toEqual(todo.descripcion, 'card description should be equal');

  });

  afterAll(() => {

  });
});
