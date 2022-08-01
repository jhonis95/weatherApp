import { Component } from "react";
import styled from "styled-components";

const Card=styled.div`
    width: 65rem;
    height: 30rem;
    background-color: aliceblue;
    position: relative;
`
const CityImgBackgorund=styled.img`
    width: 100%;
    height: 20rem;
`
const CardInfoContainer=styled.div`
    display: flex;
    justify-content: space-evenly;
`
const CityName= styled.h1`
    position: absolute;
    top:0;
    color:red;
`
const Temperature=styled.h3`

`
const Weather=styled.h4`

`

class weatherCard extends Component{
    constructor(props){
        super(props)
        this.state={

        }
        this.featchCardImg=this.featchCardImg.bind(this);
    }
    featchCardImg(){

    }
    render(){
        return(
            <Card>
                <CityImgBackgorund src="" alt="" />
                <CityName>{this.props.weatherData.city}, {this.props.weatherData.city?this.props.country:''}</CityName>
                <CardInfoContainer>
                    <Temperature>Temperature: {this.props.weatherData.temperature}</Temperature>
                    <Temperature>Max Temperature: {this.props.weatherData.tempMax}</Temperature>
                    <Temperature>Min Temperature: {this.props.weatherData.tempMin}</Temperature>
                    <Weather>{this.props.weatherData.weather}</Weather>
                    <Weather>humidity: {this.props.weatherData.humidity}</Weather>
                </CardInfoContainer>        
            </Card>
        )
    }
}

export default weatherCard