import { FullCIMCLogo } from "./CIMCLogo";
import NavLinks from "./NavLinks";

function Header() {
  return (
    <div className="flex md:justify-center max-md:px-6 pt-6">
      <div className="flex justify-start md:w-[729px] max-md:hidden">
        <FullCIMCLogo color="text-black" logoScale={1} isSmallText={false} />
      </div>
      <NavLinks />
    </div>
  )
}

export default Header
