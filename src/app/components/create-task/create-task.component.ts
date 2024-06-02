import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {
  MatDialogActions,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../../services/task.service';

interface TaskPriority {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogActions,
  ],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
})
export class CreateTaskComponent {
  title: string = '';
  description: string = '';
  selectedPriority: string = '';

  priorities: TaskPriority[] = [
    { value: 'high', viewValue: 'High' },
    { value: 'medium', viewValue: 'Medium' },
    { value: 'low', viewValue: 'Low' },
  ];

  constructor(public dialog: MatDialogRef<string>, private authService: TaskService) {}

  onCreate() {
    const task = {
      title: this.title,
      description: this.description,
      priority: this.selectedPriority
    };

    this.authService.createTask(task).subscribe();

    this.dialog.close(task);

    window.location.reload();
  }
}
