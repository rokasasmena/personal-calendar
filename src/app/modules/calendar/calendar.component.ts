import { Component, signal, ChangeDetectorRef, OnInit } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import {
  INITIAL_EVENTS,
  createEventId,
  MyEventInput,
} from 'src/app/helpers/event-utils';
import { Store } from '@ngrx/store';
import { addEvent, deleteEvent } from '../../actions/event.actions';
import { MatDialog } from '@angular/material/dialog';
import { EventDialogComponent } from '../event-dialog/event-dialog.component';
import { TaskType } from '../models/event';
import { eventTypeColors } from 'src/app/helpers/event-colors';
import { Event } from '../models/event';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  calendarVisible = signal(true);
  calendarOptions = signal<CalendarOptions>({
    firstDay: 1,
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS,
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  });
  currentEvents = signal<MyEventInput[]>([]);
  sidebarVisible = false;
  clickedEvent: EventApi | null = null;
  selectedEvent: Event = new Event();

  constructor(
    private changeDetector: ChangeDetectorRef,
    private store: Store,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.sidebarVisible = false;
    console.log('this.sidebarVisible', this.sidebarVisible);
  }

  toggleSidebar(eventId: string) {
    console.log('Clicked event ID:', eventId);
    this.sidebarVisible = true;
    this.changeDetector.detectChanges();
  }

  getSortedEvents(): MyEventInput[] {
    return this.currentEvents().sort((a, b) => {
      return (
        new Date(a['startTime']).getTime() - new Date(b['startTime']).getTime()
      );
    });
  }

  closeSidebar() {
    this.sidebarVisible = false;
  }

  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle() {
    this.calendarOptions.update((options) => ({
      ...options,
      weekends: !options.weekends,
    }));
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const dialogRef = this.dialog.open(EventDialogComponent, {
      width: '630px',
      data: { event: selectInfo },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const eventType = result.type as TaskType;
        const backgroundColor = eventTypeColors[eventType];

        const eventData = {
          id: createEventId(),
          title: result.title,
          description: result.description,
          type: eventType,
          startTime: result.startTime,
          endTime: result.endTime,
          allDay: selectInfo.allDay,
          backgroundColor: backgroundColor,
        };

        console.log('New event data:', eventData);

        this.store.dispatch(addEvent({ event: eventData }));

        selectInfo.view.calendar.addEvent({
          id: eventData.id,
          title: eventData.title,
          description: eventData.description,
          type: eventData.type,
          start: eventData.startTime,
          end: eventData.endTime,
          allDay: eventData.allDay,
          backgroundColor: eventData.backgroundColor,
        });
      }
    });
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.clickedEvent = clickInfo.event;
    const eventApi = clickInfo.event;
    this.selectedEvent = {
      id: eventApi.id,
      title: eventApi.title,
      description: eventApi.extendedProps['description'],
      date: new Date(eventApi.startStr),
      startTime: new Date(eventApi.startStr),
      endTime: new Date(eventApi.endStr),
      allDay: eventApi.allDay,
      type: eventApi.extendedProps['type'],
    };
    console.log(this.selectedEvent);
    this.sidebarVisible = true;
  }

  deleteEvent() {
    if (!this.clickedEvent) {
      console.error('Clicked event or its title is undefined');
      return;
    }

    if (
      confirm(
        `Are you sure you want to delete the event '${this.clickedEvent.title}'`
      )
    ) {
      console.log('Event ID to delete:', this.clickedEvent.id);

      this.clickedEvent.remove();
      this.store.dispatch(deleteEvent({ eventId: this.clickedEvent.id }));
      this.sidebarVisible = false;
    }
  }

  handleEvents(events: EventApi[]) {
    console.log(events);
    setTimeout(() => {
      const convertedEvents: MyEventInput[] = events.map((event) => ({
        id: event.id,
        title: event.title,
        startTime: event.start ? event.start.toISOString() : '',
        end: event.end ? event.end.toISOString() : '',
        allDay: event.allDay,
        description: event.extendedProps
          ? event.extendedProps['description'] || ''
          : '',
        type: event.extendedProps ? event.extendedProps['type'] || '' : '',
      }));
      this.currentEvents.set(convertedEvents);
    });
  }
}
