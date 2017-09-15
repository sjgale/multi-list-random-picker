import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Card,
  List,
  ListItem,
  Button,
  Icon,
  Text
} from 'react-native-elements';
import h from '../utils/helpers';

import Actions from '../actions';

class RandomizeScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentString: ''
    };

    this.clearHistory = this.clearHistory.bind(this);
    this.randomize = this.randomize.bind(this);
  };

  static navigationOptions = {
    title: 'Randomize',
  };

  clearHistory() {
    this.props.actions.clearHistory();
  }

  randomize() {
    let randomStringElements = [];

    for (list of this.props.lists) {
      if (list.selected) {
        const listItem = h.getRandomArrayItem(list.items);
        randomStringElements.push(listItem.text);
      }
    }

    let randomString = randomStringElements.length > 0 
      ? randomStringElements.join(' ')
      : 'No Lists Selected';
      
    this.props.actions.storeString(randomStringElements.join(' '));
  }

  render() {
    const currentRandString = this.props.strings && this.props.strings[0] ? this.props.strings[0].text : '[Empty]';

    return (
      <ScrollView style={styles.container}>
        <Text 
          style={{
            textAlign: 'center',
            fontSize: 28,
            paddingBottom: 12
          }}
        >{currentRandString}</Text>
        <Button
          backgroundColor="dodgerblue"
          icon={{name: "grade"}}
          title="Randomize!"
          font-size={18}
          onPress={this.randomize}
        />
        <Button
          backgroundColor="gold"
          icon={{name: "delete"}}
          title="Clear History"
          font-size={18}
          onPress={this.clearHistory}
        />
        <Card title="Past Random Strings">
          <List>
            {
              this.props.strings ?
              this.props.strings.map(item =>
                <ListItem
                  key={item.stringKey}
                  title={item.text}
                  hideChevron={true}
                />
              ) :
              null
            }
          </List>
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

function mapStateToProps(state) {
  console.log('state: ', state);
  return {
    lists: state.listStore.lists,
    strings: state.randomizerStore.strings
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
)(RandomizeScreen);
