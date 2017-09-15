import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import {
  Card,
  List,
  ListItem,
  Button,
  FormInput,
  Icon
} from 'react-native-elements';

import Actions from '../actions';

class ListManagement extends Component {

  constructor(props) {
    console.log('ListManagement props: ', props);

    super(props);

    this.state = {
      listInFocus: null,
      newListName: null,
      newItemText: null
    };

    this.addList = this.addList.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.addItem = this.addItem.bind(this);
    this.designateListToEdit = this.designateListToEdit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  };

  static navigationOptions = {
    header: null,
  }

  renderListItem(item) {
    return (
      <ListItem
        key={item.itemKey}
        title={item.text}
        hideChevron={true}
      />
    );
  }

  renderList(list) {
    return (
      <Card title={list.name || "<< No Name >>"} key={list.name}>
        <Text style={{textAlign: 'center'}}>Currently: {list.selected ? 'Active' : 'Disabled'}</Text>
        <List>
          { 
            Array.isArray(list.items) ? 
            list.items.map((item, index) => this.renderListItem(item, index)) 
            : null
          }
        </List>
        <Button
          backgroundColor="green"
          icon={{name: "build"}}
          title="Edit List"
          font-size={14}
          onPress={() => {
            this.designateListToEdit(list.name);
          }}
        />
      </Card>
    );
  }

  renderListItemInFocus(item) {
    return (
      <ListItem
        key={item.itemKey}
        title={item.text}
        rightIcon={{name:"delete", color: "red"}}
        onPressRightIcon={() => {
          this.deleteItem(item.itemKey);
        }}
      />
    );
  }

  renderListInFocus(list) {
    return (
      <Card title={list.name || "<< No Name >>"} key={list.name}>
        <Text style={{textAlign: 'center'}}>Currently: {list.selected ? 'Active' : 'Disabled'}</Text>
        <List>
          { 
            Array.isArray(list.items) ?
            list.items.map((item, index) => this.renderListItemInFocus(item, index)) :
            null
          }
        </List>
        <TextInput
          style={{height: 40, paddingHorizontal: 5, marginTop: 15, borderColor: '#ddd', borderRadius: 3, borderWidth: 2, marginBottom: 15}}
          placeholder={'New Item Text'}
          onChangeText={(newItemText) => this.setState({newItemText})}
          value={this.state.newItemText}
        />
        <Button
          backgroundColor="skyblue"
          icon={{name: "note-add"}}
          title="Add List Item"
          font-size={14}
          style={{marginBottom: 15}}
          onPress={this.addItem}
        />
        <Button
          backgroundColor="seagreen"
          icon={{name: "done"}}
          title={list.selected ? 'Deactivate List' : 'ActivateList'}
          font-size={14}
          onPress={() => {
            this.toggleListSelectedState(list.selected);
          }}
        />
        <Button
          backgroundColor="red"
          icon={{name: "delete-forever"}}
          title="Delete This List"
          font-size={14}
          onPress={() => {
            this.deleteList(list.name)
          }}
        />
        <Button
          backgroundColor="orange"
          title="Close Editor"
          font-size={14}
          onPress={() => {
            this.designateListToEdit(null);
          }}
        />
      </Card>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView keyboardDismissMode='on-drag' keyboardShouldPersistTaps={'handled'}>
          {
            this.props.lists ?
            this.props.lists.map(list =>
              this.state.listInFocus === list.name ?
              this.renderListInFocus(list) :
              this.renderList(list)
            ) : <Text>No Lists</Text>
          }
          <Card>
            <TextInput
              style={{height: 40, paddingHorizontal: 5, borderColor: '#ddd', borderRadius: 3, borderWidth: 2, marginBottom: 15}}
              placeholder="New List Name"
              onChangeText={(newListName) => this.setState({newListName})}
              value={this.state.newListName}
            />
            <Button
              raised
              icon={{name: 'library-add'}}
              title='New List'
              backgroundColor="dodgerblue"
              onPress={this.addList}
            />
          </Card>
        </ScrollView>
      </View>
    );
  }

  deleteList(listName) {
    this.props.actions.deleteList(this.state.listInFocus);
    this.setState({listInFocus: ''});
  }

  addList() {
    this.props.actions.addList(this.state.newListName);
    this.setState({newListName: ''});
  }

  addItem() {
    this.props.actions.addItem(this.state.listInFocus, this.state.newItemText);
    this.setState({newItemText: ''});
  }

  deleteItem(itemKey) {
    this.props.actions.deleteItem(this.state.listInFocus, itemKey);
  }

  designateListToEdit(listName) {
    this.setState({listInFocus: listName, newItemText: ''});
  }

  toggleListSelectedState(currentlySelected) {
    if (currentlySelected) {
      this.props.actions.deactivateList(this.state.listInFocus);
    } else {
      this.props.actions.activateList(this.state.listInFocus);
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

function mapStateToProps(state) {
  console.log('state: ', state);
  return {
    lists: state.listStore.lists
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListManagement);