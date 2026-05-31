import { Injectable } from '@angular/core';
import { ItodoRes, Itood } from '../model/todo';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  editTodosub$:Subject<Itood>=new Subject()
TodoArr:Array<Itood>=[
  {
    TodoItem:'Angular',
    Todoid:'12'
  },
  {
    TodoItem:'Node.js',
    Todoid:'125'
  },
  {
    TodoItem:'Javascript',
    Todoid:'129'
  }
]
  constructor() { }

  fetchTodos():Observable<Itood[]>{
    return of(this.TodoArr)
  }

  createaddtodo(todo:Itood):Observable<ItodoRes>{
    this.TodoArr.push(todo)
    let res={
      msg:`new todo item ${todo.TodoItem} is added successfully!!!`,
      data:todo
    }
    return of(res)
  }

  onremoveTodo(removetodo:string){
    let get_index=this.TodoArr.findIndex(t=>t.Todoid===removetodo)
    let remove=this.TodoArr.splice(get_index,1)
    return of({
      msg:`The todo item ${remove[0].TodoItem} is removed successfully!!!`,
      data:remove[0]
    })
  }

  updatetodo(updatetodo:Itood):Observable<ItodoRes>{
    let get_index=this.TodoArr.findIndex(t=>t.Todoid===updatetodo.Todoid)
    this.TodoArr[get_index]=updatetodo
   
    return of({
      msg:`The todo ${updatetodo.TodoItem} is updated successfully!!!`,
      data:updatetodo
    })
  }
}
