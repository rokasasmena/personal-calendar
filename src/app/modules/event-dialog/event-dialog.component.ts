import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
      startTime: new FormControl(null, Validators.required),
      endTime: new FormControl(null, Validators.required),
    });

    this.eventForm
      .get('startTime')
      ?.valueChanges.subscribe((startTime: Date) => {
        const endDateControl = this.eventForm.get('endTime');
        if (endDateControl && startTime) {
          endDateControl.enable();
          const currentEndDate = endDateControl.value;
          if (currentEndDate && currentEndDate < startTime) {
            endDateControl.setValue(null);
          }
        }
      });
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
