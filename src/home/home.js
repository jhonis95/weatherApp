import { Component, React } from "react";
import WeatherCard from "../comps/weatherCard";
import styled from "styled-components";

const SearchBar=styled.input`
    width: 300px;
    background-color: aqua;
    position: absolute;
`
class home extends Component{
    constructor(pros,timeoutID){
        super(pros);
        this.state={
            cityName:'',
            weatherAPIData:{
                city:null,
                temperature:null,
                tempMax:null,
                tempMin:null,
                humidity:null,
                weather:null,
            }
        }

        this.weather=this.state.weatherAPIData.weather;
        this.timeoutID=timeoutID;
        this.weatherAPIKey='235ee31517e38d928f1e4d68b6d638fd'

        this.searchHeandler=this.searchHeandler.bind(this);
        this.fetchLocation=this.fetchLocation.bind(this);
        this.sendWeatherStatus=this.sendWeatherStatus.bind(this);
    }
    searchHeandler(event){
        this.setState({
            cityName:event.target.value
        })
        if(this.timeoutID){//prevent to use the last setTimeout
            clearTimeout(this.timeoutID)
        }
        this.timeoutID=setTimeout(()=>{//calling the API just after 1s of not new input
            this.fetchLocation()
        },1000)
    }
    fetchLocation(){
        fetch(
            'http://api.openweathermap.org/geo/1.0/direct?q='+this.state.cityName+'&limit=1&appid='+this.weatherAPIKey
            ).then((response)=>{
                if(response.ok){
                    return response.json()
                }else {
                    console.log('Network response was not ok.');
                }
            }).then((data)=>{
                this.fetchWeather(data[0].lat,data[0].lon)
            })
    }
    fetchWeather(lat,lon){
        fetch(
            'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+this.weatherAPIKey+'&units=metric'
            ).then((response)=>{
                return response.json();
            }).then((data)=>{
                console.log(data)
                this.setState({
                    weatherAPIData:{
                        city:data.name,
                        temperature:data.main.temp,
                        tempMax:data.main.temp_max,
                        tempMin:data.main.temp_min,
                        humidity:data.main.humidity,
                        weather:data.weather[0].main,
                    }
                })
                // console.log(this.state.weatherAPIData.weather);
            }
        )
    }
    sendWeatherStatus(){ //erro in catch the data before after the status change
        if(!this.state.weatherAPIData.weather){
            console.log(`woked: ${this.state.weatherAPIData.weather}`)
            this.props.updateVideo(this.state.weatherAPIData.weather)
        }
    }
    render(){
        console.log(this.state.weatherAPIData.weather);
        return(
            <section className="home">
                <SearchBar type="text" name="seatch" onChange={this.searchHeandler}></SearchBar>
                <button>search</button>
                <WeatherCard weatherPositionData={this.state.weatherAPIData}  />
            </section>
        )
    }
}
export default home;