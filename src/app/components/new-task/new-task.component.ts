import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../create-task/create-task.component';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss',
})
export class NewTaskComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(CreateTaskComponent);
  }
}
