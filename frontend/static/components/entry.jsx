import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'

import Rules from './rules.jsx'

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

var App = React.createClass({
  getInitialState: function() {
    return {
      'drawerIsOpen': false
    };
  },
  toggleDrawer: function() {
    this.setState({
      'drawerIsOpen': !this.state.drawerIsOpen
    });
  },
  render: function() {
    console.log(this.props);
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <AppBar
            title="Rules"
            onLeftIconButtonTouchTap={this.toggleDrawer}
          />

          <Drawer open={this.state.drawerIsOpen}>

            <Divider/>
            <Link to={'/about'} >
              <MenuItem onClick={this.toggleDrawer}>
                <span className='drawer__link'>about</span>
              </MenuItem>
            </Link>
            <Link to={'/settings'}>
              <MenuItem onClick={this.toggleDrawer}>
                <span className='drawer__link'>settings</span>
              </MenuItem>
            </Link>
          </Drawer>

          {this.props.children}
        </div>
      </MuiThemeProvider>
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

var Index = React.createClass({
  render: function() {
    console.log("render");
    return(
      <div>
      <h1>Index</h1>
      </div>
    );
  }
});

var RulesWrapper = React.createClass({
  render: function() {
    console.log("render");
    return(
      <div>
        <Rules/>

      </div>
    );
  }
});

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index}/>
      <Route path="settings" component={RulesWrapper}/>
      <Route path="about" component={About}/>

      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>,
  document.getElementById('app')
);
