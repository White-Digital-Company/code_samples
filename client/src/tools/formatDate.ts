import { format, parseISO } from 'date-fns'

type FormatType = '03.04.2020' | 'Tue' | '12:54'

const formatToSchema: Record<FormatType, string> = {
  '03.04.2020': 'dd.LL.uuuu',
  Tue: 'EEE',
  '12:54': 'HH:mm',
}

export default (date: string, formatType: FormatType) =>
  format(parseISO(date), formatToSchema[formatType])
