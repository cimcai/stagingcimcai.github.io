import styled from "styled-components"
import tw, { theme } from "twin.macro"
import Contact from "./Contact"

const TeamContainer = styled.div`
  ${tw`
      text-black
      bg-white
      selection:text-black
      selection:bg-gray-500
      flex
      justify-center
      max-md:px-6
      pt-10
      pb-40
    `}
  color: ${theme`colors.cimc_blue`};
`

const advisors = [
  {
    name: "Mike Levin",
    job: "Biologist",
    institution: "The Levin Lab",
    institutionUrl: "https://drmichaellevin.org",
    portraitUrl: "./portraitLevin.png",
  },
  {
    name: "Christoph v. d. Malsburg",
    job: "Neuroscientist/Physicist",
    institution: "Frankfurt Institute for Advanced Studies",
    institutionUrl: "https://www.izn-frankfurt.de/mitglied/malsburg",
    portraitUrl: "./portraitMalsburg.png",
  },
  {
    name: "Stephen Wolfram",
    job: "Computer Scientist/Physicist/Mathmeatian",
    institution: "Wolfram Research",
    institutionUrl: "https://www.stephenwolfram.com",
    portraitUrl: "./portraitWolfram.png",
  },
  {
    name: "Karl Friston",
    job: "Neuroscientist",
    institution: "University College London",
    institutionUrl: "https://profiles.ucl.ac.uk/2747-karl-friston",
    portraitUrl: "./portraitFriston.webp",
  },
]

interface AdvisorProfileData {
  name: string;
  job: string;
  institution: string;
  institutionUrl: string;
  portraitUrl: string;
}

interface AdvisorProfileProps {
  profileData: AdvisorProfileData;
}

const AdvisorProfile = ({profileData}: AdvisorProfileProps) => {
  const {name, job, institution, institutionUrl, portraitUrl} = profileData
  return (
    <div className="pb-4 leading-tight">
      <img src={portraitUrl} alt={`${name} Portrait`} className="flex rounded py-2 w-5/12" />
      <span className="cimc-heading">
        {name}
      </span>
      <span className="cimc-standard">
        {` [${job}]`}
      </span>
      <a href={institutionUrl}>
        <p className="cimc-standard underline">
          {institution}
        </p>
      </a>
    </div>
  )
}

const Team = () => {
  return (
    <TeamContainer id="team">
      <div className="md:w-[729px]">
        <p className="cimc-heading py-4">
          CORE TEAM
        </p>
        <p className="cimc-heading py-4">
          Scientific Advisors
        </p>
        {
          advisors.map((advisors)=>{
            return <AdvisorProfile profileData={advisors} />
          })
        }

        <p className="cimc-standard leading-tight pt-8">
          <span className="cimc-sub-heading">CEO</span>
          <br/>
          Joscha Bach
          <br/>
          <br/>
          <span className="cimc-sub-heading">COO</span>
          <br/>
          Erik Newton
          <br/>
          <br/>
          <span className="cimc-sub-heading">Chief of Staff</span>
          <br/>
          Corey Doney
          <br/>
          <br/>
          <span className="cimc-sub-heading">Board</span>
          <br/>
          Jim O’Neill
          <br/>
          Philip Rosedale
          <br/>
          Zhen Tan
          <br/>
          Lou de Kerhuelvez
          <br/>
          <br/>
          <span className="cimc-sub-heading">Board Observer</span>
          <br/>
          Christine Peterson
          <br/>
          <br/>
          <span className="cimc-sub-heading">Organizational advisors</span>
          <br/>
          Jim Rutt
          <br/>
          Allison Duettman
          <br/>
          Dan Girshovich
          <br/>
          Franz Hildebrandt-Harangozó
        </p>
          <Contact />
        </div>
      </TeamContainer>
  )
}

export default Team
