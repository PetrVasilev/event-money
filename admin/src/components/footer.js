import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  height: 40px;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const Footer =()=>{
    return (
        <Container>
            Разработано командой it kitchen
        </Container>
    )
}

export default Footer
