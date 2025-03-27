import React, { useEffect, useState } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Box } from "@mui/material";
import { instance, instanceJWT } from "../../utils/axios_instance";
import { useLocation } from "react-router-dom";
import { green } from "@mui/material/colors";
import TokenSelector from "./tokenSelector";
import Porfolio from "./Portfolio";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ItxType{
    tokenName: string,
    formattedDate: string,
    amountTransferred: number,
    transactionType: string
    mintAddress : string
}


const CustomTable = () => {
  const [activeTab, setActiveTab] = useState("transactions");
  const [page, setPage] = useState(1);
  const [data,setData] = useState([])
  const [selectedRow, setSelectedRow] = useState<ItxType | null>(null);
  const [priceHistory, setPriceHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { account_name, account_address, account_image } :IAddressData = location.state || {};
  const rowsPerPage = 5;

  useEffect(() => {
    if (!account_address) return; 
    const fetchData = async () => { 
      try {
        const responseTx = await instanceJWT.post("/block-chain/get-transactions",{account_address},); 
        setData(responseTx.data); 
      } catch (err) {
      } finally {
      }
    }; 
   
    fetchData();
  }, []); 


  const fetchPriceHistory = async (tokenAddress: string) => {
    setLoading(true);
    try {
      const now = Math.floor(Date.now() / 1000);
      const oneMonthAgo = now - (30 * 24 * 60 * 60); // 30 дней назад
      
      const response = await fetch(
        `https://public-api.birdeye.so/defi/history_price?address=${tokenAddress}&address_type=token&type=1D&time_from=${oneMonthAgo}&time_to=${now}`,
        {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'x-chain': 'solana',
            'X-API-KEY': '928a3250d5224d58a7dabf1301d2513f' // Замените на ваш ключ
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.data && result.data.items) {
        const formattedData = result.data.items.map((item: any) => ({
          time: new Date(item.unixTime * 1000).toLocaleDateString(),
          price: item.value
        }));
        
        setPriceHistory(formattedData);
      }
    } catch (error) {
      console.error('Error fetching price history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (row: ItxType) => {
    setSelectedRow(row);
    fetchPriceHistory(row.mintAddress);
  };
   
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#fff'
        }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `$${context.parsed.y.toFixed(6)}`;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#fff'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      y: {
        ticks: {
          color: '#fff',
          callback: (value: any) => `$${value}`
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  const chartData = {
    labels: priceHistory.map(item => item.time),
    datasets: [
      {
        label: 'Price (USD)',
        data: priceHistory.map(item => item.price),
        borderColor: 'rgb(91, 14, 240)',
        backgroundColor: 'rgba(91, 14, 240, 0.5)',
        tension: 0.1,
        pointRadius: 2,
        pointBackgroundColor: 'rgb(91, 14, 240)'
      }
    ]
  };

  return (
    <Box style={{ 
        padding: 10,
        background: "#000",
        color: "#fff",
        width : "100%"
          }}>
      <Box style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <Button
          onClick={() => setActiveTab("transactions")}
          style={{
            borderRadius: "10px",
            background: activeTab === "transactions"
              ? "linear-gradient(90deg, rgba(57, 6, 84, 0.52) 0%, rgba(91, 14, 240, 0.09) 100%)"
              : "linear-gradient(90deg, #5F0FFF 0%, #360548 100%)",
            color: "#fff",
          }}
        >
          Transactions
        </Button>
        <Button
          onClick={() => setActiveTab("analytics")}
          style={{
            borderRadius: "10px",
            background: activeTab === "analytics"
              ? "linear-gradient(90deg, rgba(57, 6, 84, 0.52) 0%, rgba(91, 14, 240, 0.09) 100%)"
              : "linear-gradient(90deg, #5F0FFF 0%, #360548 100%)",
            color: "#fff",
          }}
        >
          Analytics
        </Button>
        <Button
          onClick={() => setActiveTab("portfolio")}
          style={{
            borderRadius: "10px",
            background: activeTab === "portfolio"
              ? "linear-gradient(90deg, rgba(57, 6, 84, 0.52) 0%, rgba(91, 14, 240, 0.09) 100%)"
              : "linear-gradient(90deg, #5F0FFF 0%, #360548 100%)",
            color: "#fff",
          }}
        >
          Portfolio
        </Button>
      </Box>

      {
        activeTab === "transactions" ? (
          <>
             <TableContainer component={Paper} sx={{ 
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(10px)',
              color: "#fff",
              borderRadius: "14px",
              border: "1px solid rgba(123, 123, 123, 0.3)", 
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
              <TableCell style={{ color: "#fff", fontWeight: 700 }}>Token</TableCell>
              <TableCell style={{ color: "#fff", fontWeight: 700 }}>Value</TableCell>
              <TableCell style={{ color: "#fff", fontWeight: 700 }}>Date</TableCell>
              <TableCell style={{ color: "#fff", fontWeight: 700 }}>Operation Type</TableCell>
              <TableCell style={{ color: "#fff", fontWeight: 700 }}>Token Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((row: ItxType, index) => (
              <React.Fragment key={index}>
                <TableRow 
                  onClick={() => handleClick(row)} 
                  style={{ cursor: "pointer" }}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(91, 14, 240, 0.1)'
                    }
                  }}
                >
                  <TableCell style={{ color: "#fff", fontWeight: 600 }}>{row.tokenName}</TableCell>
                  <TableCell style={{ fontWeight: 600, color: row.amountTransferred > 0 ? 'rgb(11, 139, 33)' : 'red' }}>
                    {row.amountTransferred > 0 ? "+" + row.amountTransferred.toLocaleString() : row.amountTransferred.toLocaleString()}
                  </TableCell>
                  <TableCell style={{ fontWeight: 600, color: "#fff" }}>{row.formattedDate}</TableCell>
                  <TableCell style={{ fontWeight: 600, color: "#fff" }}>{row.transactionType}</TableCell>
                  <TableCell style={{ fontWeight: 600, color: "#fff" }}>{row.mintAddress}</TableCell>
                </TableRow>
                
                {selectedRow?.mintAddress === row.mintAddress && (
                  <TableRow>
                    <TableCell colSpan={4} style={{ padding: 0 }}>
                      <Box sx={{ 
                        padding: '20px',
                        background: 'rgba(0, 0, 0, 0.5)',
                        borderRadius: '0 0 14px 14px'
                      }}>
                        {loading ? (
                          <Box sx={{ 
                            color: '#fff', 
                            textAlign: 'center',
                            padding: '20px'
                          }}>
                            Loading price history...
                          </Box>
                        ) : priceHistory.length > 0 ? (
                          <>
                            <Box sx={{ 
                              color: '#fff', 
                              marginBottom: '16px',
                              fontSize: '1.1rem',
                              fontWeight: 600
                            }}>
                              {row.tokenName} Price History (Last 30 Days)
                            </Box>
                            <Line 
                              options={chartOptions} 
                              data={chartData} 
                              height={100}
                            />
                          </>
                        ) : (
                          <Box sx={{ 
                            color: '#fff', 
                            textAlign: 'center',
                            padding: '20px'
                          }}>
                            No price data available for this token
                          </Box>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
            </TableContainer>
            <Pagination
              count={Math.ceil(data.length / rowsPerPage)}
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
        ) : activeTab === "analytics" ?(
          <Box>Аналитика (пока пусто)</Box>
        ) : (
          <Porfolio/>
        )
      }

     
    </Box>
  );
};

export default CustomTable;
