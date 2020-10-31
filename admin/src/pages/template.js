import React, {useState} from 'react'
import styled from 'styled-components'
import {Button, Table, Tag} from "antd"
import {useHistory} from "react-router-dom"
import {Title} from "../components/defaultTexts"
import {useQuery} from "@apollo/react-hooks"
import {FIND_MANY_TEMPLATE} from "../gqls/template/queries"

const {Column} = Table

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

const Template = () => {
    const [dataSource, setDataSource] = useState([])
    const {loading} = useQuery(FIND_MANY_TEMPLATE, {
        onCompleted: ({findManyTemplate}) => {
            setDataSource(findManyTemplate.map(
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
        /*return (
            <UpdateService
                data={data}
                oldDataSource={dataSource}
                setDataSource={setDataSource}
            />
        )*/
        return null
    }

    return (
        <Container>
            <Title>Список шаблонов</Title>
            <Button
                type={'dashed'}
                style={{marginTop: 16, maxWidth: 200}}
                onClick={
                    () => {
                        history.push('/authorized/addTemplate')
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
                    title={'Тип мероприятия'}
                    dataIndex={'types'}
                    key={'types'}
                    render={
                        (types) => {
                            return (
                                types.map(
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
                <Column
                    title={'Услуги'}
                    dataIndex={'services'}
                    key={'services'}
                    render={
                        (services) => {
                            return (
                                services.map(
                                    (item, index) => {
                                        return (
                                            <Tag key={index}>{item.name}</Tag>
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
export default Template
