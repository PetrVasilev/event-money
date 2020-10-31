import React, {useState} from 'react'
import styled from 'styled-components'
import {Title} from "../components/defaultTexts"
import {Button, Table, Tag} from "antd"
import {useQuery} from '@apollo/react-hooks'
import {FIND_MANY_CATEGORY} from "../gqls/category/queries"

const {Column} = Table;

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`
const TableContainer = styled.div`
  display: flex;
  flex: 1;
  margin-top: 24px;
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
    const [dataSource, setDataSource] = useState([])
    const {loading} = useQuery(FIND_MANY_CATEGORY, {
        onCompleted: ({findManyCategory}) => {
            setDataSource(findManyCategory)
        },
        errorPolicy: "ignore"
    })
    return (
        <Container>
            <Title>Список категории</Title>
            <Button
                type={'dashed'}
                style={{marginTop: 16, maxWidth: 200}}
                onClick={
                    () => {

                    }
                }
            >
                Добавить категорию
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
                    title={'Вид категории'}
                    dataIndex={'types'}
                    key={'types'}
                    render={
                        (categories) => {
                            console.log(categories)
                            return (
                                categories.map(
                                    (item) => {
                                        return (
                                            <Tag color={enumColorMap[item]}>{enumMap[item]}</Tag>
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

export default Category
