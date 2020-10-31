import React, {useState} from 'react'
import styled from 'styled-components'
import {Button, Table, Tag} from "antd"
import {useHistory} from "react-router-dom"
import {Title} from "../components/defaultTexts"
import {useQuery} from "@apollo/react-hooks"
import {FIND_MANY_SERVICE} from "../gqls/service/queries"
import UpdateService from "../components/updateService"

const {Column} = Table

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

const Service = () => {
    const [dataSource, setDataSource] = useState([])
    const {loading,refetch} = useQuery(FIND_MANY_SERVICE, {
        onCompleted: ({findManyService}) => {
            setDataSource(findManyService.map(
                (item) => {
                    item.key = item.id
                    return item
                }
            ))
        },
        errorPolicy: "ignore",
        variables: {where: {}}
    })

    const history = useHistory()

    const expandedRowRender = (data) => {
        return (
            <UpdateService
                data={data}
                oldDataSource={dataSource}
                setDataSource={setDataSource}
            />
        )
    }

    return (
        <Container>
            <Title>Список услуг</Title>
            <Button
                type={'dashed'}
                style={{marginTop: 16, maxWidth: 200}}
                onClick={
                    () => {
                        history.push('/authorized/addService')
                    }
                }
            >
                Добавить услугу
            </Button>
            <Table
                style={{flex: 1, marginTop: 24}}
                dataSource={dataSource}
                loading={loading}
                expandable={{expandedRowRender}}
            >
                <Column
                    title={'Название'}
                    dataIndex={'name'}
                    key={'name'}
                />
                <Column
                    title={'Цена'}
                    dataIndex={'amount'}
                    key={'amount'}
                />
                <Column
                    title={'Описание'}
                    dataIndex={'description'}
                    key={'description'}
                />
                <Column
                    title={'Категория'}
                    dataIndex={'category'}
                    key={'category'}
                    render={
                        (category) => {
                            return (
                                <Tag>{category.name}</Tag>
                            )
                        }
                    }
                />
            </Table>
        </Container>
    )
}
export default Service
