import React, { useState } from 'react'
import styled from 'styled-components'
import { Title } from '../components/defaultTexts'
import AddField from '../components/addField'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { Button, message } from 'antd'
import { CREATE_ONE_SERVICE } from '../gqls/service/mutations'
import { FIND_MANY_CATEGORY } from '../gqls/category/queries'
import AddFieldNumber from '../components/addFieldNumber'
import AddFieldSelect from '../components/addFieldSelect'
import { useHistory } from 'react-router-dom'

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

const AddService = () => {
    const [name, setName] = useState('')
    const [amount, setAmount] = useState(0)
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState()
    const [categoryArray, setCategoryArray] = useState()

    const history = useHistory()

    const { loading: queryLoading } = useQuery(FIND_MANY_CATEGORY, {
        errorPolicy: 'ignore',
        onCompleted: ({ findManyCategory }) => {
            setCategoryArray(findManyCategory)
        }
    })

    const [save, { loading }] = useMutation(CREATE_ONE_SERVICE, {
        onCompleted: () => {
            message.success('Добавлено')
        },
        onError: (error) => {
            message.error('Что то пошло не так')
        }
    })

    const onSave = () => {
        if (name === '') {
            message.error('Введите имя')
            return null
        }
        if (description === '') {
            message.error('Введите описание')
            return null
        }
        if (!category) {
            message.error('Выберите категорию')
            return null
        }
        const variables = {
            data: {
                name,
                description,
                amount: amount + '',
                category: {
                    connect: {
                        id: category
                    }
                }
            }
        }
        save({
            variables
        })
    }

    return (
        <Container>
            <Title>Добавление услуги</Title>
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
                <AddFieldNumber
                    text={'Стоимость'}
                    className={'gap'}
                    placeholder={'Введите стоимость'}
                    value={amount}
                    onChange={(value) => {
                        setAmount(value)
                    }}
                    defaultValue={0}
                />
                <AddField
                    text={'Описание'}
                    className={'gap'}
                    placeholder={'Введите описание'}
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }}
                />
                <AddFieldSelect
                    text={'Категория'}
                    className={'gap'}
                    placeholder={'Выберите категорию'}
                    value={category}
                    onChange={(value) => {
                        setCategory(value)
                    }}
                    data={categoryArray}
                    loading={queryLoading}
                />
            </Fields>

            <Button
                style={{ marginTop: 16, maxWidth: 200 }}
                type={'primary'}
                onClick={onSave}
                loading={loading}
            >
                Добавить
            </Button>
            <Button
                style={{ marginTop: 16, maxWidth: 200 }}
                onClick={() => {
                    history.goBack()
                }}
            >
                Назад
            </Button>
        </Container>
    )
}

export default AddService
