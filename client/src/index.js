import * as React from 'react'
import ReactDOM from 'react-dom'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import iconFont from 'react-native-vector-icons/Fonts/Ionicons.ttf'
import Ionicons from 'react-native-vector-icons/dist/Ionicons'

import GlobalStyles from './components/GlobalStyles'
import Events from './pages/events'
import Event from './pages/event'
import CreateEvent from './pages/create-event'
import CreateSpending from './pages/create-spending'

const iconFontStyles = `@font-face {
    src: url(${iconFont});
    font-family: Ionicons;
  }
`

const style = document.createElement('style')
style.type = 'text/css'
if (style.styleSheet) {
    style.styleSheet.cssText = iconFontStyles
} else {
    style.appendChild(document.createTextNode(iconFontStyles))
}

document.head.appendChild(style)

const Stack = createStackNavigator()

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    options={({ navigation }) => {
                        return {
                            headerTitle: 'Мероприятия',
                            headerRight: () => (
                                <Ionicons
                                    onPress={() => navigation.navigate("CreateEvent")}
                                    name="add-circle-outline"
                                    style={{ color: '#9F8FFF', marginRight: 10 }}
                                    size={27}
                                />
                            )
                        }
                    }}
                    name="Events"
                    component={Events}
                />
                <Stack.Screen
                    options={{
                        headerTitle: 'Мероприятие'
                    }}
                    name="Event"
                    component={Event}
                />
                <Stack.Screen
                    options={{
                        headerTitle: 'Создать мероприятие'
                    }}
                    name="CreateEvent"
                    component={CreateEvent}
                />
                <Stack.Screen
                    options={{
                        headerTitle: 'Добавить расход'
                    }}
                    name="CreateSpending"
                    component={CreateSpending}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
