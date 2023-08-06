import { Component, React } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png"

const NavBarContainer=styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: gray;
`
const LogoContainer=styled.div`
    display: flex;
`
const LogoImage=styled.img`
    border-radius: 50%;
    width: 50px;
    margin: 5px;
`
const Title=styled.h3`
    @media (max-width: 768px) {
        display:none;
    }
`
const AppTitle=styled.h2`
    font-size:large
`
const ButtonList=styled.ul`
    margin: 5px;
    text-align: center;
    padding: 0;
    width: 225px;
    `
const Button=styled.button`
    /* margin: 0 10%; */
    font-size: large;
    &:hover{
        outline: 2px solid black;
        background-color: white;
        border-radius: 10px;
    }
`
class navBar extends Component{
    render(){
        return(
            <NavBarContainer>
                <LogoContainer>
                    <LogoImage src={logo} alt="logo"/>
                    <Title>jonatan de oliveira</Title>
                </LogoContainer>

                <AppTitle>Weather App</AppTitle>

                <ButtonList>
                    <Button >My Portfolio</Button>
                </ButtonList>

            </NavBarContainer>
        )
    }
}

export default navBar;