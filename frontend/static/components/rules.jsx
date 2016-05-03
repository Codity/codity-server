import React from 'react';
var http = require('http');
//import 'whatwg-fetch';
var $ = require('jquery');

// var fetchedRules;
// fetch('/api/rules/', {
//     method: 'get'
//   })
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(json) {
//     fetchedRules = json;
//   });




var RulesItem = React.createClass({
  getInitialState: function() {
    if(this.props.item) { // data-based form
      var state = {
        metric: this.props.item.metric,
        sign: this.props.item.sign,
        value: this.props.item.value,
        action: this.props.item.action,
        id: this.props.item.id
      };
    } else { // new form
      var state = {
        metric: '',
        sign: '',
        value: '',
        action: ''
      };
    };

    return state;
  },
  componentWillMount: function() {
    
  },
  componentDidMount: function() {
  },
  change: function(goal, event) {
    var newState = {};
    newState[goal] = event.target.value;
    this.setState(newState);
  },
  send: function() {
    console.log('send', this.state);

    if(this.props.item) { // data-based form
      $.ajax({
        type: 'PUT',
        url: '/api/rules/',
        data: this.state
      }).done(function(data) {
        console.log('Put success', data);
      }).fail(function(data) {
        console.log('Put fail', data);
      });
    } else { // new form
      $.ajax({
        type: 'POST',
        url: '/api/rules/',
        data: this.state
      }).done(function(data) {
        console.log('Post success:', data);
      }).fail(function(data) {
        console.log('Post fail:', data);
      });
    }


    $.ajax({
      type: 'GET',
      url: '/api/rules/'
    }).done(function(data) {
      console.log(data);
    });

  },

  render: function() {
    return (
      <div>
        <div className='rules__item'>

        if

        <select onChange={this.change.bind(this, 'metric')} value={this.state.metric}>
          {['', 'CPU', 'RAM'].map(function(item, rank) {
            return <option key={rank} value={item}>{item}</option>;
          })}
        </select>

        <select onChange={this.change.bind(this, 'sign')} value={this.state.sign}>
          {['', 'more', 'less'].map(function(item, rank) {
            return <option key={rank} value={item}>{item}</option>;
          })}
        </select>

        than

        <input type='text' onChange={this.change.bind(this, 'value')} value={this.state.value}/>

        then

        <select onChange={this.change.bind(this, 'action')} value={this.state.action}>
          {['', 'buy', 'sell'].map(function(item, rank) {
            return <option key={rank} value={item}>{item}</option>;
          })}
        </select>
        <button onClick={this.send}>send</button>
        </div>
      </div>
    );
  }
});


var RulesList = React.createClass({
  getInitialState: function() {
    return {
      rulesList: []
    };
  },
  componentWillMount: function() {

  },
  componentDidMount: function() {

    // at first: get data
    $.ajax({
      type: 'GET',
      url: '/api/rules/'
    }).done(function(result) {

      this.setState({
        rulesList: result.results
      });

    }.bind(this));



  },
  componentWillUnmount: function() {
  },
  render: function() {
    return (
      <div>
        <div>rules</div>
        <div>
          {this.state.rulesList.map(function(item, rank) {
            return <RulesItem key={rank} item={item}/>;
          })}
        </div>
      </div>
    );
  }
});


var Rules = React.createClass({
  render: function() {
    return (
      <div>
        <RulesList/>
        new rule:
        <RulesItem/>
      </div>
    );
  }
});

module.exports = Rules;
