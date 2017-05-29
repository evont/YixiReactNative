import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import {fetchHome} from '../api';
import Spinner from 'react-native-spinkit';

export default class Home extends Component{
  constructor(props) {
    super(props);
    this.state = {
      albumList : null,
      loadingState : true
    }
  }
  // async componentDidMount() {
  //    let album = await fetchHome();
  //    this.setState({
  //      albumList : album,
  //      loadingState : false
  //    })
  // }
  render() {
     return (
        <View style={styles.container}>
            {this.state.loadingState ?
                <View style={styles.loadingContainer}>
                    <Spinner isVisible={true}
                             size={50}
                             type='ThreeBounce'
                             color='#cc3434'/>
                </View>
                :
                <Text onPress={ () => this.props.navigation.openDrawer()}>home</Text>
            }
        </View>
     )
  }
}

const styles = StyleSheet.create({
  container : {
     flex: 1,
     paddingTop : 30
  },
  loadingContainer : {
     flex : 1,
     justifyContent : 'center',
     alignItems : 'center'
  }
})
