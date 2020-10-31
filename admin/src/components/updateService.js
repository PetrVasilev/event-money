import React, {useState} from 'react'
import styled from 'styled-components'
import {Button, Form, Input, InputNumber, Select} from "antd"
import {useQuery,useMutation} from '@apollo/react-hooks'
import {FIND_MANY_CATEGORY} from "../gqls/category/queries"

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  flex-wrap: wrap;
`

const UpdateService = ({data}) => {
    const [categories, setCategories] = useState([])

    const {loading} = useQuery(FIND_MANY_CATEGORY, {
        errorPolicy: 'ignore',
        onCompleted: ({findManyCategory}) => {
            setCategories(findManyCategory)
        }
    })

    const [update,{loading:updateLoading}]= useMutation()

    return (
        <Container>
                <Form
                    initialValues={{remember: true}}
                    onFinish={
                        () => {

                        }
                    }
                    onFinishFailed={
                        () => {

                        }
                    }
                >

                    <Form.Item
                        label="Название"
                        name="name"
                        fieldContext={''}
                        initialValue={data.name}
                        rules={[{required: true, message: 'Введите имя!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Стоимость"
                        name="amount"
                        fieldContext={''}
                        initialValue={data.amount}
                        rules={[{required: true, message: 'Введите стоимость!'}]}
                    >
                        <InputNumber/>
                    </Form.Item>
                    <Form.Item
                        label="Описание"
                        name="description"
                        fieldContext={''}
                        initialValue={data.description}
                        rules={[{required: true, message: 'Введите описание!'}]}
                    >
                        <Input.TextArea/>
                    </Form.Item>

                    <Form.Item
                        label="Категория"
                        name="category"
                        fieldContext={''}
                        initialValue={data.category.id}
                        rules={[{required: true, message: 'Выберете категорию!'}]}
                    >
                        <Select
                            loading={loading}
                        >
                            {
                                categories.map(
                                    (item) => {
                                        return (
                                            <Select.Option value={item.id}>{item.name}</Select.Option>
                                        )
                                    })
                            }
                        </Select>
                    </Form.Item>
                </Form>
            <ButtonsContainer>
                <Button
                    type={'primary'}
                >
                    Обновить
                </Button>
            </ButtonsContainer>

        </Container>
    )
}

export default UpdateService
