import { useState } from "react"
import { NavLink } from "react-router-dom"
import styled from "styled-components"
import tw from "twin.macro"
import type { CIMCRoutes } from "../App"
import { CIMCLogo } from "./CIMCLogo"
import MenuButton from "./icons/MenuButton"

export const shouldForwardProp =
  <TCustomProps extends Record<string, unknown>>(
    customProps: ReadonlyArray<keyof TCustomProps>,
  ) =>
  (prop: string): boolean =>
    !customProps.includes(prop)

interface NavbarIsOpenProps {
  isOpen: boolean
}

const NavbarContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !["isOpen"].includes(prop),
})<NavbarIsOpenProps>`
  ${tw`
      h-16
      md:h-24
      w-full
      flex
      justify-between
      fixed
      px-6
      py-6
      md:py-0
      bg-white/90
      bg-opacity-90
      z-20
  `}
  ${({ isOpen }) =>
    isOpen &&
    tw`
      h-screen
      md:h-24
      justify-between
      items-center
      md:items-stretch
      flex-col
      md:flex-row
  `}
`

const NavbarInnerContainer = styled.div`
  ${tw`
    w-full
    max-w-[1280px]
    flex
    justify-start
    items-start
    md:items-center
    flex-col
    md:flex-row
  `}
`

const NavbarStyle = styled.div.withConfig({
  shouldForwardProp: (prop) => !["isOpen"].includes(prop),
})<NavbarIsOpenProps>`
  ${tw`
    hidden
    md:flex
    md:items-center
    md:flex-row
    md:text-cimc-navbar
    md:gap-8
    justify-start
  `}
  ${({ isOpen }) =>
    isOpen &&
    tw`
    flex
    flex-col
    gap-8
    pt-12
    md:pt-0
    text-cimc-navbar-mobile
    md:text-cimc-navbar
  `}
`

const NavbarLogoContainer = styled.div`
  ${tw`
    pr-12
  `}
`

const ContactButton = styled.a.withConfig({
  shouldForwardProp: (prop) => !["isOpen"].includes(prop),
})<NavbarIsOpenProps>`
  ${tw`
    rounded-tr-[10px]
    rounded-bl-none
    rounded-tl-none
    rounded-br-none
    border-2
    border-solid
    border-black
    bg-black
    text-white
    hover:bg-white
    hover:text-black
    transition
    text-cimc-contact-button
    shadow-[0px_0px_0px_1px_rgba(10,13,18,0.18)_inset,0px_-2px_0px_0px_rgba(10,13,18,0.05)_inset,0px_1px_2px_0px_rgba(10,13,18,0.05)]
    h-[44px]
    w-full
    md:w-auto
    px-[56px]
    py-[10px]
    mb-20
    flex
    md:mt-[26px]
    text-center
    gap-[var(--spacing-sm,6px)]
    no-underline
  `};
  ${({ isOpen }) => !isOpen && tw`hidden md:flex`}
`

interface NavbarProps {
  routes: CIMCRoutes[]
  setClick?: (showMenu: boolean) => undefined
}

export default function Navbar({ routes }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <NavbarContainer isOpen={isOpen}>
      <NavbarInnerContainer>
        <button
          onClick={toggleMenu}
          type="button"
          tw="flex md:hidden absolute top-6 right-3 gap-2 items-center"
        >
          {isOpen ? "CLOSE" : "MENU"}
          <MenuButton isOpen={isOpen} />
        </button>
        <NavbarLogoContainer>
          <CIMCLogo width={108} />
        </NavbarLogoContainer>
        <NavbarStyle isOpen={isOpen}>
          {routes.map((route) => (
            <NavLink
              key={route.path}
              to={route.path}
              className="select-none cursor-pointer underline-offset-4"
              style={({ isActive, isPending, isTransitioning }) => {
                return {
                  textDecorationLine: isActive ? "underline" : "",
                  color: isPending ? "red" : "black",
                  viewTransitionName: isTransitioning ? "fade" : "",
                }
              }}
              onClick={toggleMenu}
            >
              {route.name}
            </NavLink>
          ))}
        </NavbarStyle>
      </NavbarInnerContainer>
      <ContactButton href="mailto:proposals@cimc.ai" isOpen={isOpen}>
        Contact
      </ContactButton>
    </NavbarContainer>
  )
}
