import React from 'react'
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import randomColor from 'randomcolor'
import { ScrollView, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { PieChart } from 'react-minimal-pie-chart'
import { useQuery } from '@apollo/client'

import { FIND_MANY_SPENDING } from '../gqls/spending'

const Event = ({ route, navigation }) => {
    const { event } = route.params
    let leavePrice = event.amount
    let spendingPrice = 0

    const { data } = useQuery(FIND_MANY_SPENDING, {
        variables: {
            where: { event: { id: { equals: event.id } } }
        }
    })

    const spendings = data && data.findManySpending ? data.findManySpending : []

    let coloredSpendings = spendings.reduce((acc, current) => {
        const exist = acc.find((item) => item.category.id === current.category.id)
        if (!exist) {
            return [
                ...acc,
                {
                    ...current,
                    color: randomColor({
                        hue: 'orange, yellow, blue, purple, pink',
                        luminosity: 'dark'
                    })
                }
            ]
        }
        return [
            ...acc,
            {
                ...current,
                color: exist.color
            }
        ]
    }, [])

    const spendingsView = coloredSpendings.map((item, index) => {
        const isLast = spendings.length - 1 === index
        const additionalStyle = { marginBottom: isLast ? 0 : 10 }
        leavePrice -= parseInt(item.amount)
        spendingPrice += parseInt(item.amount)
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('Spending', { spending: item, event })}
                activeOpacity={0.6}
                key={item.id}
                style={[styles.card, additionalStyle]}
            >
                <View style={styles.spendingLeft}>
                    <Ionicons
                        name="disc"
                        style={{ color: item.color, marginRight: 10 }}
                        size={20}
                    />
                    <View>
                        <Text style={styles.spendingName}>{item.category.name}</Text>
                        {item.description && (
                            <Text
                                numberOfLines={1}
                                style={{
                                    fontSize: 11,
                                    color: 'gray',
                                    marginTop: 3,
                                    width: window.innerWidth * 0.45
                                }}
                            >
                                {item.description}
                            </Text>
                        )}
                    </View>
                </View>
                <Text numberOfLines={2} style={styles.spendingPrice}>
                    {item.amount} руб.
                </Text>
            </TouchableOpacity>
        )
    })

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.textInfo}>Общая информация</Text>
            <View style={styles.bottom}>
                <View style={styles.bottomPrice}>
                    <Text style={{ color: 'green' }}>Бюджет</Text>
                    <Text>{event.amount ? event.amount : spendingPrice} руб.</Text>
                </View>
                <View style={styles.bottomSpending}>
                    <Text style={{ color: 'red' }}>Расходы</Text>
                    <Text>{spendingPrice} руб.</Text>
                </View>
                <View style={styles.bottomLeave}>
                    <Text style={{ color: 'gray' }}>Остаток</Text>
                    <Text>{leavePrice ? leavePrice : 0} руб.</Text>
                </View>
            </View>
            {coloredSpendings.length > 0 || event.amount ? (
                leavePrice ? (
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
                                        title: item.category.name,
                                        value: parseInt(item.amount),
                                        color: item.color
                                    }))
                                ]}
                                lineWidth={20}
                                paddingAngle={1}
                            />
                        </View>
                    </View>
                ) : null
            ) : null}
            <Text style={[styles.textInfo, { marginTop: 15 }]}>Расходы</Text>
            {spendings.length > 0 ? (
                spendingsView
            ) : (
                <View style={styles.card}>
                    <Text style={{ color: 'grey' }}>Нет расходов</Text>
                </View>
            )}
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                onPress={() => navigation.navigate('CreateSpending', { event })}
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
        fontSize: 14,
        textAlign: 'right'
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
