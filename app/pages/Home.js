import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableHighlight
} from 'react-native';
import global_style from '../global_style';
import {fetchHome} from '../api';
import Spinner from 'react-native-spinkit';
import Swiper from 'react-native-swiper';
import ParallaxView from 'react-native-parallax-view';

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container : {
     flex: 1,
  },
  albumHeader : {
     flex : 1,
     paddingHorizontal : 24,
     paddingBottom : 32,
     justifyContent : 'flex-end'
  },
  albumTitle : {
     color : '#fff',
     fontSize : 26,
     fontWeight : '600'
  },
  albumIntro : {
     marginTop : 26,
     lineHeight : 24,
     color : '#fff',
     fontSize : 16,
     fontWeight : '100',
  },
  albumDetail : {
     backgroundColor : '#222',
     paddingHorizontal : 16,
     paddingVertical : 25
  },
  albumContent : {
    color : '#fff',
    fontSize : 18,
    lineHeight : 26,
    fontWeight : '200'
  },
  lectureLink : {
     justifyContent : 'center',
     marginTop : 36,
     height : 120,
     width : ScreenWidth - 32,
     flexWrap : 'nowrap',
     borderRadius : 8
  },
  lectureBg : {
     position : 'absolute',
     top : 0,
     left : 0,
     zIndex : 1,
     height : 120,
     width : ScreenWidth - 32,
     borderRadius : 8
  },
  lectureDesc : {
     flex : 1,
     zIndex : 3,
     paddingLeft : 10,
     justifyContent : 'center',
     borderRadius : 4,
     backgroundColor : 'rgba(0, 0, 0, 0.4)'
  },
  descTitle : {
     color : '#fff',
     fontSize : 18,
     fontWeight : '400'
  },
  descLecturer : {
     color : '#ccc',
     fontWeight : '100',
     fontSize : 14,
     marginTop : 8
  },
  linkIcon : {
     position : 'absolute',
     right : 10,
     top : 44,
     height : 12,
     width : 12,
     zIndex : 3
  }
})

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
                <Swiper loop={false} onMomentumScrollEnd={this._onMomentumScrollEnd} showsPagination={false}>
                   {Array.prototype.filter.call(this.state.albumList.data, (item, k) =>
                       k <= this.state.loadCount
                   ).map( (item, k) =>
                       <AlbumItem album={item} loopKey={k} key={item.id} {...this.props}/>
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
class AlbumItem extends Component {
  constructor(props){
    super(props);
  }
  render() {
    let bg = this.props.album ? this.props.album.background.replace(".1536x1000","") : "";
    let linkBg = this.props.album ? this.props.album.lectures[0].lecturer.background.replace(".1242x505","") : "";
    return <ParallaxView
          backgroundSource={{url : bg}}
          windowHeight={ScreenHeight}
          header={(
              <View style={styles.albumHeader}>
                  <Text style={styles.albumTitle}>{this.props.album ? this.props.album.title : ""}</Text>
                  <Text style={styles.albumIntro}>{this.props.album ? this.props.album.desc : ""}</Text>
              </View>
          )}
      >
        <View style={styles.albumDetail}>
            <Text style={styles.albumContent}>{this.props.album ? this.props.album.purecontent : ""}</Text>
            <TouchableHighlight onPress={ () => this.props.navigation.navigate('Detail', {lectures : this.props.album, lecturesId : this.props.album.lectures[0].id, loopKey : this.props.loopKey}) }>
                <View style={styles.lectureLink}>
                    <Image source={{ url : linkBg }} style={styles.lectureBg}  resizeMode='cover'/>
                    <View style={styles.lectureDesc}>
                        <Text style={styles.descTitle}>{this.props.album.lectures[0].title}</Text>
                        <Text style={styles.descLecturer}>{ this.props.album.lectures[0].lecturer.nickname}</Text>
                    </View>
                    <Image source={require('../images/icon-link.png')} style={styles.linkIcon}/>
                </View>
            </TouchableHighlight>
        </View>
      </ParallaxView>;
  }
}
