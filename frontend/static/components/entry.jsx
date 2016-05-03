import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

import Rules from './rules.jsx'

var App = React.createClass({
  render: function() {
    return (
      <div>
      <h1>apppp</h1>
      {this.props.children}
      </div>
    );
  }
});



var About = React.createClass({
  render: function() {
    return (
      <h1>about!</h1>
    );
  }
});

var NoMatch = React.createClass({
  render: function() {
    return (
      <h1>nomatch</h1>
    );
  }
});



/*var Users = React.createClass({
  render: function() {
    var users= ['ales', 'kiwi'];
    return (
      <div>
        <h1>Users</h1>
        <div className="master">
          <ul>
            {users.map(user => (
              <li key={user.id}><Link to={`/user/${user.id}`}>{user.name}</Link></li>
            ))}
          </ul>
        </div>
        <div className="detail">
          {this.props.children}
        </div>
      </div>
    );
  }
});*/



/*var User = React.createClass({
  componentDidMount: function() {
      this.setState({
        user: findUserById(this.props.params.userId)
      })
    },
  render: function() {
    return (
      <div>
        <h2>{this.state.user.name}</h2>
      </div>
    );
  }
});*/


var RulesWrapper = React.createClass({
  render: function() {
    return(
      <Rules/>
    );
  }
});

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="settings" component={RulesWrapper}/>

      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>,
  document.getElementById('app')
);
