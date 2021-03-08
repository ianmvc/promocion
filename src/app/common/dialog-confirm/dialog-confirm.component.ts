import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../interface';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent{

  constructor(public dialogRef: MatDialogRef <DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    onNoClick(): void {
      this.dialogRef.close('Cancel');
    }

    onClick(): void {
      this.dialogRef.close('Ok');
    }
    
    dataSource: DialogData[] = [];

}
