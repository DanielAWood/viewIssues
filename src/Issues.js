import React, { Component } from 'react';
import './Issues.css'
import moment from 'moment'
var datetime = moment().subtract(7,'days').format();
var formatDateTime = datetime.slice(0,-6)
var displayDateTime=moment().subtract(7,'days').format('MM/DD/YYYY');
const API = 'https://api.github.com/repos/angular/angular/issues?since='+formatDateTime+'Z';
class Issues extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          data: [],
          title: "",
          body: null,
          user: [],
          assignee: []
        };
      }
    
      componentDidMount() {
        fetch(API)
          .then(results => results.json())
          .then(
            (data) => {
              this.setState({
                isLoaded: true,
                data: data,
                title: data.title,
                body: data.body,
                user: data.user,
                assignee: data.assignee
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }
    
      render() {
        const { error, isLoaded, data } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
            return (
            <div className="Issue">
            <header className="Issue-header">
            <ul>
                <div>Issues since {displayDateTime}</div>
                
            </ul>         
            </header>
            <div class="Issue-row">
                        <div class="Issue-column">
                        Title
                        </div>
                        <div class="Issue-logincolumn">
                        User
                        </div>
                        <div class="Issue-logincolumn">
                        Assignee
                        </div>
                        <div class="Issue-lastcolumn">
                        Body
                        </div>
            </div>
            { data.map((item, i) => {
              if(!item.pull_request){
                if(item.assignee && item.assignee.login &&item.user && item.user.login){
    				return <div class="Issue-row">
                    <div class="Issue-column">
                     {item.title}
                        </div>
                        <div class="Issue-logincolumn">
                     {item.user.login}
                        </div>
                        <div class="Issue-logincolumn">
                       {item.assignee.login}
                        </div>
                        <div class="Issue-lastcolumn">
                       {item.body}
                        </div>
                    </div>
                }
                else if(item.user && item.user.login){
                    return <div class="Issue-row">
                    <div class="Issue-column">
                     {item.title}
                        </div>
                        <div class="Issue-logincolumn">
                        {item.user.login}
                        </div>
                        <div class="Issue-logincolumn">
                        {'\u00A0'}
                        </div>
                        <div class="Issue-lastcolumn">
                       {item.body}
                        </div>
                    </div>
                }
                else if(item.assignee && item.assignee.login){
                    return <div class="Issue-row">
                    <div class="Issue-column">
                     {item.title}
                        </div>
                        <div class="Issue-logincolumn">
                        {'\u00A0'}
                        </div>
                        <div class="Issue-logincolumn">
                       {item.assignee.login}
                        </div>
                        <div class="Issue-lastcolumn">
                       {item.body}
                        </div>
                    </div>
                }
                else{
                    return <div class="Issue-row">
                    <div class="Issue-column">
                     {item.title}
                        </div>
                        <div class="Issue-logincolumn">
                        {'\u00A0'}
                        </div>
                        <div class="Issue-logincolumn">
                        {'\u00A0'}
                        </div>
                        <div class="Issue-lastcolumn">
                       {item.body}
                        </div>
                    </div>
                }
              }
            })}
            
            </div>       
          );
        }
      }
    }
    export default Issues;