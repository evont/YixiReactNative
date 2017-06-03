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

export default class Detail extends Component{
  constructor(props){
    super(props);
    this.state = {
      lectureData : {},
      loadingState : true
    }
    this.setState = this.setState.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }
  async fetchData() {
    const { params } = this.props.navigation.state;
    let lecture = await fetchLectureItem(params.lecturesId);
     this.setState({
       lectureData : lecture,
       loadingState : false
     })
  }
  componentWillMount() {
    this.fetchData();
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
           : LectureInfo ?
               <ParallaxView
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
                   </View>
                 </ParallaxView>
           : <TouchableHighlight style={global_style.hintContainer} onPress={ this.fetchData }>
                <Text style={global_style.hintText}>网络异常，请点击重新加载</Text>
             </TouchableHighlight>
  }
}

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
  }
})
