import React from 'react';
var $ = require('jquery');
var SelectForm = require('./rule_forms.jsx').SelectForm;
var InputForm = require('./rule_forms.jsx').InputForm;

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';

import Divider from 'material-ui/Divider';

import Paper from 'material-ui/Paper';

var RulesItem = React.createClass({
  render: function() {
    return (
      <div className='rules__item'>
        <span className='rules__item__block'>if</span>
        &nbsp;
        <SelectForm
          {...this.props}
          fieldType='metric'
          options={['', 'CPU', 'RAM']}/>
        &nbsp;
        <SelectForm
          {...this.props}
          fieldType='sign'
          options={['', 'more', 'less']}/>
        &nbsp;
        <span className='rules__item__block'>than</span>
        &nbsp;
        <InputForm
          {...this.props}
          fieldType='value'
          type='text'/>
        &nbsp;
        <span className='rules__item__block'>then</span>
        &nbsp;
        <SelectForm
          {...this.props}
          fieldType='action'
          options={['', 'buy', 'sell']}/>
      </div>
    );
  }
});


var BlankRulesItem = React.createClass({
  getInitialState: function() {
    return {
      readyToSend: false,
      blankItemData: {},
      blank: true
    };
  },
  send: function(field, value) {
    this.state.blankItemData[field] = value;
    this.updateReady();
  },
  updateReady: function() {
    var obj = this.state.blankItemData,
        readyToSend = true;

    Object.keys(obj).forEach(function(key, index) {
      if(obj[key] == '')
        readyToSend = false;
    });

    if(Object.keys(obj).length!=4) // number of forms
      readyToSend = false;

    this.setState({
      readyToSend : readyToSend
    });
  },
  save: function(event) {
    $.ajax({
      type: 'POST',
      url: '/api/rules/',
      data: this.state.blankItemData
    }).done(function(data) {

      Object.assign(this.state.blankItemData, {'id': data.id});
      this.props.append(this.state.blankItemData);

      this.props.toggleBlank();

    }.bind(this)).fail(function(data) {
      console.log('Post fail:', data);
    });

  },
  render: function() {
    return(
      <div className='rules__item__wrapper rules__item__wrapper_blank'>
        <RulesItem send={this.send} blank={this.state.blank}/>
        {this.state.readyToSend ?
          <i onClick={this.save} className='material-icons rules__save'>forward</i>
        : null}
      </div>
    );
  }
});


var SetRulesItem = React.createClass({
  getInitialState: function() {
    return {
      showCross: false
    };
  },
  send: function(field, value) {
    this.modifyItemData(field, value);
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
  toggleCross: function(showCross) {
    this.setState({
      showCross: showCross
    });
  },
  deleteItem: function(event) {
    var data = {
      id: this.props.item.id
    };

    $.ajax({
        type: 'DELETE',
        url: '/api/rules/',
        data: data
    }).done(function(data) {
      console.log('DELETE success', data);
    }).fail(function(data) {
      console.log('DELETE fail', data);
    });

    this.props.remove(event.target.parentElement);
  },
  render: function() {
    return(
      <div className='rules__item__wrapper' onMouseEnter={this.toggleCross.bind(this, true)} onMouseLeave={this.toggleCross.bind(this, false)}>
        <RulesItem send={this.send} {...this.props} />
        {this.state.showCross ?
          <i onClick={this.deleteItem} className='material-icons rules__cross'>clear</i>
        : null }
      </div>
    );
  }
});


var RulesList = React.createClass({
  getInitialState: function() {
    return {
      showBlank: false,
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
  removeItem: function(item) {
    item.parentElement.removeChild(item);
  },
  appendItem: function(item) {
    this.state.rulesList.push(item);
    this.forceUpdate();
  },
  toggleBlank: function() {
    this.setState({
      showBlank: !this.state.showBlank
    });
  },
  render: function() {
    var removeItem = this.removeItem, appendItem = this.appendItem;
    return (
      <div className='rules'>
        <div className='rules__list'>
          <div className='rules__header'>Rule list</div>
          <Paper zDepth={1}>
              {this.state.rulesList.map(function(item, rank) {
                return (
                  <div key={rank}>
                    <SetRulesItem remove={removeItem} item={item}/>
          
                  </div>);
              })}
              {this.state.showBlank ?
                <div>
                  <BlankRulesItem toggleBlank={this.toggleBlank} append={appendItem}/>
                  <Divider/>
                </div>
              : null}
          </Paper>

          {this.state.showBlank ? null :
            <FloatingActionButton className='rules__plus' onClick={this.toggleBlank}>
              <ContentAdd />
            </FloatingActionButton>
          }
        </div>
      </div>
    );
  }
});


var Rules = React.createClass({
  render: function() {
    return (
      <div className="">
        <main className="">
            <RulesList/>
        </main>

      </div>
    );
  }
});


module.exports = Rules;
