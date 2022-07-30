import { Component } from "react";
import styled from "styled-components";

const Card=styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 200px;
    background-color: aliceblue;
`
const CityName= styled.h1`
    color:red;
`
const Temperature=styled.h3`

`
const Weather=styled.h4`

`

class weatherCard extends Component{
    constructor(pros){
        super(pros);
        this.state={
            
        }
    }
    render(){
        return(
            <Card>        
                <CityName>{this.props.weatherData.city}, {this.props.country}</CityName>
                <Temperature>Temperature: {this.props.weatherData.temperature}</Temperature>
                <Temperature>Max Temperature: {this.props.weatherData.tempMax}</Temperature>
                <Temperature>Min Temperature: {this.props.weatherData.tempMin}</Temperature>
                <Weather>{this.props.weatherData.weather}</Weather>
                <Weather>{this.props.weatherData.humidity}</Weather>
            </Card>
        )
    }
}

export default weatherCard