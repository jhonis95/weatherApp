import { Component, React } from "react";
import WeatherCard from "../comps/weatherCard";
import styled from "styled-components";

const SearchBar=styled.input`
    width: 300px;
    padding: 5px;
    border-radius: 5ch;
    margin-right:10px;
`
const SearchBarContainer=styled.div`
    display: flex;
    justify-content: center;
    margin: 10px;
`
const SearchButton=styled.button`
    padding: 5px;
    border-radius: 5ch;
    width: 100px;
    margin-left:10px;
`

class home extends Component{
    constructor(pros,timeoutID){
        super(pros);
        this.state={
            cityName:'london',
            country:null,
            state:null,
            weatherIcon:null,
            weatherAPIData:{
                city:'',
                temperature:null,
                tempMax:null,
                tempMin:null,
                humidity:null,
                weather:null,
                timezone:null,
            },
            placeAPI:{
                input: null,
                inputtype:'textquery',
                key:'AIzaSyCCy9h4fZxRJ12j9qLL6LnKk7250eNksHY',
            },
            cityImg:null,
        }
        this.weather=this.state.weatherAPIData.weather;
        this.timeoutID=timeoutID;
        this.weatherAPIKey='235ee31517e38d928f1e4d68b6d638fd'

        this.searchHeandler=this.searchHeandler.bind(this);
        this.changeHeandler=this.changeHeandler.bind(this);
        this.fetchLocation=this.fetchLocation.bind(this);

        this.updateBackground=this.updateBackground.bind(this);
        this.settingBackground=this.settingBackground.bind(this);

        this.findImgCity=this.findImgCity.bind(this);
    }
    changeHeandler(event){//setting the cityname state
        this.setState({
            cityName:event.target.value
        })
    }
    componentDidMount(){
        this.fetchLocation()
    }
    searchHeandler(){
        this.fetchLocation()
    }
    fetchLocation(){
        fetch(
            'https://api.openweathermap.org/geo/1.0/direct?q='+this.state.cityName+'&limit=1&appid='+this.weatherAPIKey,
            {
                method: "GET", 
                mode: 'cors',
            }
            ).then((response)=>{
                if(response.ok){
                    return response.json()
                }else {
                    console.log('Network response was not ok.');
                }
            }).then((data)=>{
                console.log(data)
                this.setState({
                    country:data[0].country,
                    state:data[0].state,
                })
                this.fetchWeather(data[0].lat,data[0].lon)
            })
    }
    fetchWeather(lat,lon){
        fetch(
            'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+this.weatherAPIKey+'&units=metric',
            {
                method: "GET", 
                mode: 'cors',
            }
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
                        timezone:data.timezone,
                    },
                    weatherIcon:data.weather[0].icon,
                    placeAPI:{
                        input:data.name
                    }
                })
                this.settingBackground(data.weather[0].main)//triggin the background change
                this.findImgCity(data.name) //start using the google api
            }
        )
    }
    findImgCity(cityName){
        fetch(
            // 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input='+cityName+'%20'+this.state.state+'%20'+this.state.country+'&inputtype=textquery&key=AIzaSyCCy9h4fZxRJ12j9qLL6LnKk7250eNksHY'
            'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input='+cityName+'%20'+this.state.state+'%20'+this.state.country+'&inputtype=textquery&key=AIzaSyCCy9h4fZxRJ12j9qLL6LnKk7250eNksHY',
            {
                method: "GET", 
                mode: 'cors',
                headers: {
                    'Access-Control-Allow-Origin':'*'
                }   
            }
        ).then(
            (res)=>res.json()
        ).then((data)=>{
            //'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id='+place_id+'&key=AIzaSyCCy9h4fZxRJ12j9qLL6LnKk7250eNksHY'
            let place_id=data.candidates[0].place_id;
            return fetch('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id='+place_id+'&key=AIzaSyCCy9h4fZxRJ12j9qLL6LnKk7250eNksHY',
                {
                    method: "GET", 
                    mode: 'cors',
                    headers: {
                        'Access-Control-Allow-Origin':'*'
                    }   
                }
            )
        }).then(
            (res)=>res.json()
        ).then((data)=>{
            let photo_reference;
            for(let i=0;i<=data.result.photos.length;i++){
                if(data.result.photos[i].width<=1920){
                    photo_reference=data.result.photos[i].photo_reference;
                    break;
                    // return photo_reference=photo.photo_reference
                }
            }
            //https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/photo?maxwidth=1080&photo_reference='+photo_reference+'&key=AIzaSyCCy9h4fZxRJ12j9qLL6LnKk7250eNksHY'
            return fetch('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/photo?maxwidth=1080&photo_reference='+photo_reference+'&key=AIzaSyCCy9h4fZxRJ12j9qLL6LnKk7250eNksHY',
                {
                    method: "GET", 
                    mode: 'cors',
                    headers: {
                        'Access-Control-Allow-Origin':'*'
                    }
                }
            )
        }).then(
            (res)=>{
                return res.blob();
            }
        ).then(//make the fetch img use by react
            (imageBlob)=>{
                const imageObjectURL = URL.createObjectURL(imageBlob);
                this.setState({
                    cityImg: imageObjectURL,
                })
            }
        ).catch(
            (erro)=>{
                console.log(erro)   
        })
        //const findPlaceReq=
        // const placeDetailsReq=fetch('').then((res)=>res.json());
        // const placePhotoReq=fetch().then((res)=>res.json());

        // const allData= Promise.all([findPlaceReq,placeDetailsReq,placePhotoReq]);

        // allData.then((res) => console.log(res));

    }
    settingBackground(weather){//this method is for set the right link to the parent component
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
            case 'Rain':
                fetchLink='https://api.pexels.com/videos/videos/2491284'
                this.updateBackground(fetchLink)
                break;
            case 'Thunderstorm':
                fetchLink='https://api.pexels.com/videos/videos/10651140'
                this.updateBackground(fetchLink)
                break;
            case 'Drizzle':
                fetchLink='https://api.pexels.com/videos/videos/6042260'
                this.updateBackground(fetchLink)
                break;
            case 'Snow':
                fetchLink='https://api.pexels.com/videos/videos/857032'
                this.updateBackground(fetchLink)
                break;
            case 'Fog':
            case 'Mist':
            case 'Haze':
                fetchLink='https://api.pexels.com/videos/videos/2888383'
                this.updateBackground(fetchLink)
                break;
            default:
                fetchLink='https://api.pexels.com/videos/videos/1860175';
                this.updateBackground(fetchLink)
        }
    }
    updateBackground(link){//method that will send the link to the parent component
        this.props.updateVideo(link)
    }
    render(){
        return(
            <section className="home">
                <SearchBarContainer>
                    <SearchBar
                        placeholder="location" 
                        type="text" 
                        name="seatch" 
                        onChange={this.changeHeandler}
                    />
                    <SearchButton 
                        onClick={this.searchHeandler}>
                        search
                    </SearchButton>
                </SearchBarContainer>
                <WeatherCard 
                    weatherData={this.state.weatherAPIData}
                    country={this.state.country}
                    weatherIcon={this.state.weatherIcon}
                    cityImg={this.state.cityImg}
                />
            </section>
        )
    }
}
export default home;