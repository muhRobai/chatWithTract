import {createStackNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation'
import dashbore from '../screens/dashbore'
import chat from '../screens/chatMe'
import editProfile from '../screens/editProfile'
import login from '../screens/login'
import registern from '../screens/registern'
import AuthLoadingScreen from '../public/authscreenlogin'
import maps from '../screens/maps'
import goChat from '../screens/goChat'
import profile from '../screens/profile'
import profilUser from '../screens/profileAll'

const AppStack = createStackNavigator({ 
    Home:maps, 
    chat:goChat,
    profile: profile,
    editProfile: editProfile,
    profilUser: profilUser
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