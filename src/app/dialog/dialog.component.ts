import { Component, Inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

interface TodoItem {
  id: number;
  title: string;
  description: string;
  priority: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'item-dialog',
  templateUrl: 'dialog.component.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
})
export class ItemDialog {
  selectedValue: string | undefined;

  priorities: Food[] = [
    { value: 'high', viewValue: 'High' },
    { value: 'in-progress', viewValue: 'In Progress' },
    { value: 'to-do', viewValue: 'To do' },
  ];

  constructor(
    public dialogRef: MatDialogRef<ItemDialog>,
    @Inject(MAT_DIALOG_DATA) public data: TodoItem
  ) {
    this.selectedValue = data.priority;
  }
}
