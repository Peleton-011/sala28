export interface UpcomingEvent {
  date: string
  time: string
  title: string
  topic: string
  city: string
  status: string
  statusKind: 'open' | 'full'
  speakers: string
  image?: string
}

export interface ArchivedEvent {
  num: string
  date: string
  title: string
  topic: string
  count: string
}

export interface Testimonial {
  quote: string
  name: string
  role: string
  avatar?: string
}

export interface Mentor {
  name: string
  role: string
  bio: string
  portrait?: string
}

export interface FAQItem {
  q: string
  a: string
}

export interface DiffRow {
  left: string
  right: string
}

export interface HowItWorksStep {
  n: string
  title: string
  desc: string
}
