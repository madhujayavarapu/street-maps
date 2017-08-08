/*eslint-disable*/
import React, { Component } from 'react';
import about from 'images/about.svg';
import {  Row,Col,Card} from 'antd';
import street from 'images/street.svg';
import bg from 'images/bg.svg';
import front from 'images/front.jpg';


class About extends Component{
    render(){
        
        return(
            <div>
                <center>
                <b><p  style={{fontSize:'28px',fontFamily:'Circular Std,sans-serif'}}>What we do</p>
                </b>
                </center>
                <img src={{bg}} alt="back" width="100%"/>
                <center>
                <b><p  style={{fontSize:'28px',fontFamily:'Circular Std,sans-serif'}}>How It Works</p></b>
                </center>
                <img src={{front}} alt="front" width="100%"/>
            </div>
        );
        
        
    }
}


export default About;
