import { styled, Box } from "@mui/material";

export const Line = styled(Box)({
    background: 'linear-gradient(90deg, #FFF 20.6%, rgba(137, 32, 235, 0.66) 40.6%, #272727 90%)',
    height: '1px',  /* Высота линии */
    width: '98%',  /* Ширина на всю доступную ширину */
    marginLeft: '15px'
})