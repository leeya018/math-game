import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import * as UTIL from "@/util";
import TextArea from "./Textarea";

// function createData(key, date, amount, percent, habitBlocker, habitImplementationStrategy, dailyLesson) {
//   return { key, date, amount, percent, habitBlocker, habitImplementationStrategy, dailyLesson };
// }
export default function BasicTable({ items, totalAmount, updateTodaysHabit }) {
  const createData = (data) => {
    const {
      date,
      amount,
      habitBlocker,
      habitImplementationStrategy,
      dailyLesson,
    } = data;
    return {
      date: date,
      amount,
      percent: ((amount / totalAmount) * 100).toFixed(0),
      habitBlocker,
      habitImplementationStrategy,
      dailyLesson,
    };
  };
  console.log({ items });
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ fontWeight: "bold" }}>
            <TableCell sx={{ fontWeight: "bold" }}>key</TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="left">
              {" "}
              date
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="left">
              amount
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="left">
              completed&nbsp;(%)
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="left">
              Habit Blockers
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="left">
              Implementation Strategy
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="left">
              Daily Lesson
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items
            .map((data) => createData(data))
            .map((row, key) => (
              <TableRow
                key={key}
                sx={{
                  "td, th": {
                    border: "1px solid",
                    backgroundColor: row.percent >= 100 && "#40cea8",
                  },
                }}
              >
                <TableCell align="left" sx={{ minWidth: "10rem" }}>
                  {key + 1}
                </TableCell>
                <TableCell align="left" sx={{ minWidth: "10rem" }}>
                  {UTIL.getDateStrIsrael(row.date)}
                </TableCell>
                <TableCell align="left" sx={{ minWidth: "10rem" }}>
                  {row.amount}
                </TableCell>
                <TableCell align="left" sx={{ minWidth: "10rem" }}>
                  {row.percent}
                </TableCell>

                <TableCell align="left" sx={{ minWidth: "10rem" }}>
                  <TableSection
                    date={row.date}
                    width={{ maxWidth: "15rem" }}
                    name={"habitBlocker"}
                    value={row.habitBlocker}
                    onChange={(e) => {
                      updateTodaysHabit(e.target, key);
                    }}
                  />
                </TableCell>
                <TableCell align="left" sx={{ minWidth: "10rem" }}>
                  <TableSection
                    width={{ maxWidth: "15rem" }}
                    date={row.date}
                    name={"habitImplementationStrategy"}
                    value={row.habitImplementationStrategy}
                    onChange={(e) => {
                      updateTodaysHabit(e.target, key);
                    }}
                  />
                </TableCell>
                <TableCell align="left" sx={{ minWidth: "10rem" }}>
                  <TableSection
                    width={{ maxWidth: "15rem" }}
                    date={row.date}
                    name={"dailyLesson"}
                    value={row.dailyLesson}
                    onChange={(e) => {
                      updateTodaysHabit(e.target, key);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function TableSection({ width = {}, date, name, value, onChange }) {
  // console.log(width);
  return (
    <div>
      {UTIL.datesAreEquals(date, new Date()) ? (
        <TextArea name={name} value={value} onChange={onChange} />
      ) : (
        <div style={width}>{value}</div>
      )}
    </div>
  );
}
