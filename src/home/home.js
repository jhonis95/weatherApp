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

        this.updateBackground=this.updateBackground.bind(this);
        this.settingBackground=this.settingBackground.bind(this);
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
                console.log(data.weather[0].main)
                this.settingBackground(data.weather[0].main)
            }
        )
    }
    settingBackground(weather){
        console.log(`weather is: ${weather}`)
        let fetchLink;
        switch(weather){
            case 'Clear':
                fetchLink='https://api.pexels.com/videos/videos/2605326'
                this.updateBackground(fetchLink)
                break;
            case 'Clouds':
                fetchLink='https://api.pexels.com/videos/videos/12762131'
                this.updateBackground(fetchLink)
                break;
            default:
                fetchLink='https://api.pexels.com/videos/videos/1860175';
                this.updateBackground(fetchLink)
        }
    }
    updateBackground(link){
        this.props.updateVideo(link)
    }
    render(){
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