import React, { Ref, forwardRef } from 'react'
import styled from 'styled-components/native'
import BottomSheet from 'reanimated-bottom-sheet'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const BottomSheetModal: any = forwardRef(
  ({ children }, ref: Ref<BottomSheet>) => {
    const { bottom: bottomInset } = useSafeAreaInsets()

    const renderHeader = () => (
      <Header>
        <HeaderDecorativeBar />
      </Header>
    )

    return (
      <BottomSheet
        ref={ref}
        initialSnap={1}
        snapPoints={[350, 0]}
        renderHeader={renderHeader}
        renderContent={() => (
          <ContentContainer bottomInset={bottomInset}>
            {children}
          </ContentContainer>
        )}
      />
    )
  },
)

export default BottomSheetModal

const Header = styled.View`
  justify-content: center;
  align-items: center;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.system.white};
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`

const HeaderDecorativeBar = styled.View`
  width: 80px;
  height: 5px;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  background-color: ${({ theme }) => theme.colors.ui.grey[100]};
`

const ContentContainer = styled.View<{ bottomInset: number }>`
  height: 320px;
  padding: 15px;
  padding-bottom: ${({ bottomInset }) => bottomInset + 20}px;
  background-color: ${({ theme }) => theme.colors.system.white};
`
