import React, { useState } from 'react'
import styled, { useTheme } from 'styled-components/native'
import { Description } from 'uikit/Typography'
import SaleIcon from 'assets/icons/wareCard/sale.svg'
import DollarIcon from 'assets/icons/wareCard/dollar.svg'
import AmountSelector from 'components/Routes/OrderDetails/AmountSelector'
import Checkbox from 'uikit/Checkbox'
import Select from 'uikit/Select'
import Textarea from 'uikit/Textarea'
import { BaseWare } from 'Orders'

interface WareCardProps extends BaseWare {
  selected: boolean
}

const OrderDetailsWareCard = ({ selected, ...ware }: WareCardProps) => {
  const theme = useTheme()

  return (
    <Container selected={selected}>
      <Row style={{ alignItems: 'flex-start' }}>
        <LeftCol>
          <Description bold numberOfLines={2}>
            {ware.name}
          </Description>
        </LeftCol>
        <RightCol>
          <Description bold>
            {ware.quantity} {ware.unit}
          </Description>
        </RightCol>
      </Row>

      <Row style={{ marginTop: 10 }}>
        <LeftCol>
          <Description style={{ color: theme.colors.ui.grey[400] }}>
            {ware.category}
          </Description>
        </LeftCol>
        <RightCol>
          <Description>х {ware.price}</Description>
        </RightCol>
      </Row>

      <Row style={{ marginTop: 5 }}>
        <LeftCol>
          <Description bold style={{ marginTop: 8 }}>
            {ware.barcode}
          </Description>
        </LeftCol>

        <RightCol>
          <Row>
            <Description style={{ marginRight: 5 }}>
              {ware.discount || 0}
            </Description>
            <SaleIcon width={12} height={12} />
          </Row>
        </RightCol>
      </Row>

      <Row style={{ marginTop: 5 }}>
        <LeftCol style={{ alignItems: 'flex-end' }}>
          <Row>
            <Description
              bold
              style={{ marginRight: 5, color: theme.colors.ui.red[100] }}
            >
              {ware.amount}
            </Description>
            <DollarIcon width={12} height={12} />
          </Row>
        </LeftCol>
      </Row>

      {false && (
        <GoodReturnContainer>
          <CounterContainer>
            <AmountSelector
              value={0}
              setValue={(newValue) => {}}
              measure="кг"
            />
            <CheckboxContainer>
              <Checkbox checked={selected} />
            </CheckboxContainer>
          </CounterContainer>
          {selected && (
            <ReasonAndNoteContainer>
              <Select
                size="medium"
                options={[{ label: 'Опция 1', value: 'Опция 1' }]}
                value={'3'}
                onChange={(value) => {}}
              />
              <Textarea
                style={{
                  marginTop: 8,
                  fontSize: theme.tools.getNumValue(theme.typeScale.heading6),
                }}
                placeholder="Причина возврата"
              />
            </ReasonAndNoteContainer>
          )}
        </GoodReturnContainer>
      )}
    </Container>
  )
}

export default OrderDetailsWareCard

const Container = styled.View<{ selected: boolean }>`
  margin-bottom: 8px;
  padding: 10px 25px;
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.ui.orange[100] : theme.colors.system.white};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`

const LeftCol = styled.View`
  flex: 1;
`

const RightCol = styled.View`
  margin-left: 10px;
  flex-shrink: 0;
`

const GoodReturnContainer = styled.View`
  margin: 15px -15px 0;
`

const CounterContainer = styled.View`
  margin: 0 15px;
  flex-direction: row;
  justify-content: space-between;
`

const CheckboxContainer = styled.View`
  margin-left: 10px;
  padding-top: 10px;
`

const ReasonAndNoteContainer = styled.View`
  margin-top: 20px;
`
