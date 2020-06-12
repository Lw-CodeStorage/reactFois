
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    outline: 'none',
    palette: {
        //type:'dark',
        primary: {
            main: '#009688',
           
        },
        secondary: {
            main: '#80cbc4',
           
        },
        cardBackground: {
            main: '#ffffff',
        },
        bodyBackground:{
            main: '#f5f5f5',
        },

        contrastThreshold: 3,  
        tonalOffset: 0.2,
        

    },
    
});
export default theme;