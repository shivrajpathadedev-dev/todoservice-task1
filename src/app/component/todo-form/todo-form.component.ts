import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Itood } from 'src/app/model/todo';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
isInEditMode:boolean=false
  editTodo!: Itood;
@ViewChild('toodform') toodform!:NgForm

  constructor(
    private  _snackbar:SnackbarService,
    private _todoservice:TodoService
  ) { }

  ngOnInit(): void {
    this.onEdittodo()
  }

  Ontodosubmit(){
    if(this.toodform.valid){
      let add_obj:Itood={
        ...this.toodform.value,
        Todoid:Date.now().toString()
      }
      this._todoservice.createaddtodo(add_obj)
      .subscribe({
        next:res=>{
          console.log(res);
          this.toodform.reset()
          this._snackbar.openSnackBar(`The Todo ${add_obj.TodoItem} is added successfully!!!`)
        },
        error:err=>{
          console.log(err); 
        }
      })
    }
  }
  onEdittodo(){
    this._todoservice.editTodosub$.subscribe({
      next:data=>{
        this.editTodo=data
        this.isInEditMode=true
        this.toodform.form.patchValue(data)
      }
    })
  }

 OnUpdateTodo(){
  if(this.toodform.valid){
    let upd_obj={
      ...this.toodform.value,
      Todoid:this.editTodo.Todoid
    }
    console.log(upd_obj);
    this._todoservice.updatetodo(upd_obj)
    .subscribe({
      next:data=>{
        this._snackbar.openSnackBar(data.msg)
                this.toodform.reset()
        this.isInEditMode=false
      },
      error:err=>{
        this._snackbar.openSnackBar(err)
      }
    })
  }
 }

}
