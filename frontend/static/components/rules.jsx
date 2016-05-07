import React from 'react';
var http = require('http');
var $ = require('jquery');
var classNames = require('classnames');


var SelectForm = React.createClass({
  getInitialState: function() {
    var initialValue = this.props.item ?
      this.props.item[this.props.fieldType] : '';

    return {
      value: initialValue,
      fieldIsValid: !!initialValue,
      blank: this.props.blank // new item
    };
  },
  change: function(event) {
    var newValue = event.target.value,
        validity = !!newValue;

    if(validity || this.props.blank)
      this.props.send(this.props.fieldType, newValue);

    this.setState({
      value: newValue,
      fieldIsValid: validity,
      blank: false // once we touch it, we will validate it
    });

  },
  render: function() {
    return(
      <select
        className={classNames({
          'select': true,
          'select_invalid': !this.state.fieldIsValid,
          'select_blank': this.state.blank
        })}
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
    return !!(String(arg).match(/^[\d]+$/g))
  },
  getInitialState: function() {
    var initialValue = this.props.item ?
      this.props.item[this.props.fieldType] : '';

    return {
      value: initialValue,
      fieldIsValid: this.validate(initialValue),
      blank: this.props.blank
    };
  },
  change: function(event) {
    var newValue = event.target.value,
        validity = this.validate(newValue);

    if(validity)
      this.props.send(this.props.fieldType, event.target.value);

    if(!validity && this.props.blank) // this.props.blank means that rule is new
      this.props.send(this.props.fieldType, '');

    this.setState({
      value: newValue,
      fieldIsValid: validity,
      blank: false
    });
  },
  blur: function(event) {
    if(this.state.fieldIsValid)
      this.props.send(this.props.fieldType, event.target.value);
  },
  render: function() {
    return(
      <input
        className={classNames({
          'input': true,
          'input_invalid': !this.state.fieldIsValid,
          'input_blank': this.state.blank
        })}
        onChange={this.change}
        onBlur={this.blur}
        value={this.state.value}/>
    );
  }
});


var RulesItem = React.createClass({
  getInitialState: function() {
    return {
      readyToSend: false
    };
  },
  blankItemData: {},
  send: function(field, value) {
    if(this.props.blank) {
    console.log("field", field)
      this.storeBlankItemData(field, value);
    } else {
      this.modifyItemData(field, value);
    }
  },
  checkBlankItemValidity: function() {
    var obj = this.blankItemData,
        readyToSend = true;

    Object.keys(obj).forEach(function(key, index) {
      console.log(obj[key]);
      if(obj[key] == '')
        readyToSend = false;
    });

    if(Object.keys(obj).length!=4)
      readyToSend = false;

    this.setState({
      readyToSend : readyToSend
    });
  },
  storeBlankItemData: function(field, value) {
    this.blankItemData[field] = value;

    console.log("blankitemdata",this.blankItemData);

    this.checkBlankItemValidity()
    console.log("ready", this.state.readyToSend);
    
  },
  modifyItemData: function(field, value) {
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
  sendNew: function() {
    console.log("from send", this.blankItemData);
    $.ajax({
      type: 'POST',
      url: '/api/rules/',
      data: this.blankItemData
    }).done(function(data) {
      console.log('Post success:', data);
    }).fail(function(data) {
      console.log('Post fail:', data);
    });
  },
  render: function() {
    return (
      <div>
        <div className='rules__item'>
          if

          <SelectForm
            {...this.props}
            fieldType='metric'
            options={['', 'CPU', 'RAM']}
            send={this.send}
            storeBlankItemData={this.storeBlankItemData}/>

          <SelectForm
            {...this.props}
            fieldType='sign'
            options={['', 'more', 'less']}
            send={this.send}
            storeBlankItemData={this.storeBlankItemData}/>

          than

          <InputField
            {...this.props}
            fieldType='value'
            send={this.send}
            storeBlankItemData={this.storeBlankItemData}
            type='text'/>

          then

          <SelectForm
            {...this.props}
            fieldType='action'
            options={['', 'buy', 'sell']}
            send={this.send}
            storeBlankItemData={this.storeBlankItemData}/>

          {/* show 'send' button for new rules only */}
          {(!this.props.item && this.state.readyToSend) ? 
            <button onClick={this.sendNew}>send</button> : null
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
  componentDidMount: function() {
    // at first we get data
    $.ajax({
      type: 'GET',
      url: '/api/rules/'
    }).done(function(result) {
      this.setState({
        rulesList: result.results
      });
    }.bind(this));
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
        <RulesItem blank/>
      </div>
    );
  }
});

module.exports = Rules;
