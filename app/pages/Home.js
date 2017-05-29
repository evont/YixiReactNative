import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import global_style from '../global_style';
import {fetchHome} from '../api';
import Spinner from 'react-native-spinkit';
import Swiper from 'react-native-swiper';

export default class Home extends Component{
  constructor(props) {
    super(props);
    this.state = {
      albumList : null,
      loadingState : true,
      loadCount : 8
    }
    this.fetchData = this.fetchData.bind(this);
    this._onMomentumScrollEnd = this._onMomentumScrollEnd.bind(this);
    this.renderList = this.renderList.bind(this);
  }
  async fetchData() {
    let album = await fetchHome();
     this.setState({
       albumList : album,
       loadingState : false
     })
  }
  _onMomentumScrollEnd(e, state, context) {
    state.index === this.state.loadCount ? this.setState({
         loadCount : this.state.loadCount + 8
    }) : '';
  }
  componentDidMount() {
     this.fetchData();
  }
  renderList() {
     return this.state.loadingState ?
                <View style={global_style.loadingContainer}>
                   <Spinner isVisible={true}
                            size={50}
                            type='ThreeBounce'
                            color='#cc3434'/>
                </View>
           : this.state.albumList.data ?
                <Swiper loop={false} onMomentumScrollEnd={this._onMomentumScrollEnd}>
                   {Array.prototype.filter.call(this.state.albumList.data, (item, k) =>
                       k <= this.state.loadCount
                   ).map( item =>
                       <Text key={item.id}>{item.id}</Text>
                   )}
                </Swiper>
           : <TouchableHighlight style={global_style.hintContainer} onPress={ this.fetchData }>
                <Text style={global_style.hintText}>网络异常，请点击重新加载</Text>
             </TouchableHighlight>
  }
  render() {
     return (
        <View style={styles.container}>
            {this.renderList()}
        </View>
     )
  }
}

const styles = StyleSheet.create({
  container : {
     flex: 1,
     paddingTop : 30
  }
})
