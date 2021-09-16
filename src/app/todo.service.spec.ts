import { TodoService } from './todo.service';
import { TODOS } from './test-data/todo.db';
import { LoggerService } from './logger.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('test todo service', () => {

  let todoService: TodoService;
  let loggerSpy: any;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {

    loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        TodoService,
        { provide: LoggerService, useValue: loggerSpy }
      ]
    });

    todoService = TestBed.inject(TodoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  })

  it('add must to add a new task', () => {

    todoService.add({ autor: 'pruebaAutor', titulo: 'pruebaTitulo', descripcion: 'pruebaDescripcion' });

    expect(todoService.todos.length).toBe(1, 'must increasing todos.lenght');
    expect(todoService.todos[0].id).toBe(1, 'the first add must to be 1');
    expect(todoService.autoIncrementId).toBe(2, 'after add a new task the autoincrememtId must to be 1');
    expect(todoService.todos[0].titulo).toEqual('pruebaTitulo', 'the title must to equal titulo on this test');
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it('delete must to delete a task', () => {
    const todosDelete = [...TODOS];
    todoService.todos = todosDelete;

    todoService.delete(1);

    expect(todoService.todos.length).toBe(2, 'todos length must to be 2');
    expect(todoService.todos[1].autor).toEqual('Sara', 'the autor should equal Sara on this test');
  });

  it('should get back all task from http', () => {
    todoService.getAll().subscribe(todos => {
      expect(todos).toBeTruthy('there is not tasks');
      expect(todos.length).toBe(3, 'length should be 3');

      const todo = todos.find(item => item.id === 2);
      expect(todo.autor).toEqual('Laura', 'should be Laura');
    });

    const testRequest = httpTestingController.expectOne('http://localhost:3000/api/todos/all');

    // de esta forma se testea que en el método getAll se hace uso del método get
    expect(testRequest.request.method).toBe('GET', 'should used GET method');

    testRequest.flush(TODOS); // con flush se ponen los datos simulados que esperamos en la respuesta http

  });

  it('Should get back a single task', () => {
    todoService.getById(2).subscribe(todo => {
      expect(todo).toBeTruthy('task must exist');
      expect(todo.id).toBe(2, 'should be 2');
    });

    const testRequest = httpTestingController.expectOne('http://localhost:3000/api/todos/2');
    expect(testRequest.request.method).toBe('GET', 'should used GET method');
    testRequest.flush(TODOS[1]); // con flush se ponen los datos simulados que esperamos en la respuesta http

  });

  afterAll(() => {
    // Con esto se evita inconsistencias en las llamadas http como repetir peticiones u otros
    httpTestingController.verify();
  });

});
