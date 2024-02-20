import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss']
})
export class EventDialogComponent {

  eventTitle: string;
  eventDescription: string;

  constructor(
    public dialogRef: MatDialogRef<EventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.eventTitle = data.title;
    this.eventDescription = data.description;
  }

  onSave(): void {
    this.dialogRef.close(this.eventTitle);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
