import React from 'react'
import styled from 'styled-components/native'
import { ActivityIndicator } from 'react-native'

const ScreenLoading = () => {
  return (
    <Container>
      <ActivityIndicator color="#000" size="large" />
    </Container>
  )
}

export default ScreenLoading

const Container = styled.View`
  flex: 1;
  padding: 100px 50px;
`
