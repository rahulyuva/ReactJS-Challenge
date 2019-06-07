/*
* This component hold the Event list Screen
*/

// Imported react component
import React, {Component} from 'react';

// Imported other things here
import SidebarDrawer from '../SidebarDrawer/SidebarDrawer';
import RealEstateDataItem from './RealEstateDataItem';

// Import Listing Loader
import ListingLoader from '../LoadingScreen/ListingLoader';
import DateTimePicker from 'react-datetime-picker';

// Imported css
import '../../App.css';
import './RealEstate.css';
import 'react-day-picker/lib/style.css';

// Semantic elements imported
import {
    Header,
    Icon,
    Table,
    Grid,
    Button,
    Form,
    Container,
    Pagination
}from 'semantic-ui-react';
import moment from 'moment';

export default class RealEstateDataList extends Component{
    constructor(props){
        super(props);
        this.state = {
            isErrorLoading: false,
            isOpenSidebarDrawer: false,
            totalPages: 1,
            activePage: 1,
            RealEstateData: [],
            searchTerm: '',
            filterFromDate: '',
            filterToDate: '',
        }
    }

    componentDidMount(){
        this.getRealEstateInfo('isLoading', 1);


        // Enable this code to check real time data update
        /*setInterval(() => {
            this.getRealEstateInfo('isLoading', this.state.activePage);
        }, 5000)*/
    }

    _handleToggleSidebarDrawer = () =>{
        this.setState({
            isOpenSidebarDrawer: !this.state.isOpenSidebarDrawer,
        })
    }

    getRealEstateInfo = (loading, page) => {
        
        if(loading==='isResetFilterLoading'){
            this.setState({isResetFilterLoading: true});
        }
        else if(loading==='isFilterLoading'){
            this.setState({isFilterLoading: true});
        }else{
            this.setState({isLoading: true});
        }

        var fromDate = '';
        var toDate = '';

        if(this.state.filterFromDate){
            fromDate = moment(this.state.filterFromDate).format('YYYY-MM-DDTHH:mm:ss')+'Z';
        }

        if(this.state.filterToDate){
            fromDate = moment(this.state.filterToDate).format('YYYY-MM-DDTHH:mm:ss')+'Z';
        }

        var apiUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?size=15&apikey=5fXAiyK6eWahj6Xoz4YhRTnhpqWBeKzp';
        
        fetch(apiUrl+'&page='+page+
        `&keyword=`+this.state.searchTerm+
        `&startDateTime=`+fromDate+
        `&endDateTime=`+toDate, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(responseJSON => {

            let RealEstateData = [];

            if( responseJSON._embedded !== undefined ){
                RealEstateData = responseJSON._embedded.events;
            }

            this.setState({
                RealEstateData: RealEstateData,
                activePage: responseJSON.page.number,
                totalPages:  Math.ceil(responseJSON.page.totalElements / responseJSON.page.size),
                isLoading: false,
                isFilterLoading: false,
                isResetFilterLoading: false
            });
        })

        .catch( (error) => {
            this.setState({
                isErrorLoading: true,
                isLoading: false,
                isFilterLoading: false,
                isResetFilterLoading: false
            })
        });
    }

    _renderEventRow(){
        if(this.state.RealEstateData.length>0){
            return this.state.RealEstateData.map((item, index)=>{
                return(
                    <RealEstateDataItem
                        item={item}
                        index={index}
                    />
                )
            })
        }
    }

    handleChangeFromDate(fromDate){
        if(fromDate){
            this.setState({
                filterFromDate: fromDate,
            })
        }
        
    }

    handleChangeToDate(toDate){
        if(toDate){
            this.setState({
                filterToDate: toDate,
            })
        }
        
    }


    render(){
        return(
            <div className='dashboard-body'>
				<Header as='h2'>
                    <Icon name='clipboard list'/>
                    <Header.Content>
                        Real Estate List
                    <Header.Subheader>Manage your real estate</Header.Subheader>
                    </Header.Content>
                </Header>

                <Grid columns='one'>
                    <Grid.Row >
                        <Grid.Column textAlign='right'>
                            <Button 
                                icon='filter'
                                onClick={()=>this._handleToggleSidebarDrawer()} 
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <SidebarDrawer
                    title={'Search Events'}
                    isOpenSidebarDrawer={this.state.isOpenSidebarDrawer}
                    closeSidebarDrawer={()=>this._handleToggleSidebarDrawer()}
                    filterDataList={()=>this.getRealEstateInfo('isFilterLoading', 1)}
                    isFilterLoading={this.state.isFilterLoading}
                    isResetFilterLoading={this.state.isResetFilterLoading}
                    resetFilter={()=>this.setState({
                            searchTerm: '',
                            filterFromDate: '',
                            filterToDate: '',
                            isResetFilterLoading: false,
                            isFilterLoading: false
                        }, ()=>this.getRealEstateInfo('isResetFilterLoading', 1))
                    }
                >
                <Form>  
                    <Form.Input 
                        fluid 
                        label='Keyword' 
                        placeholder='Type in' 
                        error={this.state.miUuidError}
                        value={this.state.searchTerm}
                        onChange={ (e) => this.setState({
                            searchTerm: e.target.value
                        }) }
                    />

                    <div>
                        <label style={{display: 'block'}}>From Date</label>
                        <DateTimePicker
                            onChange={(value)=>this.handleChangeFromDate(value)}
                            value={this.state.filterFromDate}
                        />
                    </div>  
                    <div>
                        <label style={{display: 'block', marginTop: '10px'}}>To Date</label>
                        <DateTimePicker
                            onChange={(value)=>this.handleChangeToDate(value)}
                            value={this.state.filterToDate}
                        />
                    </div>  
                </Form>

                </SidebarDrawer>

                <Table celled selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>#</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell style={{width: '100px'}}>Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            this.state.RealEstateData.length>0 ? 
                            this._renderEventRow() : 
                            <Table.Row>
                                <Table.Cell colspan='2' textAlign='center'>
                                    {
                                        this.state.isLoading ? <ListingLoader/> : 'No record found'
                                    }
                                </Table.Cell>
                            </Table.Row>
                        }
                    </Table.Body>
                </Table>
                <Container fluid textAlign='right'>
                    {this.state.totalPages === 1 ? null :
                    <Pagination
                        activePage={this.state.activePage}
                        ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                        firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                        lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                        prevItem={{ content: <Icon name='angle left' />, icon: true }}
                        nextItem={{ content: <Icon name='angle right' />, icon: true }}
                        
                        totalPages={this.state.totalPages}
                        onPageChange={(event, value) => this.setState({
                                RealEstateData: [],
                            }, ()=>this.getRealEstateInfo('isLoading', value.activePage))
                        }
                    />}
                </Container>
            </div>
        )
    }
}