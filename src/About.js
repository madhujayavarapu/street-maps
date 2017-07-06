/*eslint-disable*/
import React, { Component } from 'react';
import about from './about.svg';
import {  Row,Col,Card} from 'antd';

class About extends Component{
    render(){
        
        return(
        
            <div>
               <div  bodyStyle={{ padding: "6px" }} style={{ marginTop:"20px",height:'600px',marginLeft:'20px'}}>
                      <Row>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{width:'100%',background:'yellow',height:"auto"}}>
                        <div style={{marginLeft:'20px',marginRight:'30px'}}>
                        <h1>About Us</h1>
                       
                        <p style={{marginTop:'30px',fontFamily:'Times New Roman',fontSize:'15px'}}>Street is a social enterprise that is 
                        working tirelessly to forge a 
                        framework of solutions to end 
                        homelessness in urban areas by 
                        factorization of homeless.
                        </p>
                         <p style={{marginTop:'30px',fontFamily:'Times New Roman',fontSize:'15px'}}>
                       We do events like feedings,street stores etc to interact
                       & infer on ground factors of homeless  which we use to materialize solutions.
                        </p>
                         <p style={{marginTop:'30px',fontFamily:'Times New Roman',fontSize:'15px'}}>
                         We invite multiple entities to use street as a platform to conduct &
                         channelize their activities to curb homelessness.
                        </p>
                          <p style={{marginTop:'30px',fontFamily:'Times New Roman',fontSize:'15px'}}>
                          Based on the data procured from activities
                          we design solutions and execute them on streets
                          with our volunteers who strongly share & believe in our
                          vision.After measuring the impact metrics we add the 
                          solution as an instructable to our playbook.
                          </p>
                           <p style={{marginTop:'30px',fontFamily:'Times New Roman',fontSize:'15px'}}>
                        To make the model self-sustainable and less dependent on extramural funds,we train and hire
                        homeless to manufacture and sell few products.
                        </p>
                        </div>
                        </Col>    
                     </Row>
              </div> 
          </div>
        );
        
        
    }
}


export default About;