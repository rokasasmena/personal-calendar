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
import { INITIAL_EVENTS, createEventId } from 'src/app/helpers/event-utils';
import { Store } from '@ngrx/store';
import { addEvent, deleteEvent } from '../../actions/event.actions';
import { MatDialog } from '@angular/material/dialog';
import { EventDialogComponent } from '../event-dialog/event-dialog.component';

interface DateClickArg {
  date: Date;
  dateStr: string;
  allDay: boolean;
}

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
  currentEvents = signal<EventApi[]>([]);
  sidebarVisible = false;
  clickedEvent: EventApi | null = null;

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

  closeSidebar() {
    this.sidebarVisible = false;
  }

  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle() {
    this.calendarOptions.mutate((options) => {
      options.weekends = !options.weekends;
    });
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const dialogRef = this.dialog.open(EventDialogComponent, {
      width: '400px',
      data: { event: selectInfo }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const eventData = {
          id: createEventId(),
          title: result,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
          description: '',
        };
  
        console.log('New event data:', eventData);
  
        this.store.dispatch(addEvent({ event: eventData }));
  
        selectInfo.view.calendar.addEvent({
          id: eventData.id,
          title: eventData.title,
          start: eventData.start,
          end: eventData.end,
          allDay: eventData.allDay,
        });
      }
    });
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.clickedEvent = clickInfo.event;
    this.sidebarVisible = true;
  }

  deleteEvent() {
    if (!this.clickedEvent || !this.clickedEvent.title) {
      console.error("Clicked event or its title is undefined");
      return;
    }

    if (
      confirm(
        `Are you sure you want to delete the event '${this.clickedEvent.title}'`
      )
    ) {
      console.log('Event ID to delete:', this.clickedEvent.id);

      this.store.dispatch(deleteEvent({ eventId: this.clickedEvent.id }));
      this.clickedEvent.remove();
      this.sidebarVisible = false;
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges();
  }
}
