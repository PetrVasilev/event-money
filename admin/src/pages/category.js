import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Table, Tag } from 'antd'
import { useQuery } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'

import { Title } from '../components/defaultTexts'
import { FIND_MANY_CATEGORY } from '../gqls/category/queries'
import UpdateCategory from '../components/updateCategory'

const { Column } = Table

const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`

const enumMap = {
    OTHER: 'Другие',
    WEDDING: 'Свадьба',
    BIRTHDAY: 'День рождения',
    STAG: 'Девичник/Мальчишник',
    MATINEE: 'Утренник'
}
const enumColorMap = {
    OTHER: 'red',
    WEDDING: 'blue',
    BIRTHDAY: 'magenta',
    STAG: 'gold',
    MATINEE: 'lime'
}
const Category = () => {
    const { loading, data } = useQuery(FIND_MANY_CATEGORY, {
        fetchPolicy: 'network-only',
        errorPolicy: 'ignore'
    })

    const history = useHistory()

    const dataSource = data ? data.findManyCategory : []

    const expandedRowRender = (data) => {
        return <UpdateCategory data={data} />
    }

    return (
        <Container>
            <Title>Список категории</Title>
            <Button
                type={'dashed'}
                style={{ marginTop: 16, maxWidth: 200 }}
                onClick={() => {
                    history.push('/authorized/addCategory')
                }}
            >
                Добавить категорию
            </Button>
            <Table
                rowKey={(obj) => obj.id}
                style={{ flex: 1, marginTop: 24 }}
                dataSource={dataSource}
                loading={loading}
                expandable={{ expandedRowRender }}
            >
                <Column title={'Название'} dataIndex={'name'} key={'name'} />
                <Column
                    title={'Вид категории'}
                    dataIndex={'types'}
                    key={'types'}
                    render={(types) => {
                        return types.map((item, index) => {
                            return (
                                <Tag key={index} color={enumColorMap[item]}>
                                    {enumMap[item]}
                                </Tag>
                            )
                        })
                    }}
                />
            </Table>
        </Container>
    )
}

export default Category
