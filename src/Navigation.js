import {
  StackNavigator,
} from 'react-navigation';

import FormScreen from "./FormScreen";
import NotificationListScreen from "./NotificationListScreen";

const Navigator = StackNavigator({
  Form: { screen: FormScreen },
  NotificationList: { screen: NotificationListScreen }
});

export default Navigator;
//  Home: {screen: HomeScreen},