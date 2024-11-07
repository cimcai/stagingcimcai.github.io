import styled from "styled-components";
import tw from "twin.macro";

const ProjectsContainer = styled.div`
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
`
const Projects = () => {
  return(
    <ProjectsContainer>
      <div className="md:w-[729px]">
        <p id="projects" className="cimc-heading leading-tight py-4">
          PROJECTS
        </p>
        <ul>
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
      </div>
    </ProjectsContainer>
  )
}

export default Projects
