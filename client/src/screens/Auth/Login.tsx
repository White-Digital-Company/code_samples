import React, { useState } from 'react'
import { Linking } from 'react-native'
import { flowResult } from 'mobx'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { smallerIphoneX } from 'tools/screenSizes'
import AccountIcon from 'assets/icons/account.svg'
import PhoneIcon from 'assets/icons/phone.svg'
import { Heading5, Description } from 'uikit/Typography'
import { PrimaryButton, TransparentButton } from 'uikit/Buttons'
import { Input } from 'uikit/Input'
import useStores from 'stores'

const AuthLoginScreen = () => {
  const { authStore } = useStores()

  const [login, setLogin] = useState('19@Demo (UA2)')
  const [password, setPassword] = useState('123456')

  const onSubmit = async () => {
    await flowResult(authStore.login(login, password))
  }

  return (
    <Container>
      <IconContainer>
        <AccountIcon
          width={wp(smallerIphoneX ? 20 : 25)}
          height={wp(smallerIphoneX ? 20 : 25)}
        />
      </IconContainer>

      <KeyboardAwareScrollView
        enableOnAndroid
        extraScrollHeight={-hp(20) + 30 + 10}
        style={{ marginVertical: 5 }}
      >
        <FormContainer>
          <InputWithLabelContainer style={{ marginBottom: 20 }}>
            <Label bold>Логин</Label>
            <Input
              placeholder="Ivan71"
              value={login}
              onChangeText={(value) => setLogin(value)}
            />
          </InputWithLabelContainer>

          <InputWithLabelContainer>
            <Label bold>Пароль</Label>
            <Input
              placeholder="Введите пароль"
              secureTextEntry
              value={password}
              onChangeText={(value) => setPassword(value)}
            />
          </InputWithLabelContainer>

          {authStore.isError && <ErrorMessage>*Неверный пароль</ErrorMessage>}
        </FormContainer>
      </KeyboardAwareScrollView>

      <SubmitButtonContainer>
        <PrimaryButton title="OK" onPress={onSubmit} />
      </SubmitButtonContainer>

      <CallOperatorContainer>
        <TransparentButton
          style={{ alignItems: 'center' }}
          title="Позвонить оператору"
          Icon={PhoneIcon}
          onPress={async () => {
            await Linking.openURL('tel:+38050123456')
          }}
        />
      </CallOperatorContainer>
    </Container>
  )
}
export default observer(AuthLoginScreen)

const Container = styled(SafeAreaView).attrs({
  edges: ['bottom', 'left', 'right'],
})`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.system.bg};
`

const IconContainer = styled.View`
  margin-top: 5%;
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
