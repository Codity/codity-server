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


var SelectForm = React.createClass({
  getInitialState: function() {
    return{
      value: this.props.initialValue,
      valid: !!this.props.initialValue
    };
  },
  change: function(event) {
    var newValue = event.target.value,
        validity = !!newValue;
    console.log('valid', validity)

    if(validity) {
      this.props.modify(this.props.fieldType, newValue);
    }

    this.setState({
      value: newValue,
      valid: validity
    });

  },
  render: function() {
    return(
      <select
        className={this.state.valid ? 'select' : 'select select__invalid'}
        onChange={this.change}
        value={this.state.value}>

        {this.props.options.map(function(item, rank) {
          return <option key={rank} value={item}>{item}</option>;
        })}

      </select>
    );
  }
});


var InputField = React.createClass({
  validate: function(arg) {
    //console.log(arg, String(arg), String(arg).match(/^[\d]+$/g));
    return !!(String(arg).match(/^[\d]+$/g))
  },
  getInitialState: function() {
    return{
      value: this.props.initialValue,
      valid: this.validate(this.props.initialValue)
    };
  },
  change: function(event) {
    var newValue = event.target.value,
        validity = this.validate(newValue);

    this.setState({
      value: newValue,
      valid: validity
    });
  },
  blur: function(event) {
    if(this.state.valid)
      this.props.modify(this.props.fieldType, event.target.value);
  },
  render: function() {
    return(
      <input
        className={this.state.valid ? 'input' : 'input input__invalid'}
        onChange={this.change}
        onBlur={this.blur}
        value={this.state.value}/>
    );
  }
});


var RulesItem = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentWillMount: function() {
  },
  componentDidMount: function() {
  },
 /* validateForm: function(formType, value) {
    if(formType=='value') {
      console.log("val", !!value.match(/^[\d]+$/g));
      return !!value.match(/^[\d]+$/g);
    } else { // formtype == select
      console.log("val", !!value);
      return !!value;
    }
  },*/
  change: function(goal, event) {
    //console.log(goal)
    //var newValue = event.target.value;
    //console.log('change',goal, newValue, i);

    //this.validateForm(goal, newValue);
    //if(this.validateForm(goal, newValue)) {

    //  var newState = {};
    //  newState[goal] = newValue;
    //  this.setState(newState);

     // this.setState({'invalid': false});
   // } else {
    //  this.setState({'invalid': true});
    //}

  },
  modify: function(field, value) {
    // modify method is available only for existing rules
    if(!this.props.item) return;

    var data = {
      id: this.props.item.id,
      field: field,
      value: value
    };

    $.ajax({
        type: 'PUT',
        url: '/api/rules/',
        data: data
    }).done(function(data) {
      console.log('PUT success', data);
    }).fail(function(data) {
      console.log('PUT fail', data);
    });

  },
  send: function() {
    //console.log('send', this.state);

    /*if(this.props.item) { // data-based form
      $.ajax({
        type: 'PUT',
        url: '/api/rules/',
        data: this.state
      }).done(function(data) {
        console.log('Put success', data);
      }).fail(function(data) {
        console.log('Put fail', data);
      });
    } else { // new form*/
      $.ajax({
        type: 'POST',
        url: '/api/rules/',
        data: this.state
      }).done(function(data) {
        console.log('Post success:', data);
      }).fail(function(data) {
        console.log('Post fail:', data);
      });
    //}

    // get data to see it in console
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
          {this.state.invalid ? <p>!!!!</p> : null}
          if

          <SelectForm
            fieldType='metric'
            options={['', 'CPU', 'RAM']}
            initialValue={this.props.item ? this.props.item.metric : ''}
            modify={this.modify}/>

          <SelectForm
            fieldType='sign'
            options={['', 'more', 'less']}
            initialValue={this.props.item ? this.props.item.sign : ''}
            modify={this.modify}/>

          than

          <InputField
            type='text'
            fieldType='value'
            modify={this.modify}
            initialValue={this.props.item ? this.props.item.value : ''}/>

          then

          <SelectForm
            fieldType='action'
            options={['', 'buy', 'sell']}
            initialValue={this.props.item ? this.props.item.action : ''}
            modify={this.modify}/>

          {/* show 'send' button for new rules only */}

          {this.props.item ? null :
            <button onClick={this.send}>send</button>
          }
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
