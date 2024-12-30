import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; // Optional, depending on your needs


@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule,         // Add MatDialogModule here
    MatButtonModule,         // If you're using buttons in the dialog
    MatIconModule,  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close(false); // Close with false if user clicks 'No'
  }

  onYesClick(): void {
    this.dialogRef.close(true); // Close with true if user clicks 'Yes'
  }

}
