import * as React from 'react'
import ReactDOM from 'react-dom'
import iconFont from 'react-native-vector-icons/Fonts/Ionicons.ttf'
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import bridge from '@vkontakte/vk-bridge'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { ApolloProvider } from '@apollo/client'
import { useLazyQuery } from '@apollo/client'

import apolloClient from './utils/apollo'
import { AUTH_USER } from './gqls/user'

import Events from './pages/events'
import Event from './pages/event'
import CreateEvent from './pages/create-event'
import CreateSpending from './pages/create-spending'
import Spending from './pages/spending'
import EditSpending from './pages/edit-spending'

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

const devAvatar =
    'https://sun5-4.userapi.com/impg/c856036/v856036319/1a2711/_f7jAK14LoQ.jpg?size=400x0&quality=90&crop=133,0,1074,1074&sign=977f59afc8d369ff5ba444ee906c063f&ava=1'

const Stack = createStackNavigator()

const App = () => {
    const [ready, setReady] = React.useState(false)

    const [authUserQuery, { loading }] = useLazyQuery(AUTH_USER, {
        onCompleted: ({ user: { id } }) => {
            localStorage.setItem('userId', id)
            setReady(true)
        },
        onError: (err) => {
            console.error(err)
        }
    })

    const authUser = React.useCallback(
        ({ userId, name, avatar }) => {
            authUserQuery({
                variables: {
                    where: {
                        id: userId.toString()
                    },
                    data: {
                        name,
                        avatar
                    }
                }
            })
        },
        [authUserQuery]
    )

    React.useEffect(() => {
        if (process.env.NODE_ENV === 'production') {
            bridge.send('VKWebAppInit', {}).then(() => {
                bridge
                    .send('VKWebAppGetUserInfo')
                    .then((data) => {
                        const userId = data.id
                        const name = `${data.first_name} ${data.last_name}`
                        const avatar = data.photo_100
                        authUser({ userId, name, avatar })
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            })
        } else {
            authUser({
                userId: 'exampleUser',
                name: 'Example User',
                avatar: devAvatar
            })
        }
    }, [authUser])

    if (loading || !ready) return null

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        height: 60
                    },
                    animationEnabled: true
                }}
            >
                <Stack.Screen
                    options={{
                        headerTitle: 'Мероприятия'
                    }}
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
                    options={({ navigation }) => ({
                        headerTitle: 'Добавить расход',
                        headerLeft: () => (
                            <Ionicons
                                onPress={() => navigation.goBack()}
                                name="md-chevron-back-sharp"
                                style={{ color: '#4b76a8', marginLeft: 16 }}
                                size={25}
                            />
                        )
                    })}
                    name="CreateSpending"
                    component={CreateSpending}
                />
                <Stack.Screen
                    options={({ navigation }) => ({
                        headerTitle: 'Расход',
                        headerLeft: () => (
                            <Ionicons
                                onPress={() => navigation.goBack()}
                                name="md-chevron-back-sharp"
                                style={{ color: '#4b76a8', marginLeft: 16 }}
                                size={25}
                            />
                        )
                    })}
                    name="Spending"
                    component={Spending}
                />
                <Stack.Screen
                    options={({ navigation }) => ({
                        headerTitle: 'Редактировать расход',
                        headerLeft: () => (
                            <Ionicons
                                onPress={() => navigation.goBack()}
                                name="md-chevron-back-sharp"
                                style={{ color: '#4b76a8', marginLeft: 16 }}
                                size={25}
                            />
                        )
                    })}
                    name="EditSpending"
                    component={EditSpending}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const AppStarter = () => {
    return (
        <ApolloProvider client={apolloClient}>
            <App />
        </ApolloProvider>
    )
}

ReactDOM.render(<AppStarter />, document.getElementById('root'))
