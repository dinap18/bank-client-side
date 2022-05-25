import React from 'react'
import { Box, Typography } from '@material-ui/core'

export default function Footer() {
    return(
        <Box mt={3}>
            <Typography variant="body2" color="textSecondary" align="center">
                {'© Dina and Odel '}
                {new Date().getFullYear()}
            </Typography>
        </Box>
    )
}