import { Component, React, useState } from "react";
import WeatherCard from "../comps/weatherCard";
import styled from "styled-components";
import { toHaveAccessibleDescription } from "@testing-library/jest-dom/dist/matchers";

const SearchBar=styled.input`
    width: 300px;
    background-color: aqua;
`
const BackgroundVideo=styled.video`
    width: 100%;
    height: 100%;    
`
class home extends Component{
    constructor(pros){
        super(pros);
        this.state={
            VideoLink:''
        }
        this.getVideo=this.getVideo.bind(this)
    }
    weather=()=>{
        return(
            <div className="weatherContainer">
                <div className="weatherCar">
                    
                </div>
            </div>
        )
    }
    componentDidMount(){
        
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
    render(){
        return(
            <section className="home">
                <SearchBar type="text" name="seatch"></SearchBar>
                <button>search</button>
                <WeatherCard />
                {this.state.VideoLink===null?this.getVideo:this.state.VideoLink}
                <BackgroundVideo id='video' autoPlay loop muted src={this.state.VideoLink}/>
            </section>
        )
    }
}
// console.log(()=>{})
export default home;