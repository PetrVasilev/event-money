import React, {useState} from 'react'
import styled from 'styled-components'
import {Button, Table, Tag} from "antd"
import {useHistory} from "react-router-dom"
import {Title} from "../components/defaultTexts"
import {useQuery} from "@apollo/react-hooks"
import {FIND_MANY_SERVICE} from "../gqls/service/queries"

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

const Service = () => {
    const [dataSource, setDataSource] = useState([])
    const {loading} = useQuery(FIND_MANY_SERVICE, {
        onCompleted: ({findManyService}) => {
            setDataSource(findManyService)
        },
        errorPolicy: "ignore"
    })

    const history = useHistory()

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
                    title={'Вид категории'}
                    dataIndex={'types'}
                    key={'types'}
                    render={
                        (categories) => {
                            console.log(categories)
                            return (
                                categories.map(
                                    (item, index) => {
                                        return (
                                            <Tag key={index} color={enumColorMap[item]}>{enumMap[item]}</Tag>
                                        )
                                    }
                                )
                            )
                        }
                    }

                />
            </Table>
        </Container>
    )
}
export default Service
