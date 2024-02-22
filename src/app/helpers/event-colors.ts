import { TaskType } from '../modules/models/event';

export const eventTypeColors: Record<TaskType, string> = {
  [TaskType.MEETING]: '#1b85b8',
  [TaskType.CALL]: '#559e83',
  [TaskType.OUT]: '#8478bf',
};