import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import{ MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [
    FormsModule,            // For ngModel
    MatDialogModule,        // For Material Dialog
    MatSelectModule,        // For <mat-select>
    MatOptionModule,        // For <mat-option>
    MatFormFieldModule,     // For Material form fields
    MatInputModule,         // For <input> and <textarea>
    MatButtonModule  
  ],
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.css'
})
export class TaskDialogComponent {
  task: Partial<Task>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Task | null) {
    this.task = data || { priority: 'Low', status: 'Pending' };
  }

  
}
