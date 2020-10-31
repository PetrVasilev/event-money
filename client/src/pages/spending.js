import React from 'react'
import { ScrollView, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import moment from 'moment'
import { useMutation } from '@apollo/client'

import { DELETE_ONE_SPENDING, FIND_MANY_SPENDING } from '../gqls/spending'
import Loading from '../components/loadingView'

const Spending = ({ route, navigation }) => {
    const { spending, event } = route.params

    const [deleteSpending, { loading }] = useMutation(DELETE_ONE_SPENDING, {
        onCompleted: () => {
            navigation.goBack()
        },
        onError: (err) => {
            console.error(err)
            alert('Не удалось удалить')
        },
        update: async (cache, { data }) => {
            if (cache && data.deleteOneSpending) {
                let prev = await cache.readQuery({
                    query: FIND_MANY_SPENDING,
                    variables: {
                        where: { event: { id: { equals: event.id } } }
                    }
                })
                await cache.writeQuery({
                    query: FIND_MANY_SPENDING,
                    variables: {
                        where: { event: { id: { equals: event.id } } }
                    },
                    data: {
                        findManySpending: prev.findManySpending.filter(
                            (item) => item.id !== spending.id
                        )
                    }
                })
            }
        }
    })

    const handleDelete = () => {
        if (window.confirm('Удалить?')) {
            deleteSpending({
                variables: {
                    where: {
                        id: spending.id
                    }
                }
            })
        }
    }

    return (
        <>
            <ScrollView style={styles.container}>
                <Text style={styles.textInfo}>Общая информация</Text>
                <View style={styles.bottom}>
                    <View style={styles.bottomSpending}>
                        <Text style={{ color: 'gray' }}>Название</Text>
                        <Text style={{ textAlign: 'right' }}>{spending.category.name}</Text>
                    </View>
                    <View style={styles.bottomSpending}>
                        <Text style={{ color: 'gray' }}>Стоимость</Text>
                        <Text style={{ textAlign: 'right' }}>{spending.amount} руб.</Text>
                    </View>
                    <View style={styles.bottomSpending}>
                        <Text style={{ color: 'gray' }}>Дата создания</Text>
                        <Text style={{ textAlign: 'right' }}>
                            {moment(spending.createdAt).format('DD.MM.YYYY')}
                        </Text>
                    </View>
                    <View>
                        <Text style={{ color: 'gray' }}>Комментарий</Text>
                        <Text style={{ marginTop: 10 }}>
                            {spending.description ? spending.description : '-'}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('EditSpending', { spending, event })}
                    activeOpacity={0.8}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Изменить</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                        styles.button,
                        { backgroundColor: 'rgba(214, 69, 65, 1)', marginTop: 10 }
                    ]}
                    onPress={handleDelete}
                >
                    <Text style={styles.buttonText}>Удалить расход</Text>
                </TouchableOpacity>
            </ScrollView>
            <Loading loading={loading} />
        </>
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
    bottomSpending: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 13
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

export default Spending
