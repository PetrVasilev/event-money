import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Form, Input, InputNumber, message, Popconfirm, Select } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_ONE_CATEGORY, UPDATE_ONE_CATEGORY } from '../gqls/category/mutations'
import { FIND_MANY_CATEGORY } from '../gqls/category/queries'

const Container = styled.div`
    display: flex;
    flex-direction: column;
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

const UpdateCategory = ({ data }) => {
    const [types, setTypes] = useState(data.types)

    const [update, { loading: updateLoading }] = useMutation(UPDATE_ONE_CATEGORY, {
        onError: () => {
            message.error('Что то пошло не так!')
        },
        onCompleted: async () => {
            message.success('Обновлено!')
        }
    })

    const [delItem, { loading: delLoading }] = useMutation(DELETE_ONE_CATEGORY, {
        onCompleted: async () => {
            message.success('Удалено!')
        },
        onError: () => {
            message.error('Что то пошло не так!')
        },
        update: (cache, { data: requestData }) => {
            if (cache && requestData.deleteOneCategory) {
                const { findManyCategory: oldCategories } = cache.readQuery({
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
                name: { set: args.name },
                types: { set: args.types }
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
            <Form initialValues={{ remember: true }} onFinish={submit} onFinishFailed={() => {}}>
                <Form.Item
                    label="Название"
                    name="name"
                    initialValue={data.name}
                    rules={[{ required: true, message: 'Введите имя!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Тип мероприятия"
                    name="types"
                    initialValue={data.types}
                    rules={[{ required: true, message: 'Выберите мероприятие!' }]}
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
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={updateLoading}>
                        Обновить
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Popconfirm onConfirm={delItem} title="Вы уверены" okText="Да" cancelText="Нет">
                        <Button type="danger" loading={delLoading}>
                            Удалить
                        </Button>
                    </Popconfirm>
                </Form.Item>
            </Form>
        </Container>
    )
}

export default UpdateCategory
