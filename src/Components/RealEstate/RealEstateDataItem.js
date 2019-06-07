/*
* This component hold the appointment item
*/

// Imported react component
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

// Imported other components

// Semantic elements imported
import {
    Table,
    Button
}from 'semantic-ui-react';

class RealEstateDataItem extends Component{

    handleMenuClick(url){
        window.open(url, "_blank");
    }

    render(){
        return(
            <Table.Row 
                key={this.props.index}
            >
                <Table.Cell>{this.props.index+1}</Table.Cell>
                <Table.Cell>{this.props.item.name ? this.props.item.name : 'NA'}</Table.Cell>
                <Table.Cell>
                    <Button 
                        content='Buy' 
                        primary 
                        onClick={()=>this.handleMenuClick(this.props.item.url)}
                    />
                </Table.Cell>
            </Table.Row>
        )
    }
}
export default withRouter(RealEstateDataItem); 