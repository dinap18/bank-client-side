import rtl                           from 'jss-rtl'
import Main                          from './components/Main'
import React                         from 'react'
import { create }                    from 'jss'
import { StylesProvider, jssPreset } from '@material-ui/core/styles'
import {
  Box,
  CssBaseline,
  ThemeProvider,
} from '@material-ui/core'

const jss = create({ plugins: [...jssPreset().plugins, rtl()] })

export default function App() {

  return (
      <StylesProvider jss={jss}>
        <ThemeProvider>
          <CssBaseline/>
          <Box display='flex' flexDirection='column'     >
            <Main/>
          </Box>
        </ThemeProvider>
      </StylesProvider>

  )
}

