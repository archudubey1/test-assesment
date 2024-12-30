import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { Task, TaskService } from '../task.service';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { Task, TaskService } from '../../services/task.service';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [ MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit{
  tasks: Task[] = [];
  displayedColumns: string[] = ['title', 'description', 'priority', 'status', 'actions'];

  constructor(private taskService: TaskService, private dialog: MatDialog) {
   
  }

  ngOnInit(): void {
    this.loadTasks();
    
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      console.log(this.tasks)
      // console.log(this.dataSource[0]['title'])
    });
  }

  openTaskDialog(task?: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: task ? { ...task } : null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.id) {
          this.taskService.updateTask(result);
        } else {
          this.taskService.addTask(result);
        }
        this.ngOnInit(); 
      }
    });
  }

  deleteTask(taskId: number): void {
    console.log(taskId)
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.deleteTask(taskId);
        console.log(taskId)
        this.loadTasks(); 

      }
    });
  }

}
