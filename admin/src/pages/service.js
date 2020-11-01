import React from 'react'
import styled from 'styled-components'
import { Button, Table, Tag } from 'antd'
import { useHistory } from 'react-router-dom'
import { Title } from '../components/defaultTexts'
import { useQuery } from '@apollo/react-hooks'
import { FIND_MANY_SERVICE } from '../gqls/service/queries'
import UpdateService from '../components/updateService'

const { Column } = Table

const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`

const Service = () => {
    const { loading, data } = useQuery(FIND_MANY_SERVICE, {
        errorPolicy: 'ignore',
        fetchPolicy: 'network-only'
    })

    const history = useHistory()

    const dataSource = data ? data.findManyService : []

    const expandedRowRender = (data) => <UpdateService data={data} />

    return (
        <Container>
            <Title>Список услуг</Title>
            <Button
                type={'dashed'}
                style={{ marginTop: 16, maxWidth: 200 }}
                onClick={() => {
                    history.push('/authorized/addService')
                }}
            >
                Добавить услугу
            </Button>
            <Table
                style={{ flex: 1, marginTop: 24 }}
                dataSource={dataSource}
                loading={loading}
                rowKey={(obj) => obj.id}
                expandable={{ expandedRowRender }}
            >
                <Column title={'Название'} dataIndex={'name'} key={'name'} />
                <Column title={'Цена'} dataIndex={'amount'} key={'amount'} />
                <Column title={'Описание'} dataIndex={'description'} key={'description'} />
                <Column
                    title={'Категория'}
                    dataIndex={'category'}
                    key={'category'}
                    render={(category) => {
                        if (!category) {
                            return null
                        }
                        return <Tag>{category.name}</Tag>
                    }}
                />
            </Table>
        </Container>
    )
}
export default Service
