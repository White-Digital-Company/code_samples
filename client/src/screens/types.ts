import { StackScreenProps } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteId } from 'Routes'

export type RootStackParamList = {
  Auth: undefined
  Routes: undefined
}

export type AuthStackParamList = {
  Language: undefined
  Login: undefined
  ChangePassword: { login: string }
}

export type RoutesStackParamList = {
  Home: undefined
  Stops: { routeId: RouteId }
  NotAcceptedOrders: undefined
  OrderDetails: { routeIndex: number; stopIndex: number; orderIndex: number }
  StopsMapPreview: { routeId: RouteId }
  CheckPhoto: undefined
  Options: { routeId: RouteId; stopIndex: number }
  Settings: undefined
}

export type AuthLanguageScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Language'
>

export type AuthChangePasswordScreenRouteProp = RouteProp<
  AuthStackParamList,
  'ChangePassword'
>

export type RoutesHomeScreenNavigationProp = StackNavigationProp<
  RoutesStackParamList,
  'Home'
>

export type RoutesStopsScreenNavigationProp = StackNavigationProp<
  RoutesStackParamList,
  'Stops'
>

export type RoutesNotAcceptedOrdersScreenNavigationProp = StackNavigationProp<
  RoutesStackParamList,
  'NotAcceptedOrders'
>

export type RoutesStopsScreenRouteProp = RouteProp<
  RoutesStackParamList,
  'Stops'
>

export type RoutesStopsMapPreviewScreenRouteProp = RouteProp<
  RoutesStackParamList,
  'StopsMapPreview'
>

export type RoutesStopsMapPreviewScreenNavigationProp = StackNavigationProp<
  RoutesStackParamList,
  'StopsMapPreview'
>

export type RoutesOrderDetailsScreenNavigationProp = StackNavigationProp<
  RoutesStackParamList,
  'OrderDetails'
>

export type RoutesOrderDetailsScreenRouteProp = RouteProp<
  RoutesStackParamList,
  'OrderDetails'
>

export type RoutesOptionsScreenNavigationProp = StackNavigationProp<
  RoutesStackParamList,
  'Options'
>

export type RoutesOptionsScreenRouteProp = RouteProp<
  RoutesStackParamList,
  'Options'
>
