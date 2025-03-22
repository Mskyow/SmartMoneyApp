// import {
//     CssBaseline,
//     ThemeProvider as MuiThemeProvider,
//     createTheme,
// } from "@mui/material";
// import React from "react";

// const appTheme = createTheme({
//     palette: {
//         primary: {
//             main: "#9900f2",
//         },
//         secondary: {
//             main: "#ffffff",
//         },
//         background: {
//             default: "#6e6e6e",
//             paper: "#6e6e6e",
//         },
//         text: {
//             primary: "#ffffff",
//             secondary: "#bcbcbc",
//             disabled: "#989898cf",
//         },
//         divider: "#ffffff",
//         action: {
//             active: "#cbcbcbb2",
//             hover: "#f5f5f5",
//         },
//     },
//     typography: {
//         fontFamily: "'jsMath-cmr10-cmr10', Helvetica",
//         h1: {
//             fontSize: "58px",
//             fontWeight: 400,
//             letterSpacing: 0,
//         },
//         h2: {
//             fontSize: "58px",
//             fontWeight: 400,
//             letterSpacing: 0,
//         },
//         subtitle1: {
//             fontSize: "24px",
//             fontWeight: 400,
//             letterSpacing: 0,
//             color: "#bcbcbc",
//         },
//         body1: {
//             fontSize: "20px",
//             fontWeight: 400,
//             letterSpacing: 0,
//             fontFamily: "'Lao_Muang_Khong-Regular', Helvetica",
//         },
//         button: {
//             textTransform: "none",
//             fontSize: "20px",
//             fontWeight: 400,
//             letterSpacing: 0,
//             fontFamily: "'Lao_Muang_Khong-Regular', Helvetica",
//         },
//     },
//     components: {
//         MuiButton: {
//             styleOverrides: {
//                 root: {
//                     textTransform: "none",
//                     borderRadius: "8px",
//                 },
//             },
//         },
//         MuiTextField: {
//             styleOverrides: {
//                 root: {
//                     "& .MuiOutlinedInput-root": {
//                         borderRadius: "12px",
//                     },
//                 },
//             },
//         },
//         MuiCheckbox: {
//             styleOverrides: {
//                 root: {
//                     color: "#cbcbcbb2",
//                     backgroundColor: "#2a282a",
//                     borderRadius: "8px",
//                     "&.Mui-checked": {
//                         color: "#cbcbcbb2",
//                     },
//                 },
//             },
//         },
//         MuiDivider: {
//             styleOverrides: {
//                 root: {
//                     borderColor: "white",
//                 },
//             },
//         },
//         MuiLink: {
//             styleOverrides: {
//                 root: {
//                     color: "white",
//                 },
//             },
//         },
//     },
// });

// export const ThemeProvider = ({ children }) => {
//     return (
//         <MuiThemeProvider theme={appTheme}>
//             <CssBaseline />
//             {children}
//         </MuiThemeProvider>
//     );
// };
