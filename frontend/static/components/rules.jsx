import React from 'react';
var $ = require('jquery');
var SelectForm = require('./rule_forms.jsx').SelectForm;
var InputForm = require('./rule_forms.jsx').InputForm;


var RulesItem = React.createClass({
  render: function() {
    return (
      <div className='rules__item'>
        if
        <SelectForm
          {...this.props}
          fieldType='metric'
          options={['', 'CPU', 'RAM']}/>
        <SelectForm
          {...this.props}
          fieldType='sign'
          options={['', 'more', 'less']}/>
        than
        <InputForm
          {...this.props}
          fieldType='value'
          type='text'/>
        then
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
  clear: function() {
    this.props.toggleBlank();
   /* var obj = this.state.blankItemData;

    console.log('before',this.state.blankItemData);

    Object.keys(this.state.blankItemData).forEach(function(key, index) {
      obj[key] = '';
    });

    this.setState({
      readyToSend : false
    });*/
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
    console.log("from send", this.state.blankItemData);

    $.ajax({
      type: 'POST',
      url: '/api/rules/',
      data: this.state.blankItemData
    }).done(function(data) {

      Object.assign(this.state.blankItemData, {'id': data.id});
      this.props.append(this.state.blankItemData);

      this.clear();

    }.bind(this)).fail(function(data) {
      console.log('Post fail:', data);
    });

  },
  render: function() {
    return(
      <div>
        <RulesItem send={this.send} blank={this.state.blank}/>
        {this.state.readyToSend ? 
          <button onClick={this.save}>save</button> : null }
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
    console.log("data", data.id);

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
        {this.state.showCross?
          <div onClick={this.deleteItem} className='rules__item__cross'>x</div>
        : null}
        <div className='clear'></div>
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
    console.log('item',item);
    this.state.rulesList.push(item);
    this.forceUpdate();
  },
  toggleBlank: function() {
    this.setState({
      showBlank: !this.state.showBlank
    });
  },
  render: function() {
    console.log("list render!", this.state.showBlank);
    var removeItem = this.removeItem, appendItem = this.appendItem;
    return (
      <div>
        <div>rules</div>
        <div>
          {this.state.rulesList.map(function(item, rank) {
            return <SetRulesItem remove={removeItem} key={rank} item={item}/>;
          })}
        </div>
        
        {this.state.showBlank ? <BlankRulesItem toggleBlank={this.toggleBlank} append={appendItem}/> : <a onClick={this.toggleBlank}>new rule?</a>}
      </div>
    );
  }
});


var Rules = React.createClass({
  render: function() {
    return (
      <div>
        <RulesList/>
      </div>
    );
  }
});


module.exports = Rules;
