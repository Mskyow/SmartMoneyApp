import React, { useState } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Box } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = Array(10).fill({
  token: "Doge",
  value: 240.0,
  date: "16.07.2025",
  operation: "long/short/transfer/stake",
  hash: "0x13fdsadessasdsa1...",
  to: "0xaddress2113dsa1...",
});

const mockChartData = [
  { time: "10:00", price: 240 },
  { time: "11:00", price: 242 },
  { time: "12:00", price: 238 },
  { time: "13:00", price: 245 },
];

const CustomTable = () => {
  const [activeTab, setActiveTab] = useState("transactions");
  const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const handleClick = (row: typeof data[number]) => {
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
                  <TableCell style={{ color: "#fff" }}>Token</TableCell>
                  <TableCell style={{ color: "#fff" }}>Value</TableCell>
                  <TableCell style={{ color: "#fff" }}>Date</TableCell>
                  <TableCell style={{ color: "#fff" }}>Operation Type</TableCell>
                  <TableCell style={{ color: "#fff" }}>Transaction Hash</TableCell>
                  <TableCell style={{ color: "#fff" }}>To</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((row, index) => (
                  <TableRow key={index} onClick={() => handleClick(row)} style={{ cursor: "pointer" }}>
                    <TableCell style={{ color: "#fff" }}>{row.token}</TableCell>
                    <TableCell style={{ color: "#fff" }}>{row.value}</TableCell>
                    <TableCell style={{ color: "#fff" }}>{row.date}</TableCell>
                    <TableCell style={{ color: "#fff" }}>{row.operation}</TableCell>
                    <TableCell style={{ color: "#fff" }}>{row.hash}</TableCell>
                    <TableCell style={{ color: "#fff" }}>{row.to}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={Math.ceil(data.length / rowsPerPage)}
            page={page}
            onChange={(e, value) => setPage(value)}
            style={{ marginTop: 20, display: "flex", justifyContent: "center" }}
          />
        </>
      ) : (
        <Box>Аналитика (пока пусто)</Box>
      )}

      {selectedRow && (
        <Box style={{ marginTop: 20 }}>
          <h3>График стоимости {selectedRow}</h3>
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
