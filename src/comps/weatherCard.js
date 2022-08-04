import { Component } from "react";
import styled from "styled-components";

const Card=styled.div`
    width: 65rem;
    height: 30rem;
    background-color: aliceblue;
    position: relative;
    border-radius: 10px;
`
const CityImgBackgorund=styled.img`
    width: 100%;
    height: 20rem;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`
const CardInfoContainer=styled.div`
    display: flex;
    justify-content: space-evenly;
`
const CityName= styled.h1`
    color:white;
    text-shadow:    -1px 1px 0 #000,
                    1px 1px 0 #000,
                    1px -1px 0 #000,
                    -1px -1px 0 #000;
    position: absolute;
    top:0;
    left: 10px;
`
const InfoNumber=styled.h3`

`
const InfoText=styled.h4`

`
const CardInfo=styled.div`

`
const WeatherIcon=styled.img`
    width: 200px;
    background-color: aqua;
`
class weatherCard extends Component{
    constructor(props){
        super(props)
        this.state={

        }
        this.featchCardImg=this.featchCardImg.bind(this);
        this.getDate=this.getDate.bind(this);
    }
    featchCardImg(){//method to get the city image
        
    }
    getDate(){
    //    var d = new Date((new Date().getTime())-25200*1000) -25200 is the time zone
    //    d.toISOString()
    // response""2020-12-26T13:50:09.012Z""
    }
    render(){
        return(
            <Card>
                <CityImgBackgorund src="" alt="" />
                <CityName>{this.props.weatherData.city+','} {this.props.weatherData.city?this.props.country:''}</CityName>
                <CardInfoContainer>
                    <CardInfo>
                        <WeatherIcon src="" alt=""/>
                        <InfoNumber>{this.props.weatherData.temperature}</InfoNumber>
                        <InfoText>{}</InfoText>
                    </CardInfo>
                    <CardInfo>
                        <InfoNumber>{this.props.weatherData.tempMax}</InfoNumber>
                        <InfoText>Max Temperature</InfoText>
                    </CardInfo>
                    <CardInfo>
                        <InfoNumber>{this.props.weatherData.tempMin}</InfoNumber>
                        <InfoText>Min Temperature</InfoText>
                    </CardInfo>
                    <CardInfo>
                        <InfoNumber>{this.props.weatherData.humidity}</InfoNumber>
                        <InfoText>humidity</InfoText>
                    </CardInfo>
                    <CardInfo>
                        <InfoNumber></InfoNumber>
                        <InfoText>Time</InfoText>
                    </CardInfo>
                </CardInfoContainer>        
            </Card>
        )
    }
}

export default weatherCard