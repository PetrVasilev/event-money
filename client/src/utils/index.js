
import { Dimensions, Platform } from 'react-native'

export const categories = [
    {
        value: 'empty',
        lable: 'Выберите категорию'
    },
    {
        value: 'WEDDING',
        lable: 'Свадьба'
    },
    {
        value: 'BIRTHDAY',
        lable: 'День рождения'
    },
    {
        value: 'MATINEE',
        lable: 'Детский праздник (утренник)'
    },
    {
        value: 'STAG',
        lable: 'Мальчишник/Девичник'
    },
    {
        value: 'JUBILEE',
        lable: 'Юбилей'
    },
    {
        value: 'CORPORATE',
        lable: 'Корпоратив'
    },
    {
        value: 'BUSINESS',
        lable: 'Бизнес-семинар'
    },
    {
        value: 'FORUM',
        lable: 'Форум, конференция'
    },
    {
        value: 'HACKATHON',
        lable: 'Хакатон'
    },
    {
        value: 'OTHER',
        lable: 'Другое'
    },
]

export function isIphoneX() {
    // Really basic check for the ios platform
    // https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    // Get the device pixel ratio
    var ratio = window.devicePixelRatio || 1;

    // Define the users device screen dimensions
    var screen = {
        width: window.screen.width * ratio,
        height: window.screen.height * ratio
    };

    // iPhone X Detection
    if (iOS && screen.width == 1125 && screen.height === 2436) {
        return true
    }

    return false
}