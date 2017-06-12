import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableHighlight
} from 'react-native';
import Spinner from 'react-native-spinkit';
import ParallaxView from 'react-native-parallax-view';
import {fetchLectureItem} from '../api';
import global_style from '../global_style';
const ScreenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container : {
     flex: 1,
  },
  albumDetail : {
    flex : 1,
  },
  albumLecturer : {
     flex : 1,
     alignItems : 'center',
     justifyContent : 'center',
     paddingVertical : 60,
     marginHorizontal : 12,
     borderBottomWidth :  StyleSheet.hairlineWidth,
     borderBottomColor : '#999'
  },
  lecturerAvatar : {
     position : 'absolute',
     height : 80,
     width : 80,
     borderRadius : 41,
     borderWidth : 2,
     borderColor : '#fff',
     backgroundColor : '#fff',
     zIndex : 5,
     top : -40
  },
  lecturetNickName : {
     fontSize : 20,
     fontWeight : '200'
  },
  lecturetDesc : {
    fontSize : 14,
    fontWeight : '100',
    marginTop : 16,
    color : '#999',
  },
  albumLecture : {
     alignItems : 'center',
     paddingVertical : 32
  },
  lectureTitle : {
     fontSize : 26,
     color : '#cc3434',
     fontWeight : '300'
  },
  lectureTime : {
     marginVertical : 16,
     fontSize : 14,
     color : '#999',
     fontWeight : '100'
  },
  lectureDescContainer : {
     alignSelf : 'flex-start',
     marginHorizontal : 12,
     paddingLeft : 14,
     borderLeftColor : '#cc3434',
     borderLeftWidth : 4,
  },
  lectureDesc : {
     fontSize : 18,
     fontWeight : '100',
     lineHeight : 24,
     color : '#666'
  },
  albumVideo : {
     flex : 1,
     height : 150,
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
  albumShortContent : {
     flex : 1,
     marginHorizontal : 12,
     marginVertical : 32,
  },
  purecontent : {
     fontSize : 18,
     fontWeight : '100',
     marginVertical : 24,
     lineHeight : 24,
     color : '#666'
  },
  navigateBtn : {
    borderWidth : 1,
    borderColor : '#cc3434',
    borderRadius : 6,
    width : 180,
    height : 40,
    alignItems : 'center',
    justifyContent : 'center',
    alignSelf : 'center',
  },
  navigateText : {
    color : '#cc3434',
    fontSize : 22
  }
})
export default class Detail extends Component{
  constructor(props){
    super(props);
    this.state = {
      lectureData : [],
      DataIdArr : [],
      loadingState : true
    }
    this.setState = this.setState.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.changeState = this.changeState.bind(this);
    this._onTouchEnd = this._onTouchEnd.bind(this);
  }
  async fetchData(lid) {
     return await fetchLectureItem(lid);
  }
  changeState(lid = 420) {
      this.fetchData(lid).then(result => {
          let tmpData = this.state.lectureData;
          let tmpDataArr = this.state.DataIdArr;
          if(tmpDataArr.indexOf(result.data.id) === -1){
            tmpData.push(result);
            tmpDataArr.push(result.data.id);
            this.setState({
              lectureData : [...new Set(tmpData)],
              loadingState : false,
              DataIdArr : tmpDataArr
            });

          }
      })
  }
  _onTouchEnd(e, state, context) {
      let { params } = this.props.navigation.state;
//      alert(state.index);
      this.changeState(419);
  }
  componentDidMount() {
    let { params } = this.props.navigation.state;
    this.changeState(params.lecturesId);
  }
  render() {
     const { params } = this.props.navigation.state;
     let LectureInfo = this.state.lectureData.data;

     return this.state.loadingState ?
                <View style={global_style.loadingContainer}>
                   <Spinner isVisible={true}
                            size={50}
                            type='ThreeBounce'
                            color='#cc3434'/>
                </View>
           : this.state.lectureData.length > 0 ?
                    <LectureItem LectureInfo={this.state.lectureData[0].data} {...this.props}/>
           : <TouchableHighlight style={global_style.hintContainer} onPress={ this.changeState }>
                <Text style={global_style.hintText}>网络异常，请点击重新加载</Text>
             </TouchableHighlight>
  }
}


class LectureItem extends Component {
    constructor(props) {
       super(props);
    }
    render() {
       let LectureInfo = this.props.LectureInfo;
       return <ParallaxView
             backgroundSource={{url : LectureInfo.lecturer.background}}
             windowHeight={180}
         >
           <View style={styles.albumDetail}>
                <View style={styles.albumLecturer} >
                     <Image source={{ url : LectureInfo.lecturer.pic}} style={styles.lecturerAvatar}/>
                     <Text style={styles.lecturetNickName}>{LectureInfo.lecturer.nickname}</Text>
                     <Text style={styles.lecturetDesc}>{LectureInfo.lecturer.desc}</Text>
                </View>
                <View style={styles.albumLecture}>
                     <Text style={styles.lectureTitle}>{LectureInfo.title}</Text>
                     <Text style={styles.lectureTime}>{LectureInfo.time + ' ' + LectureInfo.site}</Text>
                     <View style={styles.lectureDescContainer}>
                       <Text style={styles.lectureDesc}>{LectureInfo.desc}</Text>
                     </View>
                </View>
                <View style={styles.albumVideo}>
                     <Image source={{ url : LectureInfo.cover }} style={styles.videoBg} />
                     <Image source={ require('../images/play.png') } style={styles.videoBtn} />
                </View>
                <View style={styles.albumShortContent}>
                    <Text style={styles.purecontent}>{LectureInfo.purecontent.slice(0,100)}</Text>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate('PureContent', {author: LectureInfo.lecturer.nickname, title: LectureInfo.title, content: LectureInfo.purecontent})}>
                        <View style={styles.navigateBtn}><Text style={styles.navigateText}>完整演讲稿</Text></View>
                    </TouchableHighlight>
                </View>
           </View>
         </ParallaxView>
    }
}
