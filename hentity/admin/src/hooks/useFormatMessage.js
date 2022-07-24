import { useIntl } from 'react-intl'

export default function useFormatMessage() {
  const { formatMessage } = useIntl()

  return (defaultMessage, id) => {
    if (id) return formatMessage({ id, defaultMessage })
    return defaultMessage
  }
}
