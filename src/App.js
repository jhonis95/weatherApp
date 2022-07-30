
// import { createClient } from 'pexels';
import { Component } from "react";
import NavBar from "./comps/navBar";
import Home from "./Pages/home";
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
    this.settingVideo=this.settingVideo.bind(this);
    this.getVideo=this.getVideo.bind(this);
  }
  componentDidMount(){
    this.getVideo()
  }
  settingVideo(video){
    this.setState({
        VideoLink:video
    })
  }
  getVideo(link){
    if(this.state.VideoLink===''){
        link='https://api.pexels.com/videos/videos/1860175'//acticvate defalt
    }
    fetch(link,{
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
                if(video.id===77347){//default
                    this.settingVideo(video.link)
                }else if(video.id===5603622){//cloud
                    this.settingVideo(video.link)
                }else if(video.id===133972){//clear
                    this.settingVideo(video.link)
                }
            });
        }).catch(
            (erro)=>{
                console.log(erro)   
        })
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