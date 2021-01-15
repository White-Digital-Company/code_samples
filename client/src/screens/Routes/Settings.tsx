import React from 'react'
import { Linking } from 'react-native'
import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { observer } from 'mobx-react-lite'
import useStores from 'stores'
import { DefaultNavigator } from 'stores/SettingsStore'
import { Heading5 } from 'uikit/Typography'
import Select from 'uikit/Select'
import { TransparentButton } from 'uikit/Buttons'
import SignOutIcon from 'assets/icons/sign_out.svg'
import PhoneIcon from 'assets/icons/phone.svg'

const LABEL_TO_VALUE = {
  google: 'Google Maps',
  waze: 'Waze',
  osmand: 'OsmAnd',
}

const RoutesSettings = () => {
  const { settingsStore, authStore } = useStores()

  return (
    <Container>
      <SettingsBlock>
        <Heading5 bold style={{ marginBottom: 10 }}>
          Навигатор по умолчанию
        </Heading5>
        <Select
          value={settingsStore.defaultNavigator}
          options={[
            { label: LABEL_TO_VALUE['google'], value: 'google' },
            { label: LABEL_TO_VALUE['waze'], value: 'waze' },
            { label: LABEL_TO_VALUE['osmand'], value: 'osmand' },
          ]}
          onChange={(value) =>
            settingsStore.changeDefaultNavigator(value as DefaultNavigator)
          }
        />
      </SettingsBlock>

      <BottomBlock>
        <ButtonsContainer>
          <TransparentButton
            Icon={PhoneIcon}
            title="Call"
            onPress={async () => Linking.openURL('tel://+745345345345')}
            style={{ marginRight: 5 }}
          />
          <TransparentButton
            Icon={SignOutIcon}
            title="Sign out"
            onPress={async () => authStore.signOut()}
            style={{ marginLeft: 5, alignItems: 'flex-end' }}
          />
        </ButtonsContainer>
      </BottomBlock>
    </Container>
  )
}

export default observer(RoutesSettings)

const Container = styled(SafeAreaView).attrs({
  edges: ['bottom', 'left', 'right'],
})`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.system.bg};
`

const SettingsBlock = styled.View`
  margin: 10px 20px;
`

const BottomBlock = styled.View`
  flex: 1;
  justify-content: flex-end;
`

const ButtonsContainer = styled.View`
  margin: 20px;
  flex-direction: row;
  align-items: center;
`
