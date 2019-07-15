import {createStackNavigator, createAppContainer, createDrawerNavigator} from 'react-navigation'
import dashbore from '../screens/dashbore'
import chat from '../screens/chatMe'
import editProfile from '../screens/profileEdit'
import login from '../screens/login'
import registern from '../screens/registern'

const navigateApps = createStackNavigator(
    {
        home:{
            screen: dashbore
        },

        chat: {
            screen: chat
        },
        editProfile:{
            screen: editProfile
        },
        login:{
            screen: login
        },
        registern:{
            screen: registern
        }
    },{
        initialRouteName: 'login',
        headerMode:'none'
    }
)

const drawer = createDrawerNavigator(
    {
        main:{
            screen: navigateApps, dashbore
        },
        edit:{
            screen: editProfile
        }
    },{
		initialRouteName: 'main',
	    drawerPosition: 'right',
	    drawerOpenRoute: 'DrawerOpen',
	    drawerCloseRoute: 'DrawerClose',
		drawerToggleRoute: 'DrawerToggle'
	}
    
)

export default createAppContainer(drawer)