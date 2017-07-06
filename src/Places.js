/*eslint-disable*/
import React, { Component } from 'react';

class Places extends Component{
    render(){
        
        return(
           <div>    
            <form onSubmit={this.handleFormSubmit}>
                <PlacesAutocomplete inputProps={inputProps} /><br /><br />
                <Button type="primary" htmlType="submit">Search</Button>
              </form>
           </div> 
        );
    }
}


export default Places;