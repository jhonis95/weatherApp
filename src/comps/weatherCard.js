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
        this.setState={
            city:"",
            temperature:"",
            condition:"",
        }
    }
    
    render(){
        return(
            <Card>        
                <CityName>london</CityName>
                <h3 id="temperature">temperature</h3>
                <h3 id="weatherCondition">weather</h3>
            </Card>
        )
    }
}

export default weatherCard