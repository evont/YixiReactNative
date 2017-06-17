import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableHighlight
} from 'react-native';
import Spinner from 'react-native-spinkit';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

import global_style from '../global_style';
import {fetchTagList, fetchLecturerList} from '../api';

const ScreenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container : {
     flex: 1,
     backgroundColor : "#fff"
  },
  lecturerContainer : {
      marginTop : 80,
      flex : 1,
      backgroundColor : "#fff"
  },
  barTextStyle : {
      fontWeight : '100',
      fontSize : 14
  },
  underlineStyle : {
      borderTopLeftRadius : 2,
      borderTopRightRadius : 2,
  },
  LecturesContainer : {
      flexDirection : 'row',
      flexWrap : 'wrap',
      backgroundColor : '#efefef'
  },
  lecturerItem : {
      width : ScreenWidth / 3,
      height : 140,
      alignItems : 'center',
      justifyContent : 'center',
  },
  ItemAvatar : {
      height : 60,
      width : 60,
      borderRadius : 30,
      borderWidth : 2,
      borderColor : '#fff',
      shadowOffset : {
         width : 0,
         height : 1,
      },
      shadowRadius: 3,
      shadowOpacity : 1,
      shadowColor : '#ccc',
      alignItems : 'center',
      justifyContent : 'center',
  },
  AvatarPic : {
      height : 56,
      width : 56,
      borderRadius : 28,
      resizeMode : 'contain',
  },
  ItemNickname : {
     marginTop : 12,
     fontSize : 14,
     fontWeight : '100',
     color : '#666'
  }
})

export default class Lecturer extends Component{a
  constructor(props) {
    super(props);
    this.state = {
       lecturerList : [],
       tagList : [],
       tagIDList : [],
       lecturerLoadingState : true,
       tagLoadingState : true,
    }
    this.setState = this.setState.bind(this);
    this.fetcTagData = this.fetcTagData.bind(this);
    this.fetchLecturerData = this.fetchLecturerData.bind(this);
    this.renderLectures = this.renderLectures.bind(this);
  }
  async fetcTagData(initFlag = false) {
    this.setState({
      tagLoadingState : true,
    })
    let jsonData = await fetchTagList();
    let tagIdArr = jsonData.data.map( ele => ele.id);
    this.setState({
       tagList : jsonData,
       tagIDList : [tagIdArr[0]],
       tagLoadingState : false
    })
    if( initFlag ){ this.fetchLecturerData(tagIdArr[0]);}
  }
  async fetchLecturerData(tagId) {
    let jsonData = await fetchLecturerList(tagId);
    this.setState({
        tagIDList : [...new Set([...this.state.tagIDList,tagId])],
        lecturerList : [...this.state.lecturerList, {cat_id: tagId, data : jsonData.data}],
        lecturerLoadingState : false
    })
    return jsonData;
  }
  componentDidMount() {
     this.fetcTagData(true);
  }
  renderLectures(tagId){
      let lecturerList = this.state.lecturerList.find( ele => {
        return ele.cat_id == tagId
      });
      return lecturerList && lecturerList.data.map( (ele, ind) => {
            return <TouchableHighlight key={`lecturer-${ind}`} onPress={ () => this.props.navigation.navigate('Detail',{lecturesId : ele.lectures_with_cover[0].id }) }>
              <View style={styles.lecturerItem}>
                  <View style={styles.ItemAvatar}>
                    <Image source={{ url : ele.pic}} style={styles.AvatarPic} />
                  </View>
                  <Text style={styles.ItemNickname}>{ele.nickname}</Text>
              </View>
            </TouchableHighlight>
          })
  }
  render() {
     return (
        <View style={styles.container}>
          <View style={styles.lecturerContainer}>
          {this.state.tagLoadingState ?
                 <View style={global_style.loadingContainer}>
                    <Spinner isVisible={true}
                             size={50}
                             type='ThreeBounce'
                             color='#cc3434'/>
                 </View>
            : this.state.tagList.data ?
                <ScrollableTabView
                      tabBarActiveTextColor="#cc3434"
                      tabBarTextStyle = {styles.barTextStyle}
                      tabBarUnderlineStyle = { styles.underlineStyle}
                      renderTabBar={() => <ScrollableTabBar />}
                      onChangeTab={(obj) => { this.fetchLecturerData(obj.ref.props.tagId)} }>
                       {this.state.tagList.data.map( (ele, ind) =>
                          <ScrollView tabLabel={ele.name} key={`tag-${ele.id}`} tagId={ele.id} style={styles.scrollContainer}>
                              {this.state.tagIDList.indexOf(ele.id) != -1 ?
                                    <View style={styles.LecturesContainer}>
                                      {this.renderLectures(ele.id)}
                                    </View>
                                  : <View style={global_style.loadingContainer}>
                                      <Spinner isVisible={true}
                                                  size={50}
                                                  type='ThreeBounce'
                                                  color='#cc3434'/>
                                  </View>
                              }
                          </ScrollView>
                       )}
                    </ScrollableTabView>
            : <TouchableHighlight style={global_style.hintContainer} onPress={ () => this.fetchData }>
                 <Text style={global_style.hintText}>网络异常，请点击重新加载</Text>
              </TouchableHighlight>
          }
          </View>
        </View>
     )
  }
}
