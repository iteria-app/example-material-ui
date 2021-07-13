import React, { useState, useContext } from "react";
import { IntlProvider } from "react-intl";
import sk from '../compiled-lang/sk.json';
import en from '../compiled-lang/en.json';

const languageMessageData = [
  {
    "locale": "en",
    "messages": en
  },
  {
    "locale": "sk",
    "messages": sk
  }
]

const loadLocaleData = (locale) => {
  const messageBySelectLocale = languageMessageData.filter((key) => key.locale === locale)
  if (messageBySelectLocale?.length > 0) {
    return messageBySelectLocale[0]?.messages
  }
  return languageMessageData[0]?.messages ?? en
};

const localeNavigator = navigator?.language?.slice(0, 2) ?? languageMessageData[0]?.locale ?? 'en'

const localeFromNavigator = () => {
  const localeByLocaleNavigator = languageMessageData.filter((locale) => locale.locale === localeNavigator)
  if (localeByLocaleNavigator?.length > 0) {
    return localeByLocaleNavigator[0]?.locale
  }
  return languageMessageData[0]?.locale ?? 'en'
}

const localeKeys = languageMessageData.map((key) => key.locale)

const LocaleContext = React.createContext({
  locale: localeFromNavigator(),
  localeKeys:  localeKeys,
  switchToLocale: (locale) => {},
})
LocaleContext.displayName = 'LocaleContext'

const IntlProviderWrapper = (props) => {

  const switchToLocale = (locale) => {
    setLanguageData({ ...languageData, locale: locale, messages: loadLocaleData(locale) })
  }

  interface LanguageData {
    locale: string,
    messages,
    localeKeys: string[],
    switchToLocale,
  }

  const [languageData, setLanguageData] = useState<LanguageData>({
    locale: localeFromNavigator(),
    messages: loadLocaleData(localeNavigator),
    localeKeys: localeKeys,
    switchToLocale: switchToLocale
  });

  const { children } = props
  return (
    <LocaleContext.Provider value={languageData}>
      <IntlProvider
        locale={languageData.locale}
        messages={languageData.messages}
      >
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  )
}

const useIntlContext = () => useContext(LocaleContext)

export { IntlProviderWrapper as IntlProvider, useIntlContext }
