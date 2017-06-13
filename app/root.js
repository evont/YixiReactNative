import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableHighlight
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Drawer from 'react-native-drawer';

import Home from './pages/Home';
import Lecturer from './pages/Lecturer';
import Lecture from './pages/Lecture';
import Record from './pages/Record';
import Detail from './pages/Detail';
import PureContent from './pages/PureContent';
import ControlPanel from './components/ControlPanel';

import global_style from './global_style';

import {
  StackNavigator
} from 'react-navigation';

const AppNavigator = StackNavigator({
  Home: {screen: Home},
  Lecturer: {screen: Lecturer},
  Lecture: {screen: Lecture},
  Record: {screen: Record},
  Detail : {screen : Detail},
  PureContent : {screen : PureContent}
}, {
  initialRouteName: 'Home',
  headerMode : 'none'
})
class DrawerView extends Component{
    constructor(props) {
        super(props);
        this._navigatorTo = this._navigatorTo.bind(this);
    }
    componentDidMount() {
      // do anything while splash screen keeps, use await to wait for an async task.
        setTimeout(function(){
          SplashScreen.hide();
        },2000);
    }
    componentWillReceiveProps(nextProps) {
      /** Active Drawer Swipe **/
        this._drawer.close();

    }
    _navigatorTo(location){
        this.navigator.dispatch({ type: 'Navigation/NAVIGATE', routeName: location });
        this._drawer.close();
    }
    render(){
      //const {routes, index} = this.props.navigation.state;

      //const Main = this.props.router.getComponentForState(this.props.navigation.state);
       return (
         <Drawer
           ref={ref => this._drawer = ref}
           content={<ControlPanel navigatorTo={ location => this._navigatorTo(location)} />}
           openDrawerOffset={0.3}
           panCloseMask={0.2}
           closedDrawerOffset={0}
           styles={drawerStyles}
           tweenHandler={(ratio) => {
              return {
                main: {
                    transform: [{perspective: -8 / ratio}, { scale: 1 - 0.15 * ratio}, { rotateY : -1 * Math.sin( 1 - 0.9 * ratio) + 'deg'}]
                }
              }
            }}
           tweenDuration={400}
           tapToClose={true}
           >
              <TouchableHighlight style={global_style.drawerBtn} onPress={ () => this._drawer.open() }>
                  <Image source={require('./images/logo.png')} style={global_style.drawerIcon} />
              </TouchableHighlight>
              <AppNavigator ref={nav => { this.navigator = nav; }}/>
          </Drawer>

      )
    }
}

const drawerStyles = {
  main: { shadowColor: '#333', shadowOpacity: 0.8, shadowRadius: 12 , shadowOffset : { width: -4, height: -2}},
}
// const App = createNavigationContainer(createNavigator(AppNavigator)(DrawerView));

export default DrawerView;
