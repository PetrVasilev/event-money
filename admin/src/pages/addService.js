import React, {useState} from 'react'
import styled from 'styled-components'
import {Title} from '../components/defaultTexts'
import {useApolloClient, useMutation, useQuery} from '@apollo/react-hooks'
import {Button, Form, Input, InputNumber, message, Select} from 'antd'
import {CREATE_ONE_SERVICE} from '../gqls/service/mutations'
import {FIND_MANY_CATEGORY} from '../gqls/category/queries'
import {useHistory} from 'react-router-dom'
import {FIND_MANY_SERVICE} from "../gqls/service/queries"

const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    max-width: 500px;
`
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const AddService = () => {
    const [categoryArray, setCategoryArray] = useState([])

    const history = useHistory()

    const apollo = useApolloClient()

    const {loading: queryLoading} = useQuery(FIND_MANY_CATEGORY, {
        errorPolicy: 'ignore',
        onCompleted: ({findManyCategory}) => {
            setCategoryArray(findManyCategory)
        }
    })

    const [save, {loading}] = useMutation(CREATE_ONE_SERVICE, {
        onCompleted: async ({createOneService}) => {
            try {
                const {data} = await apollo.readQuery({query: FIND_MANY_SERVICE})
                await apollo.writeQuery({
                    query: FIND_MANY_SERVICE,
                    data: [...data, createOneService]
                })
            } catch (e) {

            }
            message.success('Добавлено')
            history.goBack()
        },
        onError: (error) => {
            message.error('Что то пошло не так')
        }
    })

    const onSave = ({name, description, category, amount}) => {
        const variables = {
            data: {
                name,
                description,
                amount: amount.toString(),
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
            <Form
                onFinish={onSave}
                layout={'vertical'}
                initialValues={{remember: true}}
                style={{marginTop: 16}}
            >
                <Form.Item
                    name={'name'}
                    label={'Название'}
                    rules={[{required: true, message: 'Введите имя'}]}
                    initialValue={''}
                >
                    <Input
                        placeholder={'Введите название'}
                    />
                </Form.Item>
                <Form.Item
                    label="Стоимость"
                    name="amount"
                    initialValue={0}
                    rules={[{required: true, message: 'Введите стоимость!'}]}
                >
                    <InputNumber placeholder={'Введите стоимость'}/>
                </Form.Item>
                <Form.Item
                    label="Описание"
                    name="description"
                    rules={[{required: true, message: 'Введите описание!'}]}
                >
                    <Input.TextArea placeholder={'Введите описание'}/>
                </Form.Item>
                <Form.Item
                    label="Категория"
                    name="category"
                    rules={[{required: true, message: 'Выберете категорию!'}]}
                >
                    <Select
                        placeholder={'Выберите категорию'}
                        loading={queryLoading}
                    >
                        {categoryArray.map((item) => {
                            return (
                                <Select.Option key={item.id} value={item.id}>
                                    {item.name}
                                </Select.Option>
                            )
                        })}
                    </Select>
                </Form.Item>
                <ButtonsContainer>
                    <Button
                        htmlType={'submit'}
                        loading={loading}
                        type={'primary'}
                    >
                        Добавить
                    </Button>
                    <Button
                        onClick={history.goBack}
                    >
                        Назад
                    </Button>
                </ButtonsContainer>
            </Form>
        </Container>
    )
}

export default AddService
