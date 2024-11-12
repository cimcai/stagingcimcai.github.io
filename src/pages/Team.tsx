import styled from "styled-components"
import tw, { theme } from "twin.macro"
import profilesData from "../data/profiles.json"

const TeamContainer = styled.div`
  ${tw`
      text-black
      bg-white
      selection:text-black
      selection:bg-gray-500
      flex
      justify-center
      max-md:px-6
      pt-16
      pb-40
    `}
  color: ${theme`colors.cimc_blue`};
`

const ProfileContainer = styled.div`
  ${tw`
      pb-4
      leading-tight
    `}
`

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

const AdvisorProfile: React.FC<AdvisorProfileProps & React.RefAttributes<HTMLAnchorElement>> = ({profileData}) => {
  const {name, job, institution, institutionUrl, portraitUrl} = profileData
  return (
    <ProfileContainer>
      <img src={portraitUrl} alt={`${name} Portrait`} className="flex rounded py-2 h-56" />
      <p className="cimc-heading">
        {name}
      </p>
      <p className="cimc-standard">
        {job}
      </p>
      <a href={institutionUrl}>
        <p className="cimc-standard underline">
          {institution}
        </p>
      </a>
    </ProfileContainer>
  )
}

interface AdvisorProfileColumnProps {
  columnCellsData: AdvisorProfileData[];
}


const AdvisorProfileColumn: React.FC<AdvisorProfileColumnProps> = ({ columnCellsData, }) => {
  return (
    <div className={`flex-1 py-4 md:w-1/2`}>
      {
        columnCellsData.map((profileData) => {
          return <AdvisorProfile key={profileData.name} profileData={profileData} />
        })
      }
    </div>
  )
}

const Team = () => {
  return (
    <>
      <TeamContainer id="team">
        <div className="md:w-[729px]">
          <p className="cimc-heading py-4">
            CORE TEAM
          </p>
          <p className="cimc-heading">
            Scientific Advisors
          </p>
          <div className="md:flex">
            <AdvisorProfileColumn columnCellsData={profilesData.slice(0, 2)} />
            <AdvisorProfileColumn columnCellsData={profilesData.slice(-2)} />
          </div>


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
        </div>
      </TeamContainer>
    </>
  )
}

export default Team
