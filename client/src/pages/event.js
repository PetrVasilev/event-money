import React, { useState, useEffect, useMemo } from 'react'
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import randomColor from 'randomcolor'
import { ScrollView, View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import { PieChart } from 'react-minimal-pie-chart'
import { useQuery } from '@apollo/client'

import { FIND_MANY_SPENDING } from '../gqls/spending'

const organizators = [
    {
        id: 1,
        name: 'Пётр Васильев',
        avatar:
            'https://sun5-3.userapi.com/impf/c630919/v630919438/127da/txDQNEXAQNI.jpg?size=400x0&quality=90&crop=0,350,1409,1410&sign=14fa59e47c7a3ab1d1193d92430b3ebe&ava=1'
    },
    {
        id: 2,
        name: 'Тит Эверстов',
        avatar:
            'https://sun5-4.userapi.com/impg/c856036/v856036319/1a2711/_f7jAK14LoQ.jpg?size=400x0&quality=90&crop=133,0,1074,1074&sign=977f59afc8d369ff5ba444ee906c063f&ava=1'
    }
]

const Event = ({ route, navigation }) => {
    const { event } = route.params
    let leavePrice = event.amount
    let spendingPrice = 0

    const [tab, setTab] = useState(0)
    const [coloredSpendings, setColoredSpendings] = useState([])

    const { data } = useQuery(FIND_MANY_SPENDING, {
        variables: {
            where: { event: { id: { equals: event.id } } }
        }
    })

    const spendings = useMemo(() => {
        return data && data.findManySpending ? data.findManySpending : []
    }, [data])

    useEffect(() => {
        const arr = spendings.reduce((acc, current) => {
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
        setColoredSpendings(arr)
    }, [spendings])

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
            ) : null}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[
                        styles.tabItem,
                        {
                            borderBottomColor: tab === 0 ? '#4b76a8' : 'transparent'
                        }
                    ]}
                    onPress={() => setTab(0)}
                >
                    <Text>Расходы</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.tabItem,
                        {
                            borderBottomColor: tab === 1 ? '#4b76a8' : 'transparent'
                        }
                    ]}
                    onPress={() => setTab(1)}
                >
                    <Text>Организаторы</Text>
                </TouchableOpacity>
            </View>
            {tab === 0 && (
                <>
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
                </>
            )}
            {tab === 1 && (
                <>
                    {organizators.map((item, index) => (
                        <View
                            style={[
                                styles.card,
                                {
                                    marginBottom: organizators.length - 1 === index ? 0 : 10,
                                    justifyContent: 'flex-start'
                                }
                            ]}
                            key={item.id}
                        >
                            <Image
                                style={{ borderRadius: '50%', width: 35, height: 35 }}
                                source={{ uri: item.avatar }}
                            />
                            <Text style={{ marginLeft: 10, fontSize: 14 }}>{item.name}</Text>
                        </View>
                    ))}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.button}
                        onPress={() => navigation.navigate('CreateOrganizator', { event })}
                    >
                        <Text style={styles.buttonText}>Добавить организаторов</Text>
                    </TouchableOpacity>
                </>
            )}
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
    },
    tabContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 7,
        marginBottom: 10
    },
    tabItem: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderBottomWidth: 3
    }
})

export default Event
