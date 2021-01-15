import React from 'react'
import styled from 'styled-components/native'
import { ActivityIndicator } from 'react-native'

const Loading = ({ color = '#fff', containerMargin = '10px' }) => {
  return (
    <Container containerMargin={containerMargin}>
      <ActivityIndicator color={color} size="small" />
    </Container>
  )
}

export default Loading

const Container = styled.View<{ containerMargin: string }>`
  margin: ${({ containerMargin }) => containerMargin};
`
