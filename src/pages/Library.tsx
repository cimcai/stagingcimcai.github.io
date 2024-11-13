import styled from "styled-components";
import linksData from "../data/links.json"
import tw from "twin.macro";

interface LibraryCellProps {
  title: string;
  linkUrl?: string;
  thumbnailUrl?: string;
  description?: string;
}

const LibraryCell: React.FC<LibraryCellProps & React.RefAttributes<HTMLAnchorElement>> = ({title, description, linkUrl, thumbnailUrl }) => {
  return (
    <div className="flex-col md:pr-4 md:w-1/3 max-md:w-8/12">
      <>
        <a href={linkUrl} target="_blank">
          {thumbnailUrl ? <img src={thumbnailUrl} alt={`${title} Thumbnail`} className="flex py-2 max-md:w-9/12" /> : null}
        </a>
        <div className={`pt-${thumbnailUrl ? 0 : 8} leading-tight ${linkUrl ? "underline underline-offset-auto" : ""}`}>
          <a href={linkUrl} target="_blank">
            {title}
          </a>
        </div>
      </>
      {description ?
        <p className="pt-2 text-sm leading-tight">
          {description}
        </p>
       : null}
    </div>
  )
}


interface LibraryCellRowProps {
  topic: string;
  linkData: LibraryCellProps[];
}

const LibraryCellsContainer = styled.div`
  ${tw`
    md:flex
    flex-wrap
    max-md:flex-1
    pt-2
    pb-4
  `}
`
const LibraryRowContainer = styled.div`
  ${tw`
  `}
`

const LibraryRow: React.FC<LibraryCellRowProps> = ({topic, linkData }) => {
  return (
    <LibraryRowContainer>
      <div className="pt-6 text-xl">
        {topic}
      </div>
      <LibraryCellsContainer>
      {
        linkData.map((cellData) => {
          const {title, description, linkUrl, thumbnailUrl } = cellData
          return (
            <LibraryCell key={title} title={title} linkUrl={linkUrl} thumbnailUrl={thumbnailUrl} description={description}/>
          )
        })
      }
      </LibraryCellsContainer>
    </LibraryRowContainer>
  )
}

const LibraryContainer = styled.div`
  ${tw`
  bg-black
  text-white
    flex
    md:justify-center
    max-md:px-6
    pt-16
    pb-40
  `}
`
const LibraryColumnContainer = styled.div`
  ${tw`
    md:w-[729px]
  `}
`

const Library = () => {
  return (
    <LibraryContainer id="library">
      <LibraryColumnContainer>
      {
        linksData.map((linksData) => {
          const {topic, linkData} = linksData
          return (
            <LibraryRow topic={topic} linkData={linkData} />
          )
        })
      }
      </LibraryColumnContainer>
    </LibraryContainer>
  )
}

export default Library
