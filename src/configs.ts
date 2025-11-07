import React from 'react'
import { CurrencyScreen, Home } from './screens'

type ScreenPage = {
  component: React.FC;
  name: string;
  styles: object;
}

interface IScreens {
  home: string;
  currencies: string;
}

interface IScreenPages {
  pages: ScreenPage[]
}

export const screens: IScreens = {
  home: 'Home',
  currencies: 'Currencies'
}

export const SCREEN_PAGES: IScreenPages = {
  pages: [
    {
      component: Home,
      name: screens.home,
      styles: {
        headerStyle: {
          backgroundColor: '#0052FF', 
        },
        headerTitleStyle: {
          color: '#FFFFFF',
        },
        headerTintColor: '#FFFFFF',
        title: screens.home,
      }
    },
    {
      component: CurrencyScreen,
      name: screens.currencies,
      styles: {
        headerStyle: {
          backgroundColor: '#0052FF', 
        },
        headerTitleStyle: {
          color: '#FFFFFF',
        },
        headerTintColor: '#FFFFFF',
        title: screens.currencies,
      }
    }
  ]
}
