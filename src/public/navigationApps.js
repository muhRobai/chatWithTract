import {createStackNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation'
import dashbore from '../screens/dashbore'
import chat from '../screens/chatMe'
import editProfile from '../screens/profileEdit'
import login from '../screens/login'
import registern from '../screens/registern'
import AuthLoadingScreen from '../public/authscreenlogin'
import maps from '../screens/maps'
import Uimpas from '../screens/iuMaps'

const AppStack = createStackNavigator({ 
    Home:maps, 
    chat:chat,
    editProfile: editProfile
},{
    headerMode:'none'
}
);
const AuthStack = createStackNavigator({ 
    SignIn: login,
    registern: registern 
},{
  headerMode:'none'
});

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
   
  }
));