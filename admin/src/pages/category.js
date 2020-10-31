import React from 'react'
import styled from 'styled-components'
import {Title} from "../components/defaultTexts"
import {Button, Table} from "antd"

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`
const TableContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Category = () => {
    return (
        <Container>
            <Title>Список категории</Title>
            <Button
                type={'dashed'}
                style={{marginTop: 16,maxWidth:200}}
            >
                Добавить категории
            </Button>
            <TableContainer>
                <Table

                />
            </TableContainer>

        </Container>
    )
}

export default Category
