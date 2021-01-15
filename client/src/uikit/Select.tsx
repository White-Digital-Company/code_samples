import React from 'react'
import { useTheme } from 'styled-components/native'
import RNPickerSelect from 'react-native-picker-select'
import ArrowDownIcon from 'assets/icons/arrow_down.svg'

interface SelectProps {
  size?: 'large' | 'medium'
  placeholder?: { label: string; value: string }
  value: string
  options: Array<{ label: string; value: string }>
  onChange: (newValue: string) => void
}

const Select = ({
  size = 'large',
  value,
  placeholder,
  options,
  onChange,
}: SelectProps) => {
  const theme = useTheme()

  return (
    <RNPickerSelect
      placeholder={placeholder || {}}
      value={value}
      onValueChange={onChange}
      Icon={() => <ArrowDownIcon width={15} height={15} />}
      items={options}
      useNativeAndroidPickerStyle={false}
      style={{
        inputIOS: {
          paddingVertical: size === 'large' ? 18 : 10,
          paddingHorizontal: 15,
          paddingRight: 40,
          backgroundColor: theme.colors.system.white,
          fontFamily: theme.primaryFontRegular,
          fontSize:
            size === 'large'
              ? theme.tools.getNumValue(theme.typeScale.heading5)
              : theme.tools.getNumValue(theme.typeScale.heading6),
          color: theme.colors.system.black,
          borderRadius: theme.tools.getNumValue(theme.borderRadius.medium),
        },
        inputAndroid: {
          paddingVertical: size === 'large' ? 18 : 10,
          paddingHorizontal: 15,
          paddingRight: 40,
          backgroundColor: theme.colors.system.white,
          fontFamily: theme.primaryFontRegular,
          fontSize:
            size === 'large'
              ? theme.tools.getNumValue(theme.typeScale.heading5)
              : theme.tools.getNumValue(theme.typeScale.heading6),
          color: theme.colors.system.black,
          borderRadius: theme.tools.getNumValue(theme.borderRadius.medium),
        },
        placeholder: {
          color: theme.colors.system.black,
        },
        iconContainer: {
          right: 20,
          top: size === 'large' ? '38%' : 12,
        },
      }}
    />
  )
}

export default Select
