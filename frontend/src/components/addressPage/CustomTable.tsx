import React, { useEffect, useState } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Box } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { instance } from "../../utils/axios_instance";
import { useLocation } from "react-router-dom";
import { green } from "@mui/material/colors";



const mockChartData = [
  { time: "10:00", price: 240 },
  { time: "11:00", price: 242 },
  { time: "12:00", price: 238 },
  { time: "13:00", price: 245 },
];
interface ItxType{
    tokenName: string,
    formattedDate: string,
    amountTransferred: number,
    transactionType: string
}


const CustomTable = () => {
  const [activeTab, setActiveTab] = useState("transactions");
  const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(1);
  const [data,setData] = useState([])
  const location = useLocation();
  const { account_name, account_address, account_image } :IAddressData = location.state || {};
  const rowsPerPage = 5;

  useEffect(() => {
    if (!account_address) return; 
    const fetchData = async () => { 
      try {
        const token = localStorage.getItem("token");
        const responseTx = await instance.post("/block-chain/get-transactions",{account_address},
          {headers: { Authorization: `Bearer ${token}` },}); 
        setData(responseTx.data); 
      } catch (err) {
      } finally {
      }
    }; 
   
    fetchData();
  }, []); 

  const handleClick = (row: any) => {
    setSelectedRow(row);
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
      </Box>

      {activeTab === "transactions" ? (
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
                  <TableCell style={{ color: "#fff",fontWeight:'bold'}}>Token</TableCell>
                  <TableCell style={{ color: "#fff",fontWeight:'bold'  }}>Value</TableCell>
                  <TableCell style={{ color: "#fff",fontWeight:'bold'  }}>Date</TableCell>
                  <TableCell style={{ color: "#fff",fontWeight:'bold'  }}>Operation Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((row:ItxType, index) => (
                  <TableRow key={index} onClick={() => handleClick(row)} style={{ cursor: "pointer" }}>
                    <TableCell style={{ color:  "#fff"}}>{row.tokenName}</TableCell>
                    <TableCell style={{ color: row.amountTransferred > 0 ?  'rgb(11, 139, 33)' : 'red' }}>{
                    row.amountTransferred>0? "+" + row.amountTransferred.toFixed(7) : row.amountTransferred.toFixed(7)
                   }</TableCell>
                    <TableCell style={{ color: "#fff" }}>{row.formattedDate}</TableCell>
                    <TableCell style={{ color: "#fff" }}>{row.transactionType}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={Math.ceil(data.length / rowsPerPage)}
            page={page}
            onChange={(e, value) => setPage(value)}
            style={{ marginTop: 20, display: "flex", justifyContent: "center" , backgroundColor:"rgba(255, 255, 255, 0.35)", color:"white !important"}}
          />
        </>
      ) : (
        <Box>Аналитика (пока пусто)</Box>
      )}

      {selectedRow && (
        <Box style={{ marginTop: 20 }}>
          <h3>График стоимости {selectedRow}</h3> {/* Используем конкретное свойство */}
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip wrapperStyle={{ color: "#000" }} />
              <Line type="monotone" dataKey="price" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Box>
  );
};

export default CustomTable;
