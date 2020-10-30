import * as React from 'react'
import ReactDOM from 'react-dom'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Events from './pages/events'
import Event from './pages/event'
import CreateEvent from './pages/create-event'
import CreateSpending from './pages/create-spending'

const Stack = createStackNavigator()

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    options={{
                        headerTitle: 'Мероприятия'
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
