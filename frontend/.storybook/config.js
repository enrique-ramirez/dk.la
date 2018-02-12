/* eslint global-require: 0 */
import { addDecorator, configure } from '@storybook/react'
import { setDefaults } from '@storybook/addon-info'
import { setIntlConfig, withIntl } from 'storybook-addon-intl'

import { addLocaleData } from 'react-intl'
import enLocaleData from 'react-intl/locale-data/en'
import esLocaleData from 'react-intl/locale-data/es'

import { translationMessages } from '../src/i18n'

addLocaleData(enLocaleData)
addLocaleData(esLocaleData)

const getMessages = locale => translationMessages[locale]

setIntlConfig({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  getMessages,
})

setDefaults({
  header: true,
  inline: false,
})

addDecorator(withIntl)

configure(() => require('./stories'), module)
