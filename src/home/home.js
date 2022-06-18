import { Component, React } from "react";
import WeatherCard from "../comps/weatherCard";
import styled from "styled-components";

const searchBar=styled.input`
    
`

class home extends Component{
    constructor(pros){
        super(pros);
        this.setState={
            
        }
        this.handleChange=this.handleChange.bind(this)
    }
    weather=()=>{
        return(
            <div className="weatherContainer">
                <div className="weatherCar">
                    
                </div>
            </div>
        )
    }
    handleChange(){

    }
    render(){
        return(
            <section className="home">
                <searchBar type="text" onChange={this.handleChange}></searchBar>
                <WeatherCard />
            </section>
        )
    }
}

export default home;