import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { ItemComponent } from '../item/item.component';

interface TodoItem {
  id: number;
  title: string;
  description: string;
  priority: string;
  createdAt: Date;
  updatedAt: Date;
}

interface todoItemI {
  title: string;
  items: TodoItem[];
}

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ItemComponent, CdkDropListGroup, CdkDropList, CdkDrag],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  sections: todoItemI[] = [
    {
      title: 'TO DO',
      items: [
        {
          id: 1,
          title: 'Task Title 1',
          description: 'Task Description',
          priority: 'high',
          updatedAt: new Date('2023-05-30T10:00:00Z'),
          createdAt: new Date('2023-05-30T12:00:00Z'),
        },
        {
          id: 1,
          title: 'Task Title 5',
          description: 'Task Description',
          priority: 'low',
          updatedAt: new Date('2023-05-30T10:00:00Z'),
          createdAt: new Date('2023-05-30T12:00:00Z'),
        },
      ],
    },
    {
      title: 'IN PROGRESS',
      items: [
        {
          id: 1,
          title: 'Task Title 2',
          description: 'Task Description',
          priority: 'medium',
          updatedAt: new Date('2023-05-30T10:00:00Z'),
          createdAt: new Date('2023-05-30T12:00:00Z'),
        },
        {
          id: 1,
          title: 'Task Title 4',
          description: 'Task Description',
          priority: 'high',
          updatedAt: new Date('2023-05-30T10:00:00Z'),
          createdAt: new Date('2023-05-30T12:00:00Z'),
        },
        {
          id: 1,
          title: 'Task Title 6',
          description: 'Task Description',
          priority: 'low',
          updatedAt: new Date('2023-05-30T10:00:00Z'),
          createdAt: new Date('2023-05-30T12:00:00Z'),
        },
      ],
    },
    {
      title: 'DONE',
      items: [
        {
          id: 1,
          title: 'Task Title 3',
          description: 'Task Description',
          priority: 'medium',
          updatedAt: new Date('2023-05-30T10:00:00Z'),
          createdAt: new Date('2023-05-30T12:00:00Z'),
        },
      ],
    },
  ];

  drop(event: CdkDragDrop<TodoItem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
