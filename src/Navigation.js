import {
  StackNavigator,
} from 'react-navigation';

import FormScreen from "./FormScreen";
import NotificationListScreen from "./NotificationListScreen";
import SplashScreen from "./SplashScreen";

const Navigation = StackNavigator({
  SplashScreen: {screen: SplashScreen},
  Form: { screen: FormScreen },
  NotificationList: { screen: NotificationListScreen }
});

export default Navigation;
