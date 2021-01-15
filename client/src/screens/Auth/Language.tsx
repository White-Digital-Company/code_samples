import React from 'react'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { AuthLanguageScreenNavigationProp } from 'screens/types'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import LangIcon from 'assets/icons/lang.svg'
import { Heading3 } from 'uikit/Typography'
import { smallerIphoneX } from 'tools/screenSizes'
import Select from 'uikit/Select'
import { PrimaryButton } from 'uikit/Buttons'

const AuthLanguageScreen = () => {
  const navigation = useNavigation<AuthLanguageScreenNavigationProp>()

  const onSubmit = () => {
    navigation.navigate('Login')
  }

  return (
    <Container>
      <IconContainer>
        <LangIcon
          width={wp(smallerIphoneX ? 20 : 25)}
          height={wp(smallerIphoneX ? 20 : 25)}
        />
      </IconContainer>

      <TitleContainer>
        <Heading3 bold align="center">
          Choose a language
        </Heading3>
      </TitleContainer>

      <SelectContainer>
        <Select
          value="en"
          options={[
            { label: 'English', value: 'en' },
            { label: 'Russian', value: 'ru' },
          ]}
          onChange={(value) => {}}
        />
      </SelectContainer>

      <SubmitButtonContainer>
        <PrimaryButton title="OK" onPress={onSubmit} />
      </SubmitButtonContainer>
    </Container>
  )
}
export default AuthLanguageScreen

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.system.bg};
`

const IconContainer = styled.View`
  margin-top: 70px;
  align-items: center;
`

const TitleContainer = styled.View`
  margin: 25px 10px 0;
  max-width: 80%;
  align-self: center;
  align-items: center;
`

const SelectContainer = styled.View`
  margin: 15px auto 0;
  width: 60%;
`

const SubmitButtonContainer = styled.View`
  margin: 15px auto 65px;
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  width: 80%;
`
