import { EventInput } from '@fullcalendar/core';
import { TaskType, Event } from '../modules/models/event';
import { eventTypeColors } from './event-colors';

interface MyEventInput extends EventInput {
  description: string;
  type: string;
}

let eventGuid = 0;
const TODAY = new Date();
const TOMORROW = new Date(TODAY);
TOMORROW.setDate(TOMORROW.getDate() + 1);
const THIRD_DAY = new Date(TOMORROW);
THIRD_DAY.setDate(TOMORROW.getDate() + 2);

const UX_UI_START_DATE = new Date('2024-02-26');
const BUSINESS_TRIP_START_DATE = new Date('2024-02-05');
const BUSINESS_TRIP_END_DATE = new Date('2024-02-08');

function convertToEventInput(event: Event): MyEventInput {
  const backgroundColor = eventTypeColors[event.type];

  return {
    id: event.id,
    title: event.title,
    description: event.description,
    type: event.type,
    start: event.startTime,
    end: event.endTime,
    allDay: event.allDay,
    backgroundColor: backgroundColor,
  };
}

export const INITIAL_EVENTS: MyEventInput[] = [
  convertToEventInput({
    id: createEventId(),
    title: 'Refinement session',
    date: TODAY,
    startTime: TODAY,
    endTime: TODAY,
    type: TaskType.CALL,
    description: 'Meeting: refinement session',
    allDay: true,
  }),
  convertToEventInput({
    id: createEventId(),
    title: 'UX/UI update/review session',
    date: UX_UI_START_DATE,
    startTime: UX_UI_START_DATE,
    endTime: THIRD_DAY,
    type: TaskType.MEETING,
    description: 'Meeting: UX/UI update/review session',
    allDay: true,
  }),
  convertToEventInput({
    id: createEventId(),
    title: 'Business trip',
    date: BUSINESS_TRIP_START_DATE,
    startTime: BUSINESS_TRIP_START_DATE,
    endTime: BUSINESS_TRIP_END_DATE,
    type: TaskType.OUT,
    description: 'Business trip: Sweden',
    allDay: true,
  }),
];

export function createEventId() {
  return String(eventGuid++);
}

export { MyEventInput };
