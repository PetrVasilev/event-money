import React, { useState } from 'react'
import {
    View,
    ScrollView,
    StyleSheet,
    Dimensions,
    Text,
    TextInput,
    Picker,
    TouchableOpacity
} from 'react-native'
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import { useQuery, useMutation } from '@apollo/client'

import LoadingView from '../components/loadingView'
import { FIND_MANY_CATEGORY } from '../gqls/category'
import { CREATE_ONE_SPENDING, FIND_MANY_SPENDING } from '../gqls/spending'
import { FIND_MANY_EVENTS } from '../gqls/event'

const { width } = Dimensions.get('window')

const CreateSpending = ({ navigation, route }) => {
    const { event } = route.params
    const [selectedCategory, setSelectedCategory] = useState()
    const [ownCategory, setOwnCategory] = useState('')
    const [budget, setBudget] = useState('')
    const [description, setDescription] = useState('')

    const { data } = useQuery(FIND_MANY_CATEGORY, {
        fetchPolicy: "network-only",
        onCompleted: data => {
            const categoriesArray = data && data.findManyCategory ? event.type !== "OTHER" ? data.findManyCategory.filter(item => item.types.indexOf(event.type) !== -1) : data.findManyCategory : []
            setSelectedCategory(categoriesArray[0].id)
        }
    })

    const [createSpending, { loading }] = useMutation(CREATE_ONE_SPENDING, {
        onCompleted: () => {
            navigation.goBack()
        },
        onError: (e) => {
            console.error(e)
        },
        update: async (client, { data }) => {
            let prev = await client.readQuery({
                query: FIND_MANY_SPENDING,
                variables: {
                    where: { event: { id: { equals: event.id } } }
                },
            })
            console.log([...prev.findManySpending, data.createOneSpending])
            await client.writeQuery({
                query: FIND_MANY_SPENDING,
                variables: {
                    where: { event: { id: { equals: event.id } } }
                },
                data: {
                    findManySpending: [...prev.findManySpending, data.createOneSpending]
                }
            })
        }
    })

    const categoriesArray = data && data.findManyCategory ? event.type !== "OTHER" ? data.findManyCategory.filter(item => item.types.indexOf(event.type) !== -1) : data.findManyCategory : []
    // console.log(selectedCategory)

    const onSubmit = () => {
        // navigation.goBack()
        if (!budget) {
            alert('Введите стоимость расхода')
            return false
        }
        if (!selectedCategory) {
            alert('Выберите категорию')
            return false
        }
        createSpending({
            variables: {
                data: {
                    description,
                    amount: budget,
                    category: {
                        connect: { id: selectedCategory }
                    },
                    event: {
                        connect: { id: event.id }
                    }
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
            <Text style={styles.label}>Категория расхода</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    style={styles.picker}
                    placeholder="Выберите категорию"
                    value={selectedCategory}
                    onValueChange={(item) => {
                        setSelectedCategory(item)
                        setOwnCategory('')
                    }}
                >
                    {categoriesArray.map((item, index) => (
                        <Picker.Item key={item.id} value={item.id} label={item.name} />
                    ))}
                </Picker>
                <Ionicons
                    name="chevron-down"
                    style={{ position: 'absolute', right: 5, top: 10, alignSelf: 'flex-end' }}
                    color="#000000"
                    size={22}
                />
            </View>
            {selectedCategory === 'other' ? (
                <>
                    <Text style={styles.label}>Свой расход</Text>
                    <TextInput
                        value={ownCategory}
                        onChangeText={(text) => setOwnCategory(text)}
                        style={styles.textInput}
                        placeholder="Введите свой вариант"
                    />
                </>
            ) : null}
            <Text style={styles.label}>Комментарий к расходу</Text>
            <TextInput
                value={description}
                onChangeText={(text) => setDescription(text)}
                style={styles.textInput}
                placeholder="Комментарий к расходу"
            />
            <TouchableOpacity style={styles.button} onPress={onSubmit}>
                <Text style={styles.buttonText}>Добавить</Text>
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

export default CreateSpending
