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

import { FIND_MANY_CATEGORY } from '../gqls/category'

import { CREATE_ONE_SPENDING } from '../gqls/spending'

const { width } = Dimensions.get('window')

const categories = [
    {
        value: '1',
        lable: 'Фотограф'
    },
    {
        value: '2',
        lable: 'Кейтеринг'
    },
    {
        value: '3',
        lable: 'Ведущий'
    },
    {
        value: '4',
        lable: 'Банкетный зал'
    },
    {
        value: 'other',
        lable: 'Другое'
    }
]

const CreateSpending = ({ navigation, route }) => {
    const { event } = route.params
    const [selectedCategory, setSelectedCategory] = useState()
    const [ownCategory, setOwnCategory] = useState('')
    const [budget, setBudget] = useState('')
    const [description, setDescription] = useState('')

    const { data, loading } = useQuery(FIND_MANY_CATEGORY, {
        fetchPolicy: "network-only",
        variables: {
            where: {
                types: { equals: [event.type] }
            }
        }
    })

    console.log(data)

    const onSubmit = () => {
        navigation.goBack()
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
                    {categories.map((item, index) => (
                        <Picker.Item key={index} value={item.value} label={item.lable} />
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
