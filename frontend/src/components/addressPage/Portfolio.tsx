import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Pagination, Typography, Box, Button } from "@mui/material"
import React, { useState } from "react"
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {PortfolioChart} from "./PortfolioCharts/TokenDiagram";

 const Porfolio = ()=>{
      const [page, setPage] = useState(1);
        const [activeBtn, setActiveBtn] = useState("Tokens");
      const rowsPerPage = 10;

    const { balance, tokenList } = useSelector(
            (state:RootState) => state.addresPage
          );
return (
            <>
              {/* Круговая диаграмма с тенью */}
              <Box sx={{
                mb: 4,
                p: 3,
                borderRadius: '14px',
                border: '1px solid rgba(142, 142, 142, 0.2)',
                boxShadow: '0 8px 32px rgba(95, 15, 255, 0.1)'
              }}>
                <PortfolioChart tokens={tokenList.tokens} othersThreshold={1} />
              </Box>
          
              {/* Переключатель Tokens/NFTs */}
              <Box sx={{
                display: 'flex',
                gap: 2,
                mb: 3,
                p: 1,
                background: 'rgba(57, 6, 84, 0.3)',
                borderRadius: '12px',
                border: '1px solid rgba(91, 14, 240, 0.2)'
              }}>
                <Button
                  onClick={() => setActiveBtn("Tokens")}
                  sx={{
                    flex: 1,
                    py: 1.5,
                    borderRadius: '10px',
                    background: activeBtn === "Tokens"
                      ? 'linear-gradient(90deg, rgba(91, 14, 240, 0.5) 0%, rgba(57, 6, 84, 0.3) 100%)'
                      : 'transparent',
                    color: "#fff",
                    fontWeight: 'bold',
                    letterSpacing: '0.5px',
                    '&:hover': {
                      background: 'rgba(91, 14, 240, 0.25)'
                    }
                  }}>
                  Tokens
                </Button>
                <Button 
                  onClick={() => setActiveBtn("NFTs")}
                  sx={{
                    flex: 1,
                    py: 1.5,
                    borderRadius: '10px',
                    background: activeBtn === "NFTs"
                      ? 'linear-gradient(90deg, rgba(91, 14, 240, 0.5) 0%, rgba(57, 6, 84, 0.3) 100%)'
                      : 'transparent',
                    color: "#fff",
                    fontWeight: 'bold',
                    letterSpacing: '0.5px',
                    '&:hover': {
                      background: 'rgba(91, 14, 240, 0.25)'
                    }
                  }}>
                  NFTs
                </Button>
              </Box>
          
              {/* Заголовок с неоновым эффектом */}
              <Typography variant="subtitle1" sx={{
                color: 'rgba(175, 175, 175, 0.8)',
                mb: 3,
                px: 1,
                fontSize: '0.9rem',
                textShadow: '0 0 8px rgba(95, 15, 255, 0.3)',
                '&::before': {
                  content: '""',
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  background: '#5F0FFF',
                  borderRadius: '50%',
                  mr: 1,
                  boxShadow: '0 0 8px #5F0FFF'
                }
              }}>
                {`Total ${tokenList.total} token account(s)`}
              </Typography>
          
              {/* Таблица с неоновыми акцентами */}
              <TableContainer component={Paper} sx={{ 
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(10px)',
                color: "#fff",
                borderRadius: "14px",
                border: "1px solid rgba(91, 14, 240, 0.3)", 
                boxShadow: '0 4px 20px rgba(95, 15, 255, 0.1)',
                '& .MuiTableCell-root': {
                  borderColor: 'rgba(142, 142, 142, 0.2)'
                }
              }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{
                      background: 'linear-gradient(90deg, rgba(91, 14, 240, 0.1) 0%, rgba(57, 6, 84, 0.05) 100%)'
                    }}>
                      <TableCell sx={{ color: "#fff", fontWeight: 700, textAlign: "center", letterSpacing: '0.5px' }}>Image</TableCell>
                      <TableCell sx={{ color: "#fff", fontWeight: 700 }}>Symbol</TableCell>
                      <TableCell sx={{ color: "#fff", fontWeight: 700 }}>Amount</TableCell>              
                      <TableCell sx={{ color: "#fff", fontWeight: 700 }}>Price</TableCell>
                      <TableCell sx={{ color: "#fff", fontWeight: 700 }}>Value</TableCell>
                      <TableCell sx={{ color: "#fff", fontWeight: 700 }}>Percentage</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[...tokenList.tokens]
                      .sort((a, b) => {
                        if (a.percentage !== null && b.percentage !== null) return b.percentage - a.percentage;
                        if (a.percentage !== null) return -1;
                        if (b.percentage !== null) return 1;
                        return 0;
                      })
                      .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                      .map((row: ITokens) => (
                        <TableRow 
                          key={row.symbol} 
                          sx={{ 
                            cursor: "pointer",
                            '&:hover': {
                              background: 'rgba(91, 14, 240, 0.05)'
                            }
                          }}
                        >
                          <TableCell sx={{
                            minWidth: 40,
                            height: 40,
                            borderRadius: "10px",
                            background: row.image 
                              ? `url(${row.image}) center/contain no-repeat`
                              : 'linear-gradient(135deg, rgba(91, 14, 240, 0.2) 0%, rgba(57, 6, 84, 0.1) 100%)',
                          }}/>
                          <TableCell sx={{ color: "#fff", fontWeight: 500 }}>{row.symbol}</TableCell>
                          <TableCell sx={{ color: "#fff" }}>{row.balance == null ? '-' : row.balance.toLocaleString()}</TableCell>                        
                          <TableCell sx={{ color: "#fff" }}>{row.pricePerToken == null ? '-' : `$${row.pricePerToken.toFixed(7)}`}</TableCell>
                          <TableCell sx={{ 
                            color: row.totalValue ? "#fff" : "rgba(255,255,255,0.5)",
                            fontWeight: row.totalValue ? 600 : 400
                          }}>
                            {row.totalValue == null ? '-' : `$${row.totalValue.toFixed(3)}`}
                          </TableCell>
                          <TableCell sx={{ 
                            color: row.percentage ? "#fff" : "rgba(255,255,255,0.5)",
                            fontWeight: row.percentage ? 600 : 400
                          }}>
                            {row.percentage == null ? '-' : `${row.percentage.toFixed(2)}%`}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
          
              {/* Пагинация с неоновым эффектом */}
              <Pagination
                count={Math.ceil(tokenList.tokens.length / rowsPerPage)}
                page={page}
                onChange={(e, value) => setPage(value)}
                sx={{ 
                  mt: 4,
                  '& .MuiPaginationItem-root': {
                    color: 'rgba(255,255,255,0.7)',
                    '&.Mui-selected': {
                      background: 'rgba(91, 14, 240, 0.5)',
                      color: '#fff',
                      boxShadow: '0 0 10px rgba(95, 15, 255, 0.5)'
                    },
                    '&:hover': {
                      background: 'rgba(91, 14, 240, 0.2)'
                    }
                  }
                }}
              />
            </>
)
}
 export default Porfolio