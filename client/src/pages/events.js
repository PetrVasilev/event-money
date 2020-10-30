import React from 'react'
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native'

const events = [
    {
        id: 1,
        name: 'Свадьба Васильевых',
        category: 'Свадьба',
        date: new Date(),
        created: new Date()
    },
    {
        id: 2,
        name: 'День рождения Кыната',
        category: 'День рождения',
        date: new Date(),
        created: new Date()
    },
    {
        id: 3,
        name: 'Шоу',
        category: 'Другое',
        date: new Date(),
        created: new Date()
    }
]

const Events = () => {
    return (
        <ScrollView style={styles.list}>
            {events.map((item, index) => (
                <TouchableOpacity
                    style={[styles.item, { marginBottom: events.length - 1 === index ? 0 : 10 }]}
                    key={item.id}
                >
                    <Text style={styles.eventTitle}>{item.name}</Text>
                    <Text style={styles.eventCategory}>{item.category}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#edeef0',
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 10
    },
    item: {
        backgroundColor: 'white',
        padding: 10
    },
    eventTitle: {
        fontSize: 14,
        marginBottom: 3
    },
    eventCategory: {
        fontSize: 12,
        color: 'gray'
    }
})

export default Events
