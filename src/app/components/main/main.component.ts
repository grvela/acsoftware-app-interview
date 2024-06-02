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
import { TaskService } from '../../services/task.service';
import { Observable, tap, catchError, of } from 'rxjs';

interface TodoItem {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  position: number;
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
  sections: todoItemI[] = [];

  constructor(private taskService: TaskService){}

  ngOnInit(){
    this.taskService.getAllLists().pipe(
      tap(response => {
        console.log(response);
        this.sections = response;
      }),
      catchError(error => {
        return of(null);
      })
    ).subscribe();
  }

  dropEvent(event: CdkDragDrop<TodoItem[]>) {
    const fromList = event.previousContainer.data; 
    const toList = event.container.data; 
    const status = this.getStatusFromIndex(event.container.id); 
  
    if (event.previousContainer === event.container) {
      moveItemInArray(toList, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(fromList, toList, event.previousIndex, event.currentIndex);
      toList.forEach(item => item.status = status);
    }
  
    fromList.forEach((item, index) => {
      item.position = index;
      this.taskService.updatePosition(item.id, index, item.status).subscribe();
    });
  
    toList.forEach((item, index) => {
      item.position = index;
      this.taskService.updatePosition(item.id, index, item.status).subscribe();
    });
  }
  
  getStatusFromIndex(containerId: string): string {
    switch (containerId) {
      case 'cdk-drop-list-0':
        return 'to-do';
      case 'cdk-drop-list-1':
        return 'in-progress';
      case 'cdk-drop-list-2':
        return 'done';
      default:
        return ''; 
    }
  }
}