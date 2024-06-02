import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

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

@Injectable({
    providedIn: 'root'
})
export class TaskService{
    private apiUrl = 'http://localhost:8000'

    constructor(private http: HttpClient){}

    createTask(task: any){
        return this.http.post(`${this.apiUrl}/task`, task)
    }

    getAllLists(){
        return this.http.get<todoItemI[]>(`${this.apiUrl}/task`);
    }

    updatePosition(task_id: number, position: number){
        return this.http.patch(`${this.apiUrl}/task/` + task_id, {
            "position": position
        })
    }

    updateTask(task_id: number, title: string, description: string, priority: string){
        return this.http.patch(`${this.apiUrl}/task/` + task_id, {title, description, priority});
    }

    deleteTask(task_id: number){
        return this.http.delete(`${this.apiUrl}/task/` + task_id)
    }
}