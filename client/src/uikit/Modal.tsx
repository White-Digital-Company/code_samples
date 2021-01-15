import React from 'react'
import styled, { useTheme } from 'styled-components/native'
import { Heading4 } from 'uikit/Typography'
import { CardButton } from 'uikit/Buttons'

interface ModalProps {
  title: string
  visible: boolean
  onClose: () => void
  onAccept: () => void
}

const Modal = ({ title, visible, onClose, onAccept }: ModalProps) => {
  const theme = useTheme()

  return (
    <ModalContainer
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
      transparent
    >
      <Wrapper>
        <Container>
          <Content>
            <Heading4 align="center">{title}</Heading4>
          </Content>
          <Buttons>
            <CardButton
              buttonPosition="left"
              title="Отмена"
              bgColor={theme.colors.ui.grey[300]}
              textColor={theme.colors.system.black}
              onPress={onClose}
            />
            <CardButton
              buttonPosition="right"
              title="Ок"
              bgColor={theme.colors.ui.grey[200]}
              textColor={theme.colors.system.black}
              onPress={onAccept}
            />
          </Buttons>
        </Container>
      </Wrapper>
    </ModalContainer>
  )
}

export default Modal

const ModalContainer = styled.Modal``

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
`

const Container = styled.View`
  width: 80%;
  margin: 0 auto;
  margin-bottom: 10%;
  background-color: ${({ theme }) => theme.colors.system.white};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`

const Content = styled.View`
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
`

const Buttons = styled.View`
  flex-direction: row;
`
