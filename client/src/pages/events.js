import React from 'react'
import { ScrollView, View, TouchableOpacity, Text, StyleSheet, RefreshControl } from 'react-native'
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import moment from 'moment'
import { useQuery } from '@apollo/client'

import { FIND_MANY_EVENTS } from '../gqls/event'
import LoadingView from '../components/loadingView'
import { categories, isIphoneX } from '../utils'

const Events = ({ navigation }) => {
    const { data, loading } = useQuery(FIND_MANY_EVENTS, {
        fetchPolicy: 'network-only',
        variables: {
            where: {
                users: { some: { id: { contains: localStorage.getItem('userId') } } }
            },
            orderBy: { createdAt: 'desc' }
        }
    })

    const events = data && data.findManyEvent ? data.findManyEvent : []

    return (
        <>
            <ScrollView
                style={styles.list}
                contentContainerStyle={
                    events.length > 0
                        ? { paddingBottom: 70, paddingHorizontal: 16, paddingVertical: 10, }
                        : { flex: 1, alignItems: 'center', justifyContent: 'center' }
                }
                refreshControl={<RefreshControl refreshing={loading} onRefresh={() => { }} />}
            >
                {!loading && events.length === 0 ? (
                    <>
                        <Ionicons name="folder-open-outline" color="#4b76a8" size={55} />
                        <Text style={{ marginTop: 15, textAlign: 'center' }}>
                            Создайте мероприятие, чтобы начать учет расходов
                        </Text>
                    </>
                ) : (
                        events.map((item, index) => (
                            <TouchableOpacity
                                style={[
                                    styles.item,
                                    { marginBottom: events.length - 1 === index ? 0 : 10 }
                                ]}
                                key={item.id}
                                onPress={() => navigation.push(`Event`, { event: item })}
                            >
                                <Text style={styles.eventTitle}>{item.name}</Text>
                                <View style={styles.eventBottom}>
                                    <Text style={styles.eventCategory}>
                                        {categories.find((i) => i.value === item.type).lable}
                                    </Text>
                                    <Text style={styles.eventCreated}>
                                        {moment(item.date).format('DD.MM.YYYY')}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    )}
            </ScrollView>
            <TouchableOpacity
                activeOpacity={1}
                style={styles.add}
                onPress={() => {
                    navigation.navigate('CreateEvent')
                }}
            >
                <Ionicons
                    name="add-outline"
                    style={{ color: '#ffffff', alignItems: 'center', justifyContent: 'center' }}
                    size={30}
                />
            </TouchableOpacity>
            <LoadingView loading={loading} />
        </>
    )
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#fafafa',
        height: window.innerHeight - (isIphoneX() ? 100 : 60)
    },
    item: {
        backgroundColor: 'white',
        padding: 10,
        borderColor: 'rgb(216, 216, 216)',
        borderWidth: 1,
        boxShadow: 'rgb(216, 216, 216) 0px 0px 0px'
    },
    eventTitle: {
        fontSize: 14,
        marginBottom: 3
    },
    eventBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    eventCategory: {
        fontSize: 12,
        color: 'gray'
    },
    eventCreated: {
        fontSize: 12,
        color: 'rgb(192, 192, 192)'
    },
    add: {
        position: 'absolute',
        bottom: 25,
        right: 25,
        backgroundColor: '#4b76a8',
        width: 46,
        height: 46,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 2
    }
})

export default Events
