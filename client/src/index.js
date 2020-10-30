import * as React from 'react'
import ReactDOM from 'react-dom'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import iconFont from 'react-native-vector-icons/Fonts/Ionicons.ttf'
import Ionicons from 'react-native-vector-icons/dist/Ionicons'

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
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        height: 60
                    }
                }}
            >
                <Stack.Screen
                    options={({ navigation }) => ({
                        headerTitle: 'Мероприятия',
                        headerRight: () => (
                            <Ionicons
                                onPress={() => navigation.navigate('CreateEvent')}
                                name="add-circle-outline"
                                style={{ color: '#4b76a8', marginRight: 16 }}
                                size={25}
                            />
                        )
                    })}
                    name="Events"
                    component={Events}
                />
                <Stack.Screen
                    options={({ navigation, route }) => {
                        return {
                            headerTitle: route.params.event.name,
                            headerLeft: () => (
                                <Ionicons
                                    onPress={() => navigation.goBack()}
                                    name="md-chevron-back-sharp"
                                    style={{ color: '#4b76a8', marginLeft: 16 }}
                                    size={25}
                                />
                            )
                        }
                    }}
                    name="Event"
                    component={Event}
                />
                <Stack.Screen
                    options={({ navigation }) => ({
                        headerTitle: 'Создать мероприятие',
                        headerLeft: () => (
                            <Ionicons
                                onPress={() => navigation.goBack()}
                                name="md-chevron-back-sharp"
                                style={{ color: '#4b76a8', marginLeft: 16 }}
                                size={25}
                            />
                        )
                    })}
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
