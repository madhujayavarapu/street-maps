/*eslint-disable*/
import React, { Component } from 'react';
import street from 'images/street.svg';
import { Input,Button, Search,icon,Label,Header, Accordion, Segment,Sidebar ,Feed,Table,Image} from 'semantic-ui-react';
import {  Menu,Icon,Affix, notification,Anchor,Layout, Badge,Row,Col,Card,Pagination} from 'antd';


class Header extends Component{
    
    render(){
        return(
            <div style={{background:'',position:'relative'}}>

			<div >
				<Card  bodyStyle={{padding:'0px'}} style={{background:'#FFF' }}>
					<div style={{marginTop:'7px'}}>
					   <div style={{marginTop: "0px",float:'left'}}>
						   <img src={street} style={{width:'70px',height:'50px',marginLeft:'40px'}}/>
						</div>
						
						 <div style={{padding:'10px',float:'right'}}>
							<a href="/about"><Button color='black' style={{borderRadius:'5px',lineHeight:'17px',textAlign:'center',fontSize:'14px',fontFamily:'Circular Std,sans-serif'}} >About</Button></a>
						</div>
						
						<div style={{padding:'10px',float:'right'}}>
							<a href="/"><Button color='black' style={{borderRadius:'5px',lineHeight:'17px',textAlign:'center',fontSize:'14px',fontFamily:'Circular Std,sans-serif'}} >Maps</Button></a>
						</div>

                       
						
						
					</div>
				</Card>
		  </div> 
		</div>
        );
    }

}


export default Header;
