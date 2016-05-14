import React from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
var classNames = require('classnames');


var SelectForm = React.createClass({
  getInitialState: function() {
    var initialValue = this.props.item ?
      this.props.item[this.props.fieldType] : 'field';

    return {
      value: initialValue,
      fieldIsValid: !!initialValue,
      blank: this.props.blank, // new item
      dropDown: false
    };
  },
  change: function(item) {
    var newValue = item,
        validity = !!newValue;

    if(validity || this.props.blank)
      this.props.send(this.props.fieldType, newValue);

    this.setState({
      value: newValue,
      fieldIsValid: validity,
      blank: false // once we touch it, we will validate it
    });

  },
  toggleDropDown: function() {
    this.setState({
      dropDown: !this.state.dropDown
    });
  },
  render: function() {
    return(
      <span className='rules__item__block rules__item__block_select'>
        <a className={classNames({
            'select': true,
            'select_invalid': !this.state.fieldIsValid,
            'select_blank': this.state.blank
          })}
          onClick={this.toggleDropDown}>{this.state.value}</a>
        <ul className='select__list'
          onMouseLeave={this.toggleDropDown} value={this.state.value}>

          {this.state.dropDown ?
            this.props.options.map(function(item, rank) {
              return <li onClick={this.change.bind(null, item)} key={rank}>{item}</li>;
            }.bind(this))
          : null}

        </ul>
      </span>
    );
  }
});


var InputForm = React.createClass({
  delayer: undefined,
  delay: 1000,
  minSymbolAmount: 6,
  validate: function(arg) {
    return !!(String(arg).match(/^[\d]+$/g))
  },
  getInitialState: function() {
    var initialValue = this.props.item ?
      this.props.item[this.props.fieldType] : '';

    return {
      value: initialValue,
      fieldIsValid: this.validate(initialValue),
      blank: this.props.blank,
      width: this.adjustWidth(initialValue)
    };
  },
  delayedChange: function(event) {
    event.persist(); // this is needed for timeout
    var newValue = event.target.value,
        validity = this.validate(newValue);

    this.setState({
      value: newValue,
      fieldIsValid: validity,
      blank: false,
      width: this.adjustWidth(newValue)
    });

    if(this.props.blank) {
      if(validity)
        this.props.send(this.props.fieldType, event.target.value);
      else
        this.props.send(this.props.fieldType, '');
    }

    if(typeof(this.delayer) != 'undefined')
      clearTimeout(this.delayer);

    this.delayer = setTimeout(function(self) {
      if(validity)
        self.props.send(self.props.fieldType, event.target.value);
    }, this.delay, this);
  },
  adjustWidth: function(value) {
    var length = String(value).length < this.minSymbolAmount ?
      this.minSymbolAmount : String(value).length;

    return ((length + 1) * 12); // ¯\_(ツ)_/¯
  },
  render: function() {
    return(
      <span className='rules__item__block'>
        <input
          className={classNames({
            'input': true,
            'input_invalid': !this.state.fieldIsValid,
            'input_blank': this.state.blank
          })}
          onChange={this.delayedChange}
          value={this.state.value}
          style={{width: this.state.width + 'px'}}/>
      </span>
    );
  }
});


module.exports = {
  SelectForm: SelectForm,
  InputForm: InputForm
};
