import { createStackNavigator, StackNavigator } from 'react-navigation'

import ChatScreen from './ChatScreen'
import Map from './Map'
import Video from './agoravideo'
import List from './list'
import AR from './AR'
import wiki from './wikitude'

const routeConfig = {
  Find: { screen: List },
  Maps: { screen: Map },
  // AR: { screen: Video },
  // AR: { screen:  wiki},
  AR: { screen: AR },
  Video: { screen: Video },
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
