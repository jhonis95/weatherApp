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
                <CityName>{this.props.weatherPositionData.city}</CityName>
                <Temperature>Temperature: {this.props.weatherPositionData.temperature}</Temperature>
                <Temperature>Max Temperature: {this.props.weatherPositionData.tempMax}</Temperature>
                <Temperature>Min Temperature: {this.props.weatherPositionData.tempMin}</Temperature>
                <Weather>{this.props.weatherPositionData.weather}</Weather>
                <Weather>{this.props.weatherPositionData.humidity}</Weather>
            </Card>
        )
    }
}

export default weatherCard