import { EventApi } from '@fullcalendar/core';

export enum TaskType {
  MEETING = 'Meeting',
  CALL = 'Call',
  OUT = 'Out of office',
}

export class Event {
  id: string = '';
  title: string = '';
  description: string = '';
  date: Date = new Date();
  startTime: Date = new Date();
  endTime: Date = new Date();
  allDay: boolean = true;
  type: TaskType = TaskType.MEETING;
}