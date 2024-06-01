import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ItemDialog } from '../dialog/dialog.component';
import { NgClass } from '@angular/common';

interface TodoItem {
  id: number;
  title: string;
  description: string;
  priority: string;
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [MatButtonModule, NgClass],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
})
export class ItemComponent {
  @Input() item: TodoItem = {
    id: 0,
    title: '',
    description: '',
    priority: '',
    createdAt: new Date('2023-05-30T10:00:00Z'),
    updatedAt: new Date('2023-05-30T10:00:00Z'),
  };

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(ItemDialog, {
      data: this.item,
    });
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'high':
        return 'high-priority';
      case 'medium':
        return 'medium-priority';
      case 'low':
        return 'low-priority';
      default:
        return '';
    }
  }
}
