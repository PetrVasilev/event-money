import React, {useState} from 'react'
import styled from 'styled-components'
import {useMutation} from '@apollo/react-hooks'
import {useHistory} from 'react-router-dom'
import {Button, message} from 'antd'

import {Title} from '../components/defaultTexts'
import AddField from '../components/addField'
import {CREATE_ONE_CATEGORY} from '../gqls/category/mutations'
import AddFieldSelect from '../components/addFieldSelect'

const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`

const Fields = styled.div`
    margin-top: 24px;
    display: flex;

    .gap {
        margin-right: 24px;
        margin-bottom: 24px;

        @media screen and (max-width: 800px) {
            margin-right: 0;
        }
    }

    @media screen and (max-width: 800px) {
        flex-direction: column;
    }
`

const typeEnum = [
    {
        id: 'OTHER',
        name: 'Другие'
    },
    {
        id: 'WEDDING',
        name: 'Свадьба'
    },
    {
        id: 'BIRTHDAY',
        name: 'День рождения'
    },
    {
        id: 'STAG',
        name: 'Девичник/Мальчишник'
    },
    {
        id: 'MATINEE',
        name: 'Утренник'
    }
]

const AddCategory = () => {
    const [name, setName] = useState('')
    const [types, setTypes] = useState()

    const history = useHistory()

    const [save, {loading}] = useMutation(CREATE_ONE_CATEGORY, {
        onCompleted: () => {
            message.success('Добавлено')
        },
        onError: (error) => {
            console.log(error.message)
            if (error.message === 'GraphQL error: exist') {
                message.error('Категория уже существует')
                return null
            }
            message.error('Что то пошло не так')
        }
    })

    const onSave = () => {
        if (name === '') {
            message.error('Введите имя')
            return null
        }
        if (!types) {
            message.error('Выберите тип')
            return null
        }
        const variables = {
            data: {
                name,
                types: {
                    set: types
                }
            }
        }
        save({
            variables
        })
    }

    return (
        <Container>
            <Title>Добавление категории</Title>
            <Fields>
                <AddField
                    text={'Название'}
                    className={'gap'}
                    placeholder={'Введите название'}
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                />
                <AddFieldSelect
                    text={'Тип мероприятия'}
                    className={'gap'}
                    placeholder={'Выберите мероприятие'}
                    value={types}
                    onChange={(value) => {
                        setTypes(value)
                    }}
                    data={typeEnum}
                    mode={'multiple'}
                />
            </Fields>
            <Button
                style={{marginTop: 16, maxWidth: 200}}
                type={'primary'}
                onClick={onSave}
                loading={loading}
            >
                Добавить
            </Button>
            <Button
                style={{marginTop: 16, maxWidth: 200}}
                onClick={
                    () => {
                        history.goBack()
                    }
                }
            >
                Назад
            </Button>
        </Container>
    )
}

export default AddCategory
