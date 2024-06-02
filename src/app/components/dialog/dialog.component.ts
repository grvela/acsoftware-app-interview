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
import { MatGridListModule } from '@angular/material/grid-list';
import { TaskService } from '../../services/task.service';

interface TodoItem {
  id: number;
  title: string;
  description: string;
  priority: string;
  createdAt: Date;
  updatedAt: Date;
}

interface TaskPriority {
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
    MatGridListModule,
  ],
})
export class ItemDialog {
  selectedValue: string | undefined;

  priorities: TaskPriority[] = [
    { value: 'high', viewValue: 'High' },
    { value: 'medium', viewValue: 'Medium' },
    { value: 'low', viewValue: 'low' },
  ];

  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<ItemDialog>,
    @Inject(MAT_DIALOG_DATA) public data: TodoItem
  ) {}


  onDelete(){
    this.taskService.deleteTask(this.data.id).subscribe();
    window.location.reload();
  }

  onSave(){
    this.taskService.updateTask(this.data.id, this.data.title, this.data.description, this.data.priority).subscribe();
    window.location.reload();
  }


}
