import React, {useState} from 'react'
import styled from 'styled-components'
import {Title} from "../components/defaultTexts"
import AddField from "../components/addField"
import {useMutation} from "@apollo/react-hooks"
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
    const [name, setName] = useState('')

    const [add,{loading}] =useMutation()

    return (
        <Container>
            <Title>Добавление категории</Title>
            <Fields>
                <AddField
                    text={'Название'}
                    className={'gap'}
                    placeholder={'Введите название'}
                    value={name}
                    onChange={
                        (e) => {
                            setName(e.target.value)
                        }
                    }
                />
            </Fields>
            <Button style={{marginTop: 16, maxWidth: 200}} type={'primary'}>Добавить</Button>
        </Container>
    )
}

export default AddCategory
