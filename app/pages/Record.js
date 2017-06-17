import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableHighlight
} from 'react-native';
import global_style from '../global_style';
import {fetchRecord} from '../api';
import Spinner from 'react-native-spinkit';
import Swiper from 'react-native-swiper';

const ScreenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container : {
     flex: 1,
     backgroundColor : '#fff'
  },
  albumDetail : {

  },
  albumBg : {
      width : ScreenWidth,
      height : 320,
      resizeMode : 'contain'
  },
  albumLecture : {
      paddingVertical : 16,
      paddingHorizontal : 20
  },
  albumTitle : {
      alignSelf : 'center',
      fontSize : 20,
      fontWeight : '200'
  },
  albumDesc : {
      fontSize : 18,
      lineHeight : 24,
      fontWeight : '100',
      color : '#666',
      marginTop : 30
  },
  albumVideo : {
     flex : 1,
     height : 180,
     marginBottom : 60,
     alignItems : 'center',
     backgroundColor : '#fefefe'
  },
  videoBg : {
     resizeMode : 'cover',
     height : 180,
     width : ScreenWidth,
     zIndex : 1
  },
  videoBtn : {
     position : 'absolute',
     width : 50,
     height : 50,
     top : 65,
     zIndex : 5,
     backgroundColor : '#fff',
     borderRadius : 25
  },
})
export default class Record extends Component{
  constructor(props) {
    super(props);
    this.state = {
      albumList : null,
      loadingState : true
    }
    this.fetchData = this.fetchData.bind(this);
  }
  async fetchData() {
    let album = await fetchRecord();
     this.setState({
       albumList : album,
       loadingState : false
     })
  }
  componentDidMount() {
     this.fetchData();
  }
  render() {
     return (
        <View style={styles.container}>
            {this.state.loadingState ?
                       <View style={global_style.loadingContainer}>
                          <Spinner isVisible={true}
                                   size={50}
                                   type='ThreeBounce'
                                   color='#cc3434'/>
                       </View>
                  : this.state.albumList.data ?
                       <Swiper loop={false} showsPagination={false}>
                          {this.state.albumList.data.map( (item, k) =>
                              <AlbumItem album={item} loopKey={k} key={item.id} {...this.props}/>
                          )}
                       </Swiper>
                  : <TouchableHighlight style={global_style.hintContainer} onPress={ this.fetchData }>
                       <Text style={global_style.hintText}>网络异常，请点击重新加载</Text>
                    </TouchableHighlight>
            }
        </View>
     )
  }
}
class AlbumItem extends Component {
  constructor(props){
    super(props);
  }
  render() {
    let bg = this.props.album.background.replace(/\.\d{4}x\d{4}/g,"");
    return <ScrollView style={styles.albumDetail}>
              <Image source={{ url : bg }}
                     style={styles.albumBg}
                     ref="albumBg"
                     onLoad={ Image.getSize(bg, (width, height) => {
                        this.refs['albumBg'].setNativeProps({
                            style : {
                               height : height * ScreenWidth / width,
                            }
                         })
                       })
                    }
              />
              <View style={styles.albumLecture}>
                     <Text style={styles.albumTitle}>{this.props.album.title}</Text>
                     <Text style={styles.albumDesc}>{this.props.album.desc}</Text>
              </View>
              <View style={styles.albumVideo}>
                     <Image source={{ url : this.props.album.cover }} style={styles.videoBg} />
                     <Image source={ require('../images/play.png') } style={styles.videoBtn} />
              </View>
        </ScrollView>
  }
}
