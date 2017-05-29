import {
  StyleSheet
} from 'react-native';

export default global_style = StyleSheet.create({
  loadingContainer : {
     flex : 1,
     justifyContent : 'center',
     alignItems : 'center'
  },
  hintContainer : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center'
  },
  hintText : {
    fontSize : 12,
    fontWeight : '200'
  },
  drawerBtn : {
     position : 'absolute',
     left : 20,
     top : 30,
     zIndex : 5
  },
  drawerIcon : {
     width : 30,
     height : 30,
  }
})
