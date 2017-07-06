/*eslint-disable*/
import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';

import App from './App.js';

import About from './About.js';
import street from './street.svg';
import ContactUs from './ContactUs.js';
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
    
    renderApp(props){
        return(
            <App routeProps = {props}/>
        );
    }
    
     renderContact(props){
        return(
            <ContactUs routeProps = {props}/>
        );
    }
  
    componentWillUnmount() {
        this.databaseRef.off();
    }
  
    render(){
        let signInText = 'SignIn/Register';
        if (this.state.loggedIn == true){
            signInText = 'Logout'
        }
       return (
       <BrowserRouter>
            <div>
                <Layout>
                      <Sider breakpoint="md" collapsedWidth="0" style={{ background: '#fff'}}>
                            <Menu style={{ marginTop: '100px' }} theme="light" mode="inline"
                            defaultSelectedKeys={['1']}
                            onClick = {this.handleSiderMenuClick}
                            >
                             <Menu.Item key="1">
                                <Icon type="home" />
                                <span className="nav-text">
									<Link to='/'>Maps</Link>
								</span>
                              </Menu.Item>  
                            
                                
                              <Menu.Item key="2">
                                <Icon type="team" />
                                <span className="nav-text">
									<Link to='/about'>About</Link>
								</span>
                              </Menu.Item>
                              <Menu.Item key="3">
                                <Icon type="phone" />
                                <span className="nav-text">
                                    <Link to='/contact'>Contact Us</Link>
                                </span>
                              </Menu.Item>
                            </Menu>
                     </Sider>
                      <Layout>
                        <Header style={{lineHeight: '100px',height: '100px', background: '#fff'}}>
                           <img src={street} alt="logo" style={{height: '100px', width: '200px', float: 'right'}} />
                        </Header>
                        <Content style={{marginTop: "20px",height: '500px'}}>
                            <Route exact path='/about' render={this.renderAbout} />
                            <Route exact path='/' render={this.renderApp} />
                            <Route exact path='/contact' render={this.renderContact} />
                         </Content>
                      </Layout>
                    </Layout>
            </div>
        </BrowserRouter>);
    }
}

export default MyRoutes;
