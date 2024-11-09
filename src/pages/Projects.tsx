import styled from "styled-components";
import tw from "twin.macro";

const ProjectsContainer = styled.div`
  ${tw`
      flex
      md:justify-center
      max-md:px-6
      pt-16
      pb-40
    `}
`
const ProjectStyle = styled.div`
  ${tw`
    bg-white
    text-black
    selection:text-black
    selection:bg-gray-500
      md:w-[729px]
    `}
`
const Projects = () => {
  return(
    <ProjectsContainer id="projects">
      <ProjectStyle>
        <p className="cimc-heading leading-tight py-4">
          PROJECTS
        </p>
        <ul className="list-disc ml-4">
          <li>
            Self organization automata
          </li>
          <li>
            Turing test for consciousness, can it be measured?
          </li>
          <li>
            Can we build empathetic ai? (Extensions of ourselves, artists)
          </li>
          <li>
            Cognitive modeling, personality and psychological modeling.
          </li>
        </ul>
      </ProjectStyle>
    </ProjectsContainer>
  )
}

export default Projects
