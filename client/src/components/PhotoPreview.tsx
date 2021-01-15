import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components/native'
import AddPhotoIcon from 'assets/icons/add-photo.svg'

interface PhotoPreviewProps {
  width: number
  height: number
  photo?: string
  onPress?: () => any
}

const PhotoPreview = ({ width, height, photo, onPress }: PhotoPreviewProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <PhotoContainer style={{ width, height }}>
        {photo ? (
          <Photo source={{ uri: photo }} resizeMode="cover" />
        ) : (
          <AddPhotoIcon width={width / 6} height={width / 6} />
        )}
      </PhotoContainer>
    </TouchableWithoutFeedback>
  )
}

export default PhotoPreview

const PhotoContainer = styled.View`
  align-self: center;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.system.white};
`

const Photo = styled.Image`
  width: 100%;
  height: 100%;
`
