import React from 'react';
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
  render: function() {//console.log("select", this.props);
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


var InputForm = React.createClass({
  delayer: undefined,
  delay: 1000,
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
  delayedChange: function(event) {
    event.persist(); // this is needed for timeout

    var newValue = event.target.value,
        validity = this.validate(newValue);

    this.setState({
      value: newValue,
      fieldIsValid: validity,
      blank: false
    });

    if(typeof(this.delayer) != 'undefined')
      clearTimeout(this.delayer);

    this.delayer = setTimeout(function(self) {
      if(validity)
        self.props.send(self.props.fieldType, event.target.value);

      if(!validity && self.props.blank) {// this.props.blank means that rule is new 
        self.props.send(self.props.fieldType, '');
      }
    }, this.delay, this);
  },
  render: function() {
    return(
      <input
        className={classNames({
          'input': true,
          'input_invalid': !this.state.fieldIsValid,
          'input_blank': this.state.blank
        })}
        onChange={this.delayedChange}
        value={this.state.value}/>
    );
  }
});


module.exports = {
  SelectForm: SelectForm,
  InputForm: InputForm
};
