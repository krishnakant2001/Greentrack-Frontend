"use client";
import React, { useMemo, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Paper,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { activityCategoryData } from "@/data/activityCategoryData";
import { activitySubCategoryData } from "@/data/activitySubCategoryData";

interface Activity {
  id: string;
  userId: string;
  category: string;
  subType: string;
  quantity: number;
  unit: string;
  co2eEmissions: number;
  emissionFactorRef: string;
  description: string;
  activityDate: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}

interface ActivityHeadCell {
  id: keyof Activity;
  label: string;
  numeric: boolean;
}

type Order = "asc" | "desc";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator<Key extends keyof Activity>(
  order: Order,
  orderBy: Key
): (a: Activity, b: Activity) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const activityHeadCells: readonly ActivityHeadCell[] = [
  { id: "activityDate", label: "Date", numeric: false },
  { id: "category", label: "Category", numeric: false },
  { id: "subType", label: "Sub-Type", numeric: false },
  { id: "quantity", label: "Quantity", numeric: true },
  { id: "co2eEmissions", label: "CO₂e Emissions", numeric: true },
  { id: "location", label: "Location", numeric: false },
];

interface EnhancedTableHeadProps {
  order: Order | null;
  orderBy: keyof Activity | null;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Activity) => void;
}

const EnhancedTableHead = (props: EnhancedTableHeadProps) => {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property: keyof Activity) => (event: React.MouseEvent<HTMLButtonElement>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {activityHeadCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            sortDirection={
              orderBy === headCell.id ? order ?? undefined : undefined
            }
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order || "asc" : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface ActivitiesTableProps {
  activities: Activity[];
}

const ActivitiesTable = ({ activities }: ActivitiesTableProps) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [orderBy, setOrderBy] = useState<keyof Activity | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const getCategoryName = (code: string) => {
    const category = activityCategoryData.find((c) => c.code === code);
    return category ? category.name : code;
  };

  const getSubCategoryName = (code: string) => {
    const subCategory = activitySubCategoryData.find((sc) => sc.code === code);
    return subCategory ? subCategory.name : code;
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Activity) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Sorting & pagination
  const visibleRows = useMemo(() => {
    let sorted = [...activities];
    if (order && orderBy) {
      sorted = sorted.sort(getComparator(order, orderBy));
    }
    return sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [activities, order, orderBy, page, rowsPerPage]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{
              minWidth: 750,
              "& td": { fontSize: "15px" }, // all body cells
              "& th": { fontSize: "16px", fontWeight: 600 }, // all header cells
            }}
            size="medium"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row) => (
                <TableRow key={row.id} hover onClick={(e) => console.log(e)}>
                  <TableCell>
                    {new Date(row.activityDate).toLocaleDateString("en-GB")}
                  </TableCell>
                  <TableCell>{getCategoryName(row.category)}</TableCell>
                  <TableCell>{getSubCategoryName(row.subType)}</TableCell>
                  <TableCell align="right">{`${row.quantity} ${row.unit}`}</TableCell>
                  <TableCell align="right">{`${row.co2eEmissions} kg CO₂e`}</TableCell>
                  <TableCell>{row.location || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={activities.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default ActivitiesTable;
