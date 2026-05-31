import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Itood } from 'src/app/model/todo';
import { TodoService } from 'src/app/service/todo.service';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

todoArr:Array<Itood>=[]
  constructor(
    private _todoservice:TodoService,
  private _matdialog:MatDialog,
  private _snackbar:SnackbarService
  ) { }
  ngOnInit(): void {
      this._todoservice.fetchTodos()
      .subscribe({
        next:data=>{
          this.todoArr=data
        },
        error:err=>{
          console.log(err);
        }
      })
  }
  trackByfun(index:number,item:Itood){
    return item.Todoid
  }
  OnRemoveTodo(remove:string){
    let matconfig=new MatDialogConfig()
    matconfig.width='400px',
    matconfig.disableClose=true,
    matconfig.data=`Are you sure do you want ot remove this todo`
    let newconfig=this._matdialog.open(GetConfirmComponent,matconfig)
    newconfig.afterClosed()
    .subscribe(res=>{
      if(res){
      this._todoservice.onremoveTodo(remove)
      .subscribe({
       next:res=>{
        this._snackbar.openSnackBar(res.msg)
       },
       error:err=>{
        this._snackbar.openSnackBar(err)
       }
      })
      }
    })
  }

  OnEditTodo(edittodo:Itood){
   this._todoservice.editTodosub$.next(edittodo)
  }

}
