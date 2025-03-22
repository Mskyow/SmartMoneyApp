import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Pagination } from "@mui/material"
import React, { useState } from "react"
import { useSelector } from "react-redux";
import { RootState } from "../../store";

 const Porfolio = ()=>{
      const [page, setPage] = useState(1);
      const rowsPerPage = 5;

    const { balance, tokenList } = useSelector(
            (state:RootState) => state.addresPage
          );
return (
        <>
            <TableContainer component={Paper} style={{ 
              background: "rgb(0, 0, 0)",
              color: "#fff",
              borderRadius: "10px",
              border: "1px solid rgb(142, 142, 142)", 
              }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{color: "#fff",fontWeight:'bold',textAlign:"center" }}>Image</TableCell>
                    <TableCell style={{ color: "#fff",fontWeight:'bold'}}>Token Name</TableCell>
                    <TableCell style={{ color: "#fff",fontWeight:'bold'  }}>Symbol</TableCell>
                    <TableCell style={{ color: "#fff",fontWeight:'bold'  }}>Token Balance</TableCell>
                    {/* <TableCell style={{ color: "#fff",fontWeight:'bold'  }}>Operation Type</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tokenList.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((row:ITokenListObject) => (
                    <TableRow key={row.symbol} style={{ cursor: "pointer" }}>
                      <TableCell style={{
                        maxWidth: "3vw",
                        maxHeight: "3vh",
                        borderRadius: "10px",
                        background: `url(${row.image}) no-repeat`,
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                        }}/>
                      <TableCell style={{ color:  "#fff"}}>{row.name}</TableCell>
                      <TableCell style={{ color: 'rgb(11, 139, 33)' }}>{
                        row.symbol}</TableCell>
                      <TableCell style={{ color: "#fff" }}>{row.uiAmount}</TableCell>
                      {/* <TableCell style={{ color: "#fff" }}>{row.transactionType}</TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination
              count={Math.ceil(tokenList.length / rowsPerPage)}
              page={page}
              onChange={(e, value) => setPage(value)}
              style={{ marginTop: 20, display: "flex", justifyContent: "center" , backgroundColor:"rgba(255, 255, 255, 0.35)", color:"white !important"}}
            />
        </>
 )}  
 export default Porfolio