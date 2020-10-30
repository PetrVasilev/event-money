import React from 'react'
import styled from 'styled-components'
import {Title} from "../components/defaultTexts"
import AddField from "../components/addField"
import {Button} from "antd"

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`
const Fields = styled.div`
  margin-top:24px;
  display: flex;
  .gap{
    margin-right: 16px;
    margin-bottom: 16px;
    @media screen and (max-width: 800px){
      margin-right: 0;
    }
  }
  
`
const AddCategory = () => {
    return (
        <Container>
            <Title>Добавление категории</Title>
            <Fields>
                <AddField
                    text={'Название'}
                    className={'gap'}
                    placeholder={'Введите название'}
                />
            </Fields>
            <Button style={{marginTop:16}} type={'primary'}>Добавить</Button>
        </Container>
    )
}

export default AddCategory
