# PersonalCalendar

## Overview

This document provides an overview of the features, requirements, and implementation details of the Calendar Application. The Calendar Application is designed to manage events, allowing users to add, view, and delete events with ease. It provides a user-friendly interface for scheduling and organizing events efficiently.

## Features

Event Properties:
Title: A string field (required, max length 50) representing the title of the event.
Date: A date field (required) indicating the date of the event.
Start Time: A time field (required) representing the start time of the event.
End Time: A time field (required) indicating the end time of the event. It must be later than the start time.
Type: A dropdown field (required) with values [‘Meeting’, ‘Call’, ‘Out of office’], indicating the type of the event.
Description: A string field (optional) providing additional information about the event.

## Functionality

Add New Event: Allows users to add a new event with the specified properties.
Delete Event: Enables users to delete an existing event, displaying a confirmation popup for confirmation.
Layout: Provides a layout where the month view occupies approximately 2/3 of the screen on the left side, while the create/details view is on the right and visible only when required.

## Month View

Displays days for the current month.
Includes week day labels at the top, with the week starting on Monday.
Each day displays events for that day, showing the title and color-coded by event type.
Clicking on an event displays details for it in the details view.

## Create View

Displays all fields related to the event with required validations and validation messages.

## Details View

Displays read-only fields related to the event.
Includes a delete button for deleting the event.

## Unit Tests

Includes unit tests to ensure the functionality of the application.
NgRx State Management
Utilizes NgRx for global state management, prefilling the store with some test data.
Implementation
The Calendar Application is implemented using Angular framework, leveraging NgRx for state management. The application consists of components for the calendar, event creation, event details, and the main application layout. NgRx store is used to manage the application state, including events and their properties.

## Setup Instructions

To set up the Calendar Application, follow these steps:
Clone the repository from GitHub.
Install dependencies using npm or yarn.
Run the application using ng serve command.
Access the application through the provided URL.

## Dependencies

The Calendar Application relies on the following dependencies:

## Angular: Front-end framework for building web applications.

NgRx: State management library for Angular applications.
FullCalendar: JavaScript library for displaying interactive calendarsF.

## Usage

Users can navigate through the calendar to view events, add new events, and delete existing events. They can click on specific dates or events to view more details or perform actions such as editing or deleting events.

## Contributors

This application was developed by Rokas Ašmena.

## Contact

For any inquiries or support, please contact rokasasmena@gmail.com.
