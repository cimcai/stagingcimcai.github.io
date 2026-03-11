export interface ScheduleEntry {
  title: string
  speaker: string
  abstract?: string
}

export interface ScheduleRow {
  time: string
  rowType: "keynote" | "paper" | "lightning" | "discussion" | "break"
  content?: string
  activityLabel?: string
  title?: string
  speaker?: string
  abstract?: string
  entries?: ScheduleEntry[]
}

export interface ScheduleSession {
  title: string
  rows: ScheduleRow[]
}

export interface ScheduleDay {
  label: string
  sessions: ScheduleSession[]
}
