import { useState, useCallback, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { _users } from '../../_mock';
import { DashboardContent } from '../../layouts/dashboard';

import { Iconify } from '../../components/iconify';
import { Scrollbar } from '../../components/scrollbar';

import { TableNoData } from '../table-no-data';
import { UserTableRow } from '../user-table-row';
import { UserTableHead } from '../user-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { UserTableToolbar } from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

import type { UserProps } from '../user-table-row';
import { AdminApi } from '@api/admin/admin';

// ----------------------------------------------------------------------

export function ProductsView() {
  const table = useTable();

  const [filterName, setFilterName] = useState('');
  const [isReloadData, setIsReloadData] = useState<boolean>(false);
  const [users, setUsers] = useState<
    {
      id: string;
      title: string;
      sub_title: string;
      description: string;
      quantity_sold: number;
      image: string;
      minPrice: string;
      maxPrice: string;
      deleted: boolean;
      user: {
        id: string;
        email: string;
        username: string;
      };
    }[]
  >([]);

  const fetchApi = async (): Promise<void> => {
    try {
      const userData = await AdminApi.getListProduct({});
      setUsers(userData.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [isReloadData]);

  // fetchApi();

  const dataFiltered: UserProps[] = applyFilter({
    inputData: users,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Products
        </Typography>
      </Box>

      <Card>
        <UserTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
        />

        <TableContainer sx={{ overflow: 'unset' }}>
          <Table sx={{ minWidth: 800 }}>
            <UserTableHead
              order={table.order}
              orderBy={table.orderBy}
              rowCount={users.length}
              onSort={table.onSort}
              headLabel={[
                { id: 'title', label: 'Tên sàn phẩm' },
                { id: 'quantity', label: 'Đã bán' },
                { id: 'email', label: 'Email Người bán' },
                { id: 'price', label: 'Giá bán' },
                { id: 'deleted', label: 'Trạng thái' },
                { id: '' },
              ]}
            />
            <TableBody>
              {dataFiltered
                .slice(table.page * table.rowsPerPage, table.page * table.rowsPerPage + table.rowsPerPage)
                .map((row) => (
                  <UserTableRow key={row.id} row={row} isReloadData={isReloadData} onAction={setIsReloadData} />
                ))}

              <TableEmptyRows height={68} emptyRows={emptyRows(table.page, table.rowsPerPage, _users.length)} />

              {notFound && <TableNoData searchQuery={filterName} />}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          page={table.page}
          count={users.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy],
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected],
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage],
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}

// user-view
