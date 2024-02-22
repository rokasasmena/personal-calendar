import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; // Import FormGroup and FormControl
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskType } from '../models/event';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss'],
})
export class EventDialogComponent {
  eventForm: FormGroup;
  taskTypes = TaskType;

  constructor(
    public dialogRef: MatDialogRef<EventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.eventForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      description: new FormControl('', [Validators.maxLength(255)]),
      type: new FormControl('', Validators.required),
      startTime: new FormControl(null),
      endTime: new FormControl(null),
    });
  }

  formatDate(date: string): string {
    return new Date(date).toISOString().substring(0, 10);
  }

  onSave(): void {
    const result = this.eventForm.value;
    this.dialogRef.close(result);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  getTaskTypeValues(): string[] {
    return Object.values(this.taskTypes);
  }
}
