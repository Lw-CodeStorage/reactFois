
import { createMuiTheme } from '@material-ui/core/styles';
import { dark } from '@material-ui/core/styles/createPalette';

const theme = createMuiTheme({
    outline: 'none',
    //textDecoration: 'none',
    palette: {
        //type:'dark',
        primary: {
            main: '#009688',
            light: '#52c7b8',
            dark: '#00675b',
            contrastText: '#fafafa'
        },
        secondary: {
            main: '#4db6ac',
            light: '#82e9de',
            dark: '#00867d',
            contrastText: '#ffffff'
        },
        error: {
            main: '#f50057',
        },
        cardBackground: {
            main: '#ffffff',
        },
        bodyBackground: {
            main: '#f5f5f5',
        },

        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
    typography: {
        fontFamily: `Noto Sans TC, sans- serif !important`
    },
    overrides: {
        MuiTypography: {

            h5: {
                color: '#000000'
            },
            subtitle1: {
                color: '#5f6368'
            }
        }
    }

});
export default theme;