import { HeaderContainer } from "./styles";

import { Scroll, Timer } from "phosphor-react";
import { NavLink } from "react-router-dom";
import logo from '../../assets/logo.svg';

export function Header() {
  return (
    <HeaderContainer>
      <img src={logo} alt="" />
      <nav>
        <NavLink to="/" title="timer or home">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="history">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}