import React, { useState } from 'react'
import { ScrollView, StyleSheet, Dimensions, Text, TextInput, TouchableOpacity } from 'react-native'
import { useMutation } from '@apollo/client'

import LoadingView from '../components/loadingView'
import { UPDATE_ONE_SPENDING, FIND_MANY_SPENDING } from '../gqls/spending'

const { width } = Dimensions.get('window')

const EditSpending = ({ navigation, route }) => {
    const { spending, event } = route.params
    const [budget, setBudget] = useState(spending.amount ? spending.amount : '')
    const [description, setDescription] = useState(spending.description ? spending.description : '')

    const [updateSpending, { loading }] = useMutation(UPDATE_ONE_SPENDING, {
        onCompleted: () => {
            navigation.navigate('Event')
        },
        onError: (e) => {
            console.error(e)
        },
        update: async (client, { data }) => {
            let prev = await client.readQuery({
                query: FIND_MANY_SPENDING,
                variables: {
                    where: { event: { id: { equals: event.id } } },
                    orderBy: { createdAt: "desc" }
                }
            })
            const newSpendings = prev.findManySpending.map((item) => {
                if (item.id === spending.id) {
                    return data.updateOneSpending
                } else {
                    return item
                }
            })
            await client.writeQuery({
                query: FIND_MANY_SPENDING,
                variables: {
                    where: { event: { id: { equals: event.id } } },
                    orderBy: { createdAt: "desc" }
                },
                data: {
                    findManySpending: newSpendings
                }
            })
        }
    })

    const onSubmit = () => {
        if (!budget) {
            alert('Введите стоимость расхода')
            return false
        }
        updateSpending({
            variables: {
                where: {
                    id: spending.id
                },
                data: {
                    description: { set: description },
                    amount: { set: budget }
                }
            }
        })
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ alignItems: 'center', paddingBottom: 15 }}
        >
            <Text style={styles.label}>Стоимость расхода</Text>
            <TextInput
                value={budget}
                onChangeText={(text) => setBudget(text)}
                style={styles.textInput}
                placeholder="Стоимость расхода"
            />
            <Text style={styles.label}>Комментарий к расходу</Text>
            <TextInput
                value={description}
                onChangeText={(text) => setDescription(text)}
                style={styles.textInput}
                placeholder="Комментарий к расходу"
            />
            <TouchableOpacity style={styles.button} onPress={onSubmit}>
                <Text style={styles.buttonText}>Изменить</Text>
            </TouchableOpacity>
            <LoadingView loading={loading} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
        backgroundColor: '#fafafa',
        height: window.innerHeight - 60
    },
    textInput: {
        width: '90%',
        borderWidth: 0.5,
        paddingHorizontal: 12,
        height: 42,
        borderRadius: 5,
        borderColor: 'silver',
        color: '#000000',
        backgroundColor: '#ffffff',
        fontSize: 16
    },
    pickerContainer: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'center'
    },
    picker: {
        color: '#000000',
        paddingHorizontal: 12,
        height: 42,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: 'silver',
        backgroundColor: '#ffffff',
        width: '100%'
    },
    button: {
        width: '90%',
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
    label: {
        marginTop: 15,
        marginBottom: 5,
        width: '90%',
        textAlign: 'left',
        paddingLeft: 5,
        color: 'grey'
    }
})

export default EditSpending
