import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { Hero } from '../../interface/hero.interface';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styles: [
  ]
})
export class ConfirmDialogComponent {
  constructor(public DialogRef:MatDialogRef<ConfirmDialogComponent>,
  @Inject(MAT_DIALOG_DATA)public data:Hero
  ){}

  onNoClick():void{
    this.DialogRef.close(false);
  }
  onConfirm():void{
    this.DialogRef.close(true);
  }

}
