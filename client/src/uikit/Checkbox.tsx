import React from 'react'
import styled from 'styled-components/native'

const Container = styled.View`
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
  border: ${({ theme }) => `1px solid ${theme.colors.system.black}`};
  border-radius: ${({ theme }) => theme.borderRadius.small};
`

const CheckedMarker = styled.View`
  width: 14px;
  height: 14px;
  background-color: ${({ theme }) => theme.colors.system.black};
  border-radius: ${({ theme }) => theme.borderRadius.xsmall};
`

const Checkbox = ({ checked }: { checked: boolean }) => {
  return <Container>{checked && <CheckedMarker />}</Container>
}

export default Checkbox
