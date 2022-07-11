import { Component, React } from "react";
import WeatherCard from "../comps/weatherCard";
import styled from "styled-components";

const SearchBar=styled.input`
    width: 300px;
    background-color: aqua;
    position: absolute;
`
const BackgroundVideo=styled.video`
    width: 100%;
    height: 100%;   
    position: absolute ;
    z-index: -1;
    top: 0;
`
class home extends Component{
    constructor(pros,timeoutID){
        super(pros);
        this.state={
            VideoLink:'',
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
        this.timeoutID=timeoutID;
        this.weatherAPIKey='235ee31517e38d928f1e4d68b6d638fd'

        this.getVideo=this.getVideo.bind(this);
        this.searchHeandler=this.searchHeandler.bind(this);
        this.fetchLocation=this.fetchLocation.bind(this);
    }
    componentDidMount(){
        // this.getVideo()
    }
    getVideo(){
        fetch('https://api.pexels.com/videos/videos/1860175',{
            method:'GET',
            headers:{
                'Authorization':'563492ad6f917000010000019e5ac6db1cca432ea31c2445f79014da'
            }
        }
        ).then((response)=>{
            if(response.ok){
                return response.json()
            }else {
                console.log('Network response was not ok.');
            }
        }).then((data)=>{
            data.video_files.forEach(video => {
                if(video.id===77347){
                    this.setState({
                        VideoLink:video.link
                    })
                }
            });
        }).catch(
            (erro)=>{
                console.log(erro)   
            }
        )
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
            })
    }
    render(){
        return(
            <section className="home">
                <SearchBar type="text" name="seatch" onChange={this.searchHeandler}></SearchBar>
                <button>search</button>
                <WeatherCard weatherPositionData={this.state.weatherAPIData} />
                <BackgroundVideo id='video' autoPlay loop muted src={this.state.VideoLink}/>
            </section>
        )
    }
}
export default home;