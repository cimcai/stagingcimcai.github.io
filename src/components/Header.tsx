import NavLinks from "./NavLinks";

function Header() {
  return (
    <div className="flex md:justify-center max-md:px-6 pt-6 ">
        <div className="flex md:w-[729px]">
          <NavLinks />
        </div>
    </div>
  )
}

export default Header
