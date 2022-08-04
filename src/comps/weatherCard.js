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
    height: 100%;
    border-radius: 10px;
`
const CardInfoContainer=styled.div`
    display: flex;
    justify-content: space-evenly;
    background: rgba(255, 255, 255, 0.25);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
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
    background: none;
`
class weatherCard extends Component{
    constructor(props){
        super(props)
        this.state={

        }
        this.featchCardImg=this.featchCardImg.bind(this);
        this.getDate=this.getDate.bind(this);
    }
    featchCardImg(icon){//method to get the city image
        let link='http://openweathermap.org/img/wn/'+icon+'@2x.png';
        console.log(link)
        return link;
    }
    getDate(timezone){
       var d = new Date((new Date().getTime())+(timezone)*1000)// convert time zone to nomal time
       console.log(d.toISOString())
       return d.toISOString().slice(11,16)
    }
    render(){
        return(
            <Card>
                <CityImgBackgorund src="" alt="" />
                <CityName>{this.props.weatherData.city+','} {this.props.weatherData.city?this.props.country:''}</CityName>
                <CardInfoContainer>
                    <CardInfo>
                        <WeatherIcon src={this.featchCardImg(this.props.weatherIcon)} alt=""/>
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
                        <InfoNumber>{this.getDate(this.props.weatherData.timezone)}</InfoNumber>
                        <InfoText>Time</InfoText>
                    </CardInfo>
                </CardInfoContainer>        
            </Card>
        )
    }
}

export default weatherCard