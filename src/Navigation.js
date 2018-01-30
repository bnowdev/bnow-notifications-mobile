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

// const Navigation = (props) => {

//   if(props.navigateTo === "Form"){
//     return StackNavigator({
//         Form: { screen: FormScreen },
//         NotificationList: { screen: NotificationListScreen }
//       });
//   }
//   else return StackNavigator({
//     NotificationList: { screen: NotificationListScreen },
//     Form: { screen: FormScreen }
//   }); 
// } 



// const Navigation =  StackNavigator({
//      Form: { screen: FormScreen },
//      NotificationList: { screen: NotificationListScreen }
//    });





