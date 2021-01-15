import React, { useState } from 'react'
import { Alert } from 'react-native'
import styled from 'styled-components/native'
import { Heading5 } from 'uikit/Typography'
import { widthPercentageToDP as wd } from 'react-native-responsive-screen'
import { PrimaryButton } from 'uikit/Buttons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ImagePicker from 'react-native-image-picker'
import CameraIcon from 'assets/icons/checkPhoto/camera.svg'
import RepeatIcon from 'assets/icons/checkPhoto/repeat.svg'
import AcceptIcon from 'assets/icons/checkPhoto/accept.svg'
import PhotoPreview from 'components/PhotoPreview'

const RoutesCheckPhotoScreen = () => {
  const { bottom: bottomInset } = useSafeAreaInsets()
  const [photo, setPhoto] = useState<string>()

  const onTakePhoto = async () => {
    ImagePicker.launchCamera(
      { mediaType: 'photo' },
      ({ didCancel, error, uri, fileName }) => {
        if (didCancel) return
        if (error || !uri)
          Alert.alert('Ошибка', 'Проверьте разрешение к камере')
        setPhoto(uri)
      },
    )
  }

  const onSubmit = () => {}

  return (
    <Container>
      <PreviewContainer>
        <TitleContainer>
          <Heading5 align="center" bold>
            Сфотографируйте чек
          </Heading5>
        </TitleContainer>

        <PhotoPreview width={wd(80)} height={wd(80)} photo={photo} />
      </PreviewContainer>

      <ButtonsContainer bottomInset={bottomInset}>
        <ButtonsWrapper>
          {photo ? (
            <>
              <ButtonContainer style={{ marginRight: 5 }}>
                <PrimaryButton
                  Icon={RepeatIcon}
                  title="Переснять"
                  onPress={onTakePhoto}
                />
              </ButtonContainer>
              <ButtonContainer style={{ marginLeft: 5 }}>
                <PrimaryButton
                  Icon={AcceptIcon}
                  title="Принять"
                  onPress={onSubmit}
                />
              </ButtonContainer>
            </>
          ) : (
            <ButtonContainer>
              <PrimaryButton
                Icon={CameraIcon}
                title="Открыть камеру"
                onPress={onTakePhoto}
              />
            </ButtonContainer>
          )}
        </ButtonsWrapper>
      </ButtonsContainer>
    </Container>
  )
}

export default RoutesCheckPhotoScreen

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.system.bg};
`

const PreviewContainer = styled.View`
  margin-top: 40px;
`

const TitleContainer = styled.View`
  padding: 0 10px;
  margin-bottom: 30px;
`

const ButtonsContainer = styled.View<{ bottomInset: number }>`
  flex: 1;
  justify-content: flex-end;
  padding: 0 5%;
  margin-bottom: ${({ bottomInset }) => bottomInset + 20}px;
`

const ButtonsWrapper = styled.View`
  flex-direction: row;
`

const ButtonContainer = styled.View`
  flex: 1;
`
