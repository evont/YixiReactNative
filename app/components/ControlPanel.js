import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableHighlight,
    StyleSheet
} from 'react-native';
const listData = [
  {
    name : 'Home',
    chinese : '首页',
    images : require('../images/icon-menu-home.png')
  },
  {
    name : 'Lecture',
    chinese : '演讲',
    images : require('../images/icon-menu-lecture.png')

  },
  {
    name : 'Lecturer',
    chinese : '讲者',
    images : require('../images/icon-menu-lecturer.png')
  },
  {
    name : 'Record',
    chinese : '记录',
    images : require('../images/icon-menu-record.png')
  }
]
export default class ControlPanel extends Component{
  constructor(props){
    super(props);
  }
  render() {
    let _self = this;
     return (
        <View style={styles.container}>
            {
              listData.map(function(ele, k){
               return <TouchableHighlight underlayColor='#ccc' onPress={ () => _self.props.navigatorTo(`${ele.name}`) } key={`list-item-${k}`} >
                    <View style={styles.list_item}>
                       <Image style={styles.item_icon} source={ele.images} />
                       <Text style={styles.item_title}>{ele.chinese}</Text>
                     </View>
                 </TouchableHighlight>
              })
            }
        </View>
     )
  }
}

const styles = StyleSheet.create({
  container : {
     flex: 1,
     paddingTop: 20,
  },
  list_item : {
     position : 'relative',
     flexDirection : 'row',
     height : 50,
     alignItems : 'center',

  },
  item_icon : {
     left : 30,
     height : 18,
     width : 18
  },
  item_title : {
     marginLeft : 54,
     flex : 1,
     fontWeight : '100'
  }
})
