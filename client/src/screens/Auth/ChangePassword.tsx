import React, { useState } from 'react'
import { Linking } from 'react-native'
import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { flowResult } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useRoute } from '@react-navigation/native'
import useStores from 'stores'
import { AuthChangePasswordScreenRouteProp } from 'screens/types'
import { smallerIphoneX } from 'tools/screenSizes'
import { Heading3, Heading5, Description } from 'uikit/Typography'
import { PrimaryButton, TransparentButton } from 'uikit/Buttons'
import { Input } from 'uikit/Input'
import LockIcon from 'assets/icons/lock.svg'
import PhoneIcon from 'assets/icons/phone.svg'

const AuthChangePasswordScreen = () => {
  const {
    params: { login },
  } = useRoute<AuthChangePasswordScreenRouteProp>()

  const { authStore } = useStores()

  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [isConfirmPasswordError, setIsConfirmPasswordError] = useState<boolean>(
    false,
  )

  const onSubmit = async () => {
    setIsConfirmPasswordError(false)
    const finalPassword = password.trim()
    const finalConfirmedPassword = confirmedPassword.trim()

    await flowResult(authStore.changePassword(login, finalPassword))
  }

  return (
    <Container>
      <TitleContainer>
        <Heading3 bold align="center">
          You need to change your password
        </Heading3>
      </TitleContainer>

      <IconContainer>
        <LockIcon
          width={wp(smallerIphoneX ? 15 : 18)}
          height={wp(smallerIphoneX ? 15 : 18)}
        />
      </IconContainer>

      <KeyboardAwareScrollView
        enableOnAndroid
        extraScrollHeight={-hp(20) + (smallerIphoneX ? 10 : 30) + 10}
        style={{ marginVertical: 5 }}
      >
        <FormContainer>
          <InputWithLabelContainer style={{ marginBottom: 20 }}>
            <Label bold>Пароль</Label>
            <Input
              secureTextEntry
              placeholder="******"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </InputWithLabelContainer>

          <InputWithLabelContainer>
            <Label bold>Повторите пароль</Label>
            <Input
              secureTextEntry
              placeholder="******"
              value={confirmedPassword}
              onChangeText={(text) => setConfirmedPassword(text)}
            />
          </InputWithLabelContainer>

        </FormContainer>
      </KeyboardAwareScrollView>

      <SubmitButtonContainer>
        <PrimaryButton title="OK" onPress={onSubmit} />
      </SubmitButtonContainer>

      <CallOperatorContainer>
        <TransparentButton
          style={{ alignItems: 'center' }}
          title="Call"
          Icon={PhoneIcon}
          onPress={async () => {
            await Linking.openURL('tel:+154354645654')
          }}
        />
      </CallOperatorContainer>
    </Container>
  )
}
export default observer(AuthChangePasswordScreen)

const Container = styled(SafeAreaView).attrs({
  edges: ['bottom', 'left', 'right'],
})`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.system.bg};
`

const TitleContainer = styled.View`
  max-width: 80%;
  align-self: center;
  margin-top: 10px;
  align-items: center;
`

const IconContainer = styled.View`
  margin-top: 30px;
  align-items: center;
`

const FormContainer = styled.View`
  margin: ${smallerIphoneX ? '10px auto' : '30px auto'};
  width: 80%;
`

const InputWithLabelContainer = styled.View``

const Label = styled(Heading5)`
  margin-bottom: 10px;
`

const ErrorMessage = styled(Description)`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.ui.red[100]};
  text-align: right;
`

const SubmitButtonContainer = styled.View`
  margin: 15px auto 0;
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  width: 80%;
`

const CallOperatorContainer = styled.View`
  flex-direction: row;
  margin: 20px 0 10px;
`
