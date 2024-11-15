import Institute from "../components/Institute";
import MissionStatement from "../components/MissionStatement";
import styled from 'styled-components'
import tw from 'twin.macro'

const MissionContainer = styled.div`
  ${tw`
  bg-white
  text-black
  selection:text-black
  selection:bg-gray-500
    flex
    justify-center
    px-6
    pt-16
  `}
  height: calc(100vh - 226px);
`

const MissionStyle = styled.div`
  ${tw`
    md:w-[729px]
    py-10
    `}
`
const Mission = () => {
  return (
    <>
      <MissionContainer>
        <MissionStyle>
          <Institute />
          <MissionStatement />
        </MissionStyle>
      </MissionContainer>
    </>
  )
}

export default Mission
