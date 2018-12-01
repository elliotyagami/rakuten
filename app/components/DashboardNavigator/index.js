import { createStackNavigator, StackNavigator } from 'react-navigation'

import ChatScreen from './ChatScreen'
import Map from './Map'
import Video from './agoravideo'
import List from './list'
import AR from './AR'

const routeConfig = {
  Find: { screen: List },
  Maps: { screen: Map },
  AR: { screen: AR },
  VideoChat: { screen: Video },
  Chat: { screen: ChatScreen }
}
export default StackNavigator(routeConfig)
// export default createStackNavigator(routeConfig,
//   {
//     initialRouteName: "Home",
//     navigationOptions: {
//       headerTitleStyle: {
//         fontWeight: "bold"
//       }
//     }
//   })
