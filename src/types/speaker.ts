export interface SpeakerLink {
  label?: string
  url: string
}

export interface Speaker {
  name: string
  image?: string
  links?: SpeakerLink[]
  bio: string
  talkTitle?: string
  abstract?: string[]
}
