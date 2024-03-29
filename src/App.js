import rtl                           from 'jss-rtl'
import Main                          from './components/Main'
import theme                         from './theme'
import React                         from 'react'
import { create }                    from 'jss'
import { StylesProvider, jssPreset } from '@material-ui/core/styles'
import {
    Box,
    CssBaseline,
    ThemeProvider,
} from '@material-ui/core'
import PopUpWindow from "./components/PopUpWindow";

const jss = create({ plugins: [...jssPreset().plugins, rtl()] })

export default function App() {

    return (
        <StylesProvider jss={jss}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Box display='flex' flexDirection='column'     >
                    <PopUpWindow/>
                    <Main/>
                </Box>
            </ThemeProvider>
        </StylesProvider>

    )
}

