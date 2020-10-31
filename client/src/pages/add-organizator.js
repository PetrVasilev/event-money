import React from 'react'
import { ScrollView, TextInput, Text, Touchable, Dimensions, StyleSheet } from 'react-native'

import Loading from '../components/loadingView'

const { width } = Dimensions.get('window')

const AddOrganizator = () => {
    return (
        <>
            <ScrollView
                style={styles.container}
                contentContainerStyle={{ alignItems: 'center', paddingBottom: 15 }}
            >
                
            </ScrollView>
            <Loading loading={false} />
        </>
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
    }
})

export default AddOrganizator
