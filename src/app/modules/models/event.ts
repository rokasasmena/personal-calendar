export enum TaskType {
  MEETING = 'Meeting',
  CALL = 'Call',
  OUT = 'Out of office',
}

export class Event {
  id: string = '';
  title: string = '';
  date: Date = new Date();
  startTime: Date = new Date();
  endTime: Date = new Date();
  type: TaskType = TaskType.MEETING;
  description: string = '';
}
