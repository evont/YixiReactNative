import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableHighlight
} from 'react-native';
import ParallaxView from 'react-native-parallax-view';

const ScreenWidth = Dimensions.get('window').width;

export default class Detail extends Component{
  constructor(props) {
    super(props);
  }
  render() {
     const { params } = this.props.navigation.state;
     const LectureInfo = params.lectures;
     let bg = LectureInfo.background.replace(".1536x1000","");
     let linkBg = LectureInfo.lectures[0].lecturer.background;
     return (
       <ParallaxView
             backgroundSource={{url : linkBg}}
             windowHeight={160}
         >
           <View style={styles.albumDetail}>
                <View style={styles.albumLecturer} >
                     <Image source={{ url : LectureInfo.lectures[0].lecturer.pic}} style={styles.lecturerAvatar}/>
                     <Text style={styles.lecturetNickName}>{LectureInfo.lectures[0].lecturer.nickname}</Text>
                     <Text style={styles.lecturetDesc}>{LectureInfo.lectures[0].lecturer.desc}</Text>
                </View>
                <View style={styles.albumLecture}>
                     <Text style={styles.lectureTitle}>{LectureInfo.lectures[0].title}</Text>
                     <Text style={styles.lectureTime}>{LectureInfo.lectures[0].time + ' ' + LectureInfo.lectures[0].site}</Text>
                     <View style={styles.lectureDescContainer}>
                       <Text style={styles.lectureDesc}>{LectureInfo.lectures[0].desc}</Text>
                     </View>
                </View>
                <View style={styles.albumVideo}>
                     <Image source={{ url : LectureInfo.lectures[0].cover }} style={styles.videoBg} />
                     <Image source={ require('../images/play.png') } style={styles.videoBtn} />
                </View>
           </View>
         </ParallaxView>
     )
  }
}

const styles = StyleSheet.create({
  container : {
     flex: 1,
     paddingTop : 30
  },
  albumDetail : {
    flex : 1,
  },
  albumLecturer : {
     flex : 1,
     alignItems : 'center',
     justifyContent : 'center',
     paddingVertical : 40,
     marginHorizontal : 8,
     borderBottomWidth :  StyleSheet.hairlineWidth,
     borderBottomColor : '#666'
  },
  lecturerAvatar : {
     position : 'absolute',
     height : 60,
     width : 60,
     borderRadius : 31,
     borderWidth : 2,
     borderColor : '#fff',
     backgroundColor : '#fff',
     zIndex : 5,
     top : -30
  },
  lecturetNickName : {
     fontSize : 14,
     fontWeight : '200'
  },
  lecturetDesc : {
    fontSize : 10,
    fontWeight : '100',
    marginTop : 12
  },
  albumLecture : {
     alignItems : 'center',
     paddingVertical : 20
  },
  lectureTitle : {
     fontSize : 18,
     color : '#cc3434',
     fontWeight : '200'
  },
  lectureTime : {
     marginVertical : 10,
     fontSize : 10,
     color : '#666',
     fontWeight : '200'
  },
  lectureDescContainer : {
     flexWrap : 'nowrap',
     flex : 1,
     marginHorizontal : 8,
     paddingLeft : 10,
     borderLeftColor : '#cc3434',
     borderLeftWidth : 4,
  },
  lectureDesc : {
     flex : 1,
     fontSize : 14,
     fontWeight : '100',
     lineHeight : 16
  },
  albumVideo : {
     flex : 1,
     height : 150,
     alignItems : 'center',
     backgroundColor : '#ccc'
  },
  videoBg : {
     resizeMode : 'cover',
     height : 150,
     width : ScreenWidth,
     zIndex : 1
  },
  videoBtn : {
     position : 'absolute',
     width : 40,
     height : 40,
     top : 50,
     zIndex : 5,
     backgroundColor : '#fff',
     borderRadius : 20
  }
})
