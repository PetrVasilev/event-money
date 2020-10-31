import React from 'react'
import {
    ActivityIndicator,
    View,
    StyleSheet
} from 'react-native'

const LoadingView = ({ loading }) => {
    if (loading === true) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator animating={true} size="large" color="#4b76a8" />
            </View>
        )
    }
    return null
}

const styles = StyleSheet.create({
    loading: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.5)"
    }
})

export default LoadingView