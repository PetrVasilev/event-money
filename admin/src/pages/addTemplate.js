import React, {useState} from 'react'
import styled from 'styled-components'
import {Title} from "../components/defaultTexts"
import AddField from "../components/addField"
import {useMutation, useQuery} from "@apollo/react-hooks"
import {Button, message} from "antd"
import LoadingBar from "../components/loadingBar"
import AddFieldSelect from "../components/addFieldSelect"
import {CREATE_ONE_TEMPLATE} from "../gqls/template/mutations"
import {FIND_MANY_SERVICE} from "../gqls/service/queries"

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`
const Fields = styled.div`
  margin-top: 24px;
  display: flex;

  .gap {
    margin-right: 24px;
    margin-bottom: 24px;
    @media screen and (max-width: 800px) {
      margin-right: 0;
    }
  }
  .input{
    min-width: 290px;
  }

  @media screen and (max-width: 800px) {
    flex-direction: column;
  }

`
const BottomContainer = styled.div`
  display: flex;
`
const AddTemplate = () => {
    const [name, setName] = useState('')
    const [service, setService] = useState()
    const [serviceArray, setServiceArray] = useState()

    const {loading: queryLoading} = useQuery(FIND_MANY_SERVICE, {
        errorPolicy: 'ignore',
        onCompleted: ({findManyService}) => {
            setServiceArray(findManyService)
        }
    })

    const [save, {loading}] = useMutation(CREATE_ONE_TEMPLATE, {
        onCompleted: () => {
            message.success('Добавлено')
        },
        onError: (error) => {
            message.error('Что то пошло не так')
        }
    })

    const onSave = () => {
        if (name === '') {
            message.error('Введите имя')
            return null
        }
        if (!service) {
            message.error('Выберите услугу')
            return null
        }
        const variables = {
            data: {
                name,
                services: {
                    connect: service.map(
                        (item) => {
                            return {id: item}
                        }
                    )
                }
            }
        }
        console.log(variables)
        save({
            variables
        })

    }

    return (
        <Container>
            <Title>Добавление шаблона</Title>
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
                <AddFieldSelect
                    text={'Услуга'}
                    className={'gap input'}
                    placeholder={'Выберите услугу'}
                    mode={'multiple'}
                    value={service}
                    onChange={
                        (value) => {
                            setService(value)
                        }
                    }
                    data={serviceArray}
                    loading={queryLoading}

                />
            </Fields>
            <BottomContainer>
                {
                    loading ?
                        <LoadingBar/>
                        :
                        <Button
                            style={{marginTop: 16, maxWidth: 200}}
                            type={'primary'}
                            onClick={onSave}
                        >
                            Добавить
                        </Button>}
            </BottomContainer>

        </Container>
    )
}

export default AddTemplate
