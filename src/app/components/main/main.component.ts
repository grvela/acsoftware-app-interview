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
      
    event.container.data.map((item, index) => {
      
    });
    console.log('Updated container data:', event.container.data);
    if (event.previousContainer !== event.container) {
      console.log('Updated previous container data:', event.previousContainer.data);
    }
  }
}