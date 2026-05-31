import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private _snackbar:MatSnackBar
  ) { }

  openSnackBar(msg:string){
    this._snackbar.open(msg,"Close",{
     duration:1000,
     horizontalPosition:'start',
     verticalPosition:'top'
    })
  }
}
