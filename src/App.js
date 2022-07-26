
// import { createClient } from 'pexels';
import { Component } from "react";
import NavBar from "./comps/navBar";
import Home from "./home/home";
import styled from "styled-components";

// const clientImgKey = createClient('563492ad6f917000010000019e5ac6db1cca432ea31c2445f79014da');

const BackgroundVideo=styled.video`
    height: auto;
    position: fixed ;
    z-index: -1;
    top: 0;
`

// let weatherApiKey='235ee31517e38d928f1e4d68b6d638fd';
class App extends Component{
  constructor(){
    super();
    this.state={
      VideoLink:'',
    }
    this.setVideo=this.setVideo.bind(this);
  }
  componentDidMount(){
    this.getVideo()
  }
  setVideo(video){
    this.setState({
        VideoLink:video.link
    })
  }
  getVideo(weatherStatus){
    console.log(`was true ${weatherStatus}`)
    switch(weatherStatus){
      case `Clear`:
        fetch('https://api.pexels.com/videos/videos/2605326',{
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
                if(video.id===133972){
                    this.setVideo(video.link)//using a new func to set state
                }
            });
        }).catch(
            (erro)=>{
                console.log(`error in clear: ${erro}`)   
            }
        )
        break;
      case `Clouds`:
        console.log(`was activaded: ${weatherStatus}`)
        fetch('https://api.pexels.com/videos/videos/12762131',{
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
                if(video.id===5603619){
                    this.setVideo(video.link)
                }
            });
        }).catch(
            (erro)=>{
                console.log(`error in Clouds: ${erro}`)    
            }
        )
        break;
      default:
        console.log('default background')
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
                    this.setVideo(video.link)
                }
            });
        }).catch(
            (erro)=>{
                console.log(erro)   
            }
        )
      }
  }
  render(){
    return (
      <div className="App">
          <NavBar/>
          <Home updateVideo={this.getVideo}/>
          <BackgroundVideo id='video' autoPlay loop muted src={this.state.VideoLink}/>
      </div>
    );
  }
}

export default App;