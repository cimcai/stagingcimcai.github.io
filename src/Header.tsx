import { PartialCIMCLogo } from "./CIMCLogo";
import NavLinks from "./NavLinks";

function Header() {
  return (
    <div className="flex md:justify-center max-md:px-6 pt-6 ">
      <div className="flex md:w-[729px]">
        <div className="max-md:hidden">
          <PartialCIMCLogo color="text-black" logoScale={1}/>
        </div>
        <div className="flex md:pl-[175px]">
          <NavLinks />
        </div>
      </div>
    </div>
  )
}

export default Header
