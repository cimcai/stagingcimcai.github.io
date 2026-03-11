export interface TeamMember {
  name: string
  job?: string
  description?: string
  institution?: string
  institutionUrl?: string
  linkedInUrl?: string
  xUrl?: string
  portraitUrl: string
}

export interface TeamGroup {
  teamName: string
  teamMembers: TeamMember[]
}

export interface ProfilesData {
  teams: TeamGroup[]
}
