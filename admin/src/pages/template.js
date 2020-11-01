import React from 'react'
import styled from 'styled-components'
import {Button, Table, Tag} from 'antd'
import {useHistory} from 'react-router-dom'
import {useQuery} from '@apollo/react-hooks'

import {Title} from '../components/defaultTexts'
import {FIND_MANY_TEMPLATE} from '../gqls/template/queries'
import UpdateTemplate from '../components/updateTemplate'
import {ENUM_COLOR_MAP, ENUM_MAP} from "../utils/enums"

const {Column} = Table

const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`

const enumMap = ENUM_MAP
const enumColorMap = ENUM_COLOR_MAP
const Template = () => {
    const {loading, data} = useQuery(FIND_MANY_TEMPLATE, {
        errorPolicy: 'ignore',
        fetchPolicy: 'network-only'
    })

    const history = useHistory()

    const dataSource = data ? data.findManyTemplate : []

    const expandedRowRender = (data) => <UpdateTemplate data={data}/>

    return (
        <Container>
            <Title>Список шаблонов</Title>
            <Button
                type={'dashed'}
                style={{marginTop: 16, maxWidth: 200}}
                onClick={() => {
                    history.push('/authorized/addTemplate')
                }}
            >
                Добавить услугу
            </Button>
            <Table
                style={{flex: 1, marginTop: 24}}
                dataSource={dataSource}
                loading={loading}
                expandable={{expandedRowRender}}
                rowKey={(obj) => obj.id}
            >
                <Column title={'Название'} dataIndex={'name'} key={'name'}/>
                <Column title={'Цена'} dataIndex={'amount'} key={'amount'}/>
                <Column title={'Описание'} dataIndex={'description'} key={'description'}/>
                <Column
                    title={'Тип мероприятия'}
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
                <Column
                    title={'Услуги'}
                    dataIndex={'services'}
                    key={'services'}
                    render={(services) => {
                        return services.map((item, index) => {
                            return <Tag key={index}>{item.name}</Tag>
                        })
                    }}
                />
            </Table>
        </Container>
    )
}
export default Template
