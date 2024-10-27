import linksData from "./links.json"
const { column1, column2, column3 } = linksData;

interface LibraryCellProps {
  title: string;
  linkUrl: string;
  thumbnailUrl?: string;
  description?: string;
}

function LibraryCell( {title, description, linkUrl, thumbnailUrl }: LibraryCellProps) {
  return (
    <div className="rounded py-4">
      <a href={linkUrl} target="_blank">
        {thumbnailUrl ? <img src={thumbnailUrl} alt={`${title} Thumbnail`} className="flex rounded py-2 max-md:w-10/12" /> : null}
      </a>
      <div className="pb-2">
        <a href={linkUrl} target="_blank" className="hover:underline">
          {title}
        </a>
      </div>
      {description ? 
        <p className="text-sm leading-tight">
          {description}
        </p>
       : null}
    </div>
  )
}

interface LibraryColumnProps {
  columnCellsData: LibraryCellProps[];
  extraXPadding?: boolean;
}

function LibraryColumn( { columnCellsData, extraXPadding = false }: LibraryColumnProps) {
  const columnCells = columnCellsData.map((cellData) => {
    const {title, description, linkUrl, thumbnailUrl } = cellData
    return <LibraryCell key={title} title={title} linkUrl={linkUrl} thumbnailUrl={thumbnailUrl} description={description}/>
  })
  return (
    <div className={`flex-1 py-4 md:w-1/3 ${extraXPadding ? "px-6" : ""}`}>
      {columnCells}
    </div>
  )
}

function Library() {
  return (
    <div id="library" className="flex justify-center max-md:px-6">
      <div className="flex md:w-[729px] max-md:flex-col">
        <LibraryColumn columnCellsData={column1} />
        <LibraryColumn columnCellsData={column2} extraXPadding/>
        <LibraryColumn columnCellsData={column3} />
      </div>
    </div>
  )
}

export default Library
