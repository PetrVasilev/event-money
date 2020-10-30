import React from 'react'
import { ScrollView, View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import moment from 'moment'

const events = [
    {
        id: 1,
        name: 'Свадьба Васильевых',
        category: 'Свадьба',
        date: new Date(),
        createdAt: new Date(),
        price: 400000
    },
    {
        id: 2,
        name: 'День рождения Кыната',
        category: 'День рождения',
        date: new Date(),
        createdAt: new Date(),
        price: 20000
    },
    {
        id: 3,
        name: 'Шоу',
        category: 'Другое',
        date: new Date(),
        createdAt: new Date(),
        price: 6000
    }
]

const Events = ({ navigation }) => {
    return (
        <ScrollView style={styles.list}>
            {events.map((item, index) => (
                <TouchableOpacity
                    style={[styles.item, { marginBottom: events.length - 1 === index ? 0 : 10 }]}
                    key={item.id}
                    onPress={() => navigation.push(`Event`, { event: item })}
                >
                    <Text style={styles.eventTitle}>{item.name}</Text>
                    <View style={styles.eventBottom}>
                        <Text style={styles.eventCategory}>{item.category}</Text>
                        <Text style={styles.eventCreated}>
                            {moment(item.date).format('DD.MM.YYYY')}
                        </Text>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#e8f0ff',
        paddingHorizontal: 16,
        paddingVertical: 10,
        height: window.innerHeight - 60
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
    }
})

export default Events
