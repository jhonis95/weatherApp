import { Component, React } from "react";
import styled from "styled-components";

const NavBarContainer=styled.nav`
    display: flex;
`
const LogoImage=styled.img`
    border-radius: 50%;
`
const Title=styled.h3`
`
const ButtonList=styled.ul`
`

class navBar extends Component{
    render(){
        return(
            <NavBarContainer>
                <LogoImage src=""/>
                <Title>jonatan de oliveira</Title>

                <Title>Weather App</Title>

                <ButtonList>
                    <a href="/">My Portfolio</a>
                </ButtonList>

            </NavBarContainer>
        )
    }
}

export default navBar;