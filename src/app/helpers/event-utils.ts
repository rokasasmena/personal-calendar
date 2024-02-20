import { EventInput } from '@fullcalendar/core';
import { TaskType, Event } from '../modules/models/event';

let eventGuid = 0;
const TODAY = new Date();
const TOMORROW = new Date(TODAY);
TOMORROW.setDate(TOMORROW.getDate() + 1);

function convertToEventInput(event: Event): EventInput {
  return {
    id: event.id,
    title: event.title,
    start: event.date,
    end: event.date,
    allDay: true,
  };
}

export const INITIAL_EVENTS: EventInput[] = [
  convertToEventInput({
    id: createEventId(),
    title: 'All-day event',
    date: TODAY,
    startTime: TODAY,
    endTime: TODAY,
    type: TaskType.MEETING,
    description: '',
  }),
  convertToEventInput({
    id: createEventId(),
    title: 'All-day event',
    date: TOMORROW,
    startTime: TOMORROW,
    endTime: TOMORROW,
    type: TaskType.MEETING,
    description: '',
  }),
];

export function createEventId() {
  return String(eventGuid++);
}
