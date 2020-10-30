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

const { width } = Dimensions.get('window')

const categories = [
    {
        value: '1',
        lable: 'Свадьба'
    },
    {
        value: '2',
        lable: 'День рождения'
    },
    {
        value: '3',
        lable: 'Утренник'
    },
    {
        value: '4',
        lable: 'Мальчишник/Девишник'
    },
    {
        value: 'other',
        lable: 'Другое'
    }
]

const CreateEvent = ({ navigation }) => {
    const [selectedCategory, setSelectedCategory] = useState()
    const [name, setName] = useState('')
    const [ownCategory, setOwnCategory] = useState('')
    const [date, setDate] = useState('')
    const [budget, setBudget] = useState('')

    const onSubmit = () => {
        navigation.goBack()
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ alignItems: 'center', paddingBottom: 15 }}
        >
            <Text style={styles.label}>Название мероприятия</Text>
            <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                style={styles.textInput}
                placeholder="Название мероприятия"
            />
            <Text style={styles.label}>Дата проведения</Text>
            <TextInput
                value={date}
                onChangeText={(text) => setDate(text)}
                style={styles.textInput}
                placeholder="Дата проведения"
            />
            <Text style={styles.label}>Бюджет мероприятия</Text>
            <TextInput
                value={budget}
                onChangeText={(text) => setBudget(text)}
                style={styles.textInput}
                placeholder="Бюджет мероприятия"
            />
            <Text style={styles.label}>Категория мероприятия</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    style={styles.picker}
                    placeholder="Выберете категорию"
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
                    <Text style={styles.label}>Своя категория</Text>
                    <TextInput
                        value={ownCategory}
                        onChangeText={(text) => setOwnCategory(text)}
                        style={styles.textInput}
                        placeholder="Введите свой вариант"
                    />
                </>
            ) : null}
            <TouchableOpacity style={styles.button} onPress={onSubmit}>
                <Text style={styles.buttonText}>Создать</Text>
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

export default CreateEvent
