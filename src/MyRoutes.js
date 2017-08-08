/*eslint-disable*/
import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';

import Map from './Map.js';
import Header from './Header.js';
import About from './About.js';
import street from 'images/street.svg';
import { Layout, Menu, Icon, Modal, Button, Input,
        notification, Badge, Row, Col, InputNumber, message} from 'antd';
import * as firebase from 'firebase';
const { Header, Footer, Sider, Content } = Layout;


class MyRoutes extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            visible : false,
            loggedIn : false,
            currentUser : null,
            cartItemCount : 0,
            cartVisible : false,
            cartItems : [],
            order : false
        };
        this.handleSiderMenuClick = this.handleSiderMenuClick.bind(this)
        this.renderAbout = this.renderAbout.bind(this);
        this.renderApp = this.renderApp.bind(this);
    }
    
    handleSiderMenuClick(propsPassed){
        console.log(propsPassed);
        if (propsPassed.key == 3){
            if(this.state.loggedIn != true){
                this.setState({
                    visible : true
                });  
                this.showLoginWindow
            }
            else{
                firebase.auth().signOut();
            }

        }
    }
    
    componentDidMount (){
        console.log("in componentDid mount");
        firebase.auth().getRedirectResult().then(this.authRedirectSuccess).catch(this.authRedirectFail);
        firebase.auth().onAuthStateChanged(this.handleAuthChange);
        this.databaseRef2 = firebase.database().ref('order');
    }
   
    renderAbout(props){
        return(
            <About routeProps = {props}/>
        );
    }
    
    renderMap(props){
        return(
            <Map routeProps = {props}/>
        );
    }
  
    componentWillUnmount() {
        this.databaseRef.off();
    }
  
    render(){
       return (
       <BrowserRouter>
        <div>
            <div>
                <Sample />
            </div>
            <Layout>
                <Content style={{marginTop: "30px",height: '500px', marginRight:"5%", marginLeft:"5%"}}>
                    <Route exact path='/about' render={this.renderAbout} />
                    <Route exact path='/' render={this.renderMap} />
                </Content>
            </Layout>
        </div>
           
        </BrowserRouter>);
    }
}

export default MyRoutes;
