import React from 'react'
import { ScrollView, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import { PieChart } from 'react-minimal-pie-chart'
import randomColor from 'randomcolor'

const spendings = [
    {
        id: 1,
        name: 'Фотограф',
        price: 10000,
        createdAt: new Date(),
        icon: ''
    },
    {
        id: 2,
        name: 'Видеограф',
        price: 15000,
        createdAt: new Date()
    },
    {
        id: 3,
        name: 'Тамада',
        price: 10000,
        createdAt: new Date()
    }
]

const Event = ({ route, navigation }) => {
    const { event } = route.params
    let leavePrice = event.price
    let spendingPrice = 0

    let coloredSpendings = spendings.map((item) => {
        return {
            ...item,
            color: randomColor({
                hue: 'orange, yellow, blue, purple, pink',
                luminosity: 'dark'
            })
        }
    })

    const spendingsView = coloredSpendings.map((item, index) => {
        const isLast = spendings.length - 1 === index
        const additionalStyle = { marginBottom: isLast ? 0 : 10 }
        leavePrice -= item.price
        spendingPrice += item.price
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('Spending', { spending: item })}
                activeOpacity={0.6}
                key={item.id}
                style={[styles.card, additionalStyle]}
            >
                <View style={styles.spendingLeft}>
                    <Ionicons
                        name="disc"
                        style={{ color: item.color, marginRight: 10 }}
                        size={25}
                    />
                    <Text style={styles.spendingName}>{item.name}</Text>
                </View>
                <Text style={styles.spendingPrice}>{item.price} руб.</Text>
            </TouchableOpacity>
        )
    })

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.textInfo}>Общая информация</Text>
            <View style={styles.bottom}>
                <View style={styles.bottomPrice}>
                    <Text style={{ color: 'green' }}>Бюджет</Text>
                    <Text>{event.price} руб.</Text>
                </View>
                <View style={styles.bottomSpending}>
                    <Text style={{ color: 'red' }}>Расходы</Text>
                    <Text>{spendingPrice} руб.</Text>
                </View>
                <View style={styles.bottomLeave}>
                    <Text style={{ color: 'gray' }}>Остаток</Text>
                    <Text>{leavePrice} руб.</Text>
                </View>
            </View>
            <View
                style={[
                    styles.card,
                    {
                        marginTop: 15,
                        marginBottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 20
                    }
                ]}
            >
                <View style={{ height: 160, width: '73%' }}>
                    <PieChart
                        data={[
                            {
                                title: 'Остаток',
                                value: leavePrice < 0 ? 0 : leavePrice,
                                color: '#52d726'
                            },
                            ...coloredSpendings.map((item) => ({
                                title: item.name,
                                value: item.price,
                                color: item.color
                            }))
                        ]}
                        lineWidth={20}
                        paddingAngle={1}
                    />
                </View>
            </View>
            <Text style={[styles.textInfo, { marginTop: 15 }]}>Расходы</Text>
            {spendingsView}
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                onPress={() => navigation.navigate('CreateSpending')}
            >
                <Text style={styles.buttonText}>Добавить расход</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fafafa',
        paddingHorizontal: 16,
        paddingVertical: 10,
        height: window.innerHeight - 60
    },
    textInfo: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 10
    },
    card: {
        backgroundColor: 'white',
        padding: 10,
        borderColor: 'rgb(216, 216, 216)',
        borderWidth: 1,
        boxShadow: 'rgb(216, 216, 216) 0px 0px 0px',
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    spendingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    spendingName: {
        fontSize: 14
    },
    spendingPrice: {
        fontSize: 14
    },
    line: {
        borderBottomWidth: 1,
        borderColor: 'silver',
        marginTop: 12,
        marginBottom: 12
    },
    bottom: {
        backgroundColor: 'white',
        padding: 10,
        borderColor: 'rgb(216, 216, 216)',
        borderWidth: 1,
        boxShadow: 'rgb(216, 216, 216) 0px 0px 0px'
    },
    bottomLeave: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    bottomPrice: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    bottomSpending: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    button: {
        width: '100%',
        height: 42,
        alignItems: 'center',
        backgroundColor: '#4b76a8',
        borderRadius: 5,
        marginTop: 15,
        justifyContent: 'center'
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16
    }
})

export default Event
