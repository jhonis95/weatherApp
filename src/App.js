
// import { createClient } from 'pexels';
import { Component } from "react";
import NavBar from "./comps/navBar";
import Home from "./Pages/home";
import styled from "styled-components";
import keys from "./key.json"

// const clientImgKey = createClient('563492ad6f917000010000019e5ac6db1cca432ea31c2445f79014da');

const BackgroundVideo=styled.video`
    height: auto;
    position: fixed ;
    z-index: -1;
    top: 0;
`
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
            'Authorization': keys.pixelsKey.keyAPI
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
                }else if(video.id===124263){//Rain
                  this.settingVideo(video.link)
                }else if(video.id===4714077){//thunderstorm
                  this.settingVideo(video.link)
                }else if(video.id===1903611){//drizzle
                  this.settingVideo(video.link)
                }else if(video.id===15223){//snow
                  this.settingVideo(video.link)
                }else if(video.id===175152){//fog
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
        <ErrorBoundary>
          <NavBar/>
            <Home updateVideo={this.getVideo}/>
            <BackgroundVideo id='video' autoPlay loop muted src={this.state.VideoLink}/>
        </ErrorBoundary>
      );
  }
}

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  
  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }
  
  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }  
}

export default App;