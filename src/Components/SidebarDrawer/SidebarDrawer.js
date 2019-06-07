/*
* This component hold the sidebar drawer screen
*/

import React, {Component} from 'react';

import './SidebarDrawer.css';
// Semantic elements imported
import {
    Header,
    Icon,
    Grid,
    Button
}from 'semantic-ui-react';

export default class SidebarDrawer extends Component{
    render(){
        return(
            <div>
                <div className={this.props.isOpenSidebarDrawer ? 'sidebar-drawer open' : 'sidebar-drawer'}>
                <Header as='h3'>
                    <Icon 
                        name='chevron left'
                        onClick={()=>this.props.closeSidebarDrawer()}
                        style={{
                            fontSize: '1em',
                            color: '#4CC2C6',
                            paddingTop: '1px',
                            cursor: 'pointer'
                        }}/>
                    <Header.Content>{this.props.title}</Header.Content>
                    
                    <div className='drawer-body'>
                        {this.props.children}
                    </div>

                    <Grid columns={1}>
                        <Grid.Row>
                            <Grid.Column>
                                <Button 
                                    content='Cancel' 
                                    icon='close' 
                                    labelPosition='left' 
                                    style={{marginRight: '20px'}}
                                    color='red'
                                    onClick={()=>this.props.closeSidebarDrawer()}
                                />
                                <Button 
                                    content='Reset' 
                                    icon='repeat' 
                                    labelPosition='left' 
                                    style={{marginRight: '20px'}} 
                                    loading={this.props.isResetFilterLoading}
                                    onClick={()=>this.props.resetFilter()}
                                />
                                <Button 
                                    content='Filter' 
                                    icon='check' 
                                    labelPosition='left'
                                    color='primary'
                                    loading={this.props.isFilterLoading}
                                    onClick={()=>this.props.filterDataList()}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Header>
                </div>
                {
                    this.props.isOpenSidebarDrawer &&
                    <div 
                        className='dark-overlay'
                    />
                }
            </div>
        )
    }
}

