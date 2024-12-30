import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  description?: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'In Progress' | 'Completed';
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

 
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos'; // Fake API URL
  private tasksSubject = new BehaviorSubject<Task[]>([]);

  constructor(private http: HttpClient) {
    this.loadTasks();
  }

  private loadTasks(): void {
    this.http
      .get<any[]>(this.apiUrl)
      .pipe(
        map((todos) =>
          todos.slice(0, 10).map((todo, index) => ({
            id: todo.id,
            title: todo.title,
            description: `Description for ${todo.title}`,
            priority: this.mapPriority(index),
            status: todo.completed ? ('Completed' as const) : ('Pending' as const),
          }))
        )
      )
      .subscribe((tasks) => {
        this.tasksSubject.next(tasks);
      });
  }

  // Map index to priority for demo purposes
  private mapPriority(index: number): 'Low' | 'Medium' | 'High' {
    const priorities: ('Low' | 'Medium' | 'High')[] = ['Low', 'Medium', 'High'];
    return priorities[index % 3];
  }

  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  addTask(task: Task): void {
    const currentTasks = this.tasksSubject.value;
    this.tasksSubject.next([...currentTasks, task]);
  }

  updateTask(updatedTask: Task): void {
    const currentTasks = this.tasksSubject.value;
    const taskIndex = currentTasks.findIndex(task => task.id === updatedTask.id);

    if (taskIndex > -1) {
      // Update the task at the found index
      currentTasks[taskIndex] = updatedTask;
      this.tasksSubject.next([...currentTasks]); // Emit updated task list
    }
  }

  deleteTask(taskId: number): void {
    const currentTasks = this.tasksSubject.value;
    const updatedTasks = currentTasks.filter(task => task.id !== taskId);
    this.tasksSubject.next(updatedTasks); // Emit updated task list after deletion
  }
}
