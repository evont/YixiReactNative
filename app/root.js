import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Drawer from 'react-native-drawer';

import Home from './pages/Home';
import Lecturer from './pages/Lecturer';
import Lecture from './pages/Lecture';
import Record from './pages/Record';
import ControlPanel from './components/ControlPanel';

import {
  createNavigator,
  createNavigationContainer,
  StackRouter,
  addNavigationHelpers,
} from 'react-navigation';

class DrawerView extends Component{
    constructor(props) {
        super(props);
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
    render(){
      const {routes, index} = this.props.navigation.state;
      const Main = this.props.router.getComponentForState(this.props.navigation.state);
       return (
         <Drawer
           ref={ref => this._drawer = ref}
           content={<ControlPanel  navigation={this.props.navigation} />}
           openDrawerOffset={0.3}
           panCloseMask={0.2}
           closedDrawerOffset={-3}
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

              <Main
                navigation={addNavigationHelpers({
                  ...this.props.navigation,
                  state: routes[index],
                  openDrawer: () => this._drawer.open(),
                })}
              />
          </Drawer>

      )
    }
}
const AppNavigator = StackRouter({
  Home: {screen: Home},
  Lecturer: {screen: Lecturer},
  Lecture: {screen: Lecture},
  Record: {screen: Record}
}, {
  initialRouteName: 'Home',
});
const drawerStyles = {
  main: { shadowColor: '#333', shadowOpacity: 0.8, shadowRadius: 12 , shadowOffset : { width: -4, height: -2}},
}
const App = createNavigationContainer(createNavigator(AppNavigator)(DrawerView));

export default App;
