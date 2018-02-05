import { StackNavigator } from "react-navigation";

import FormScreen from "./FormScreen";
//import NotificationListScreen from "./NotificationListScreen";
import SplashScreen from "./SplashScreen";
import NewNotificationListScreen from "./NewNotificationListScreen";
import NotificationDetailsScreen from "./NotificationDetailsScreen";

const Navigation = StackNavigator(
  {
    SplashScreen: { screen: SplashScreen },
    Form: { screen: FormScreen },

    // this been changed to new...
    NotificationList: { screen: NewNotificationListScreen },
    NotificationDetails: { screen: NotificationDetailsScreen }
  },
  {
    mode: "modal"
  }
);

export default Navigation;

