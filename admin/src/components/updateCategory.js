import React, {useState} from 'react'
import styled from 'styled-components'
import {Button, Form, Input, message, Popconfirm, Select} from 'antd'
import {useMutation} from '@apollo/react-hooks'
import {DELETE_ONE_CATEGORY, UPDATE_ONE_CATEGORY} from '../gqls/category/mutations'
import {FIND_MANY_CATEGORY} from '../gqls/category/queries'
import {TYPES_ENUMS} from "../utils/enums"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 500px;
`

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const typeEnum = TYPES_ENUMS

const UpdateCategory = ({data}) => {
    const [types, setTypes] = useState(data.types)

    const [update, {loading: updateLoading}] = useMutation(UPDATE_ONE_CATEGORY, {
        onError: () => {
            message.error('Что то пошло не так!')
        },
        onCompleted: async () => {
            message.success('Обновлено!')
        }
    })

    const [delItem, {loading: delLoading}] = useMutation(DELETE_ONE_CATEGORY, {
        onCompleted: async () => {
            message.success('Удалено!')
        },
        onError: () => {
            message.error('Что то пошло не так!')
        },
        update: (cache, {data: requestData}) => {
            if (cache && requestData.deleteOneCategory) {
                const {findManyCategory: oldCategories} = cache.readQuery({
                    query: FIND_MANY_CATEGORY
                })
                cache.writeQuery({
                    query: FIND_MANY_CATEGORY,
                    data: {
                        findManyCategory: oldCategories.filter(
                            (item) => item.id !== requestData.deleteOneCategory.id
                        )
                    }
                })
            }
        },
        variables: {
            where: {
                id: data.id
            }
        }
    })

    const submit = (args) => {
        const variables = {
            data: {
                name: {set: args.name},
                types: {set: args.types}
            },
            where: {
                id: data.id
            }
        }
        update({
            variables
        })
    }

    return (
        <Container>
            <Form
                initialValues={{remember: true}}
                onFinish={submit}
                layout={'vertical'}
            >
                <Form.Item
                    label="Название"
                    name="name"
                    initialValue={data.name}
                    rules={[{required: true, message: 'Введите имя!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Тип мероприятия"
                    name="types"
                    initialValue={data.types}
                    rules={[{required: true, message: 'Выберите мероприятие!'}]}
                >
                    <Select value={types} mode={'multiple'} onChange={(value) => setTypes(value)}>
                        {typeEnum.map((item) => {
                            return (
                                <Select.Option key={item.id} value={item.id}>
                                    {item.name}
                                </Select.Option>
                            )
                        })}
                    </Select>
                </Form.Item>
                <ButtonsContainer>
                    <Button type="primary" htmlType="submit" loading={updateLoading}>
                        Обновить
                    </Button>
                    <Popconfirm onConfirm={delItem} title="Вы уверены" okText="Да" cancelText="Нет">
                        <Button type="danger" loading={delLoading}>
                            Удалить
                        </Button>
                    </Popconfirm>
                </ButtonsContainer>
            </Form>
        </Container>
    )
}

export default UpdateCategory
