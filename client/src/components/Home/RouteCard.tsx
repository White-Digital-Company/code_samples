import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import styled, { useTheme } from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { Heading5 } from 'uikit/Typography'
import { Route } from 'Routes'
import { RoutesHomeScreenNavigationProp } from 'screens/types'
import formatDate from 'tools/formatDate'
import LocationIcon from 'assets/icons/location.svg'

interface RouteCardProps {
  route: Route
}

const RouteCard = ({ route }: RouteCardProps) => {
  const theme = useTheme()
  const navigation = useNavigation<RoutesHomeScreenNavigationProp>()

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('Stops', { routeId: route.id })}
    >
      <RouteCardContainer style={{ ...theme.elevation.basic }}>
        <Row style={{ marginBottom: 15 }}>
          <TextContainer style={{ flex: 2 }}>
            <TextValue align="left">
              {formatDate(route.date, '03.04.2020')}
            </TextValue>
          </TextContainer>
          <TextContainer style={{ flex: 1 }}>
            <TextValue align="center">
              {formatDate(route.date, 'Tue')}
            </TextValue>
          </TextContainer>
          <TextContainer style={{ flex: 2 }}>
            <TextValue align="right">
              {formatDate(route.startTime, '12:54')}-
              {formatDate(route.endTime, '12:54')}
            </TextValue>
          </TextContainer>
        </Row>
        <Row>
          <TextContainer style={{ flex: 2 }}>
            <TextValue align="left">КМ: {route.km}</TextValue>
          </TextContainer>
          <TextContainer style={{ flex: 1 }}>
            <NumberOfStopsContainer>
              <LocationIcon width={16} height={16} />
              <TextValue align="center">{route.stopsNum}</TextValue>
            </NumberOfStopsContainer>
          </TextContainer>
          <TextContainer style={{ flex: 2 }}>
            <TextValue align="right">{route.vehiclePlateNumber}</TextValue>
          </TextContainer>
        </Row>
      </RouteCardContainer>
    </TouchableWithoutFeedback>
  )
}

export default RouteCard

const RouteCardContainer = styled.View`
  margin: 8px 0;
  padding: 10px 24px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background-color: ${({ theme }) => theme.colors.system.white};
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`

const TextContainer = styled.View``

const TextValue = styled(Heading5).attrs({
  numberOfLines: 1,
})`
  margin: 0 5px;
`

const NumberOfStopsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
