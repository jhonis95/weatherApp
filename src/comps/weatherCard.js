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

class weatherCard extends Component{
    constructor(pros){
        super(pros);
        this.state={
            city:null,
            temperature:null,
            tempMax:null,
            tempMin:null,
            humidity:null,
            weather:null,
            call:true
        }
        // this.timeoutID=timeoutID;
        this.fetchWeather=this.fetchWeather.bind(this);
    }
    componentDidUpdate(){
        console.log(this.props.weatherPositionData)
        // if(this.timeoutID){
        //     clearTimeout(this.timeoutID)
        // }
        // this.timeoutID=setTimeout(()=>{
        // },1000)
        if(this.props.weatherPositionData||this.state.call){
            this.fetchWeather(this.props.weatherPositionData)
            this.setState({
                call:false
            })
        }
    }
    fetchWeather(positionData){
        console.log(`data the came from father comp:${positionData}`)
        fetch(
            'https://api.openweathermap.org/data/2.5/weather?lat='+positionData.lat+'&lon='+positionData.lon+'&appid='+positionData.weatherAPIKey+'&units=metric'
            ).then((response)=>{
                return response.json();
            }).then((data)=>{
                console.log(data)
                this.setState({
                    city:data.name,
                    temperature:data.main.temp,
                    tempMax:data.main.temp_max,
                    tempMin:data.main.temp_min,
                    humidity:data.main.humidity,
                    weather:data.weather[0].main,
                })
            })
    }
    render(){
        return(
            <Card>        
                <CityName></CityName>
                <h3 id="temperature">temperature</h3>
                <h3 id="weatherCondition">weather</h3>
            </Card>
        )
    }
}

export default weatherCard