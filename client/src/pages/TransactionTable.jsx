import { Table, Col, Button } from "react-bootstrap";
import {
  useGetTransactionsQuery,
  useDeleteTransactionMutation,
} from "../services/transaction";
import { YearPicker, MonthPicker } from "react-date-dropdown";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

const Transaction = () => {
  const navigate = useNavigate();
  const current = new Date();
  const [selectedMonth, setSelectedMonth] = useState(current.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(current.getFullYear());
  const {
    data: transactions,
    isLoading,
    isFetching,
    refetch,
  } = useGetTransactionsQuery(`?year=${selectedYear}&month=${selectedMonth}`);

  const [
    dispatcherDelete,
    { isLoading: isLoadingDelete, isFetching: isFetchingDelete },
  ] = useDeleteTransactionMutation();

  useEffect(() => {
    refetch();
  }, [selectedYear, selectedMonth, refetch]);

  if (isLoading || isFetching || isLoadingDelete || isFetchingDelete)
    return <Loading />;

  return (
    <Col>
      <div style={{ marginTop: 20, marginLeft: 20 }}>
        Filter by :
        <YearPicker
          placeholder="Select Year"
          selectClass="me-2 ms-2"
          selectedYear={selectedYear}
          onYearChange={(y) => {
            setSelectedYear(y);
          }}
        />
        <MonthPicker
          placeholder="Select Month"
          selectedMonth={selectedMonth}
          onMonthChange={(m) => {
            setSelectedMonth(m);
          }}
        />
      </div>
      <Table striped bordered hover size="sm" responsive style={{ margin: 20 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Amount</th>
            <th>Customer Name</th>
            <th>Status</th>
            <th>Transaction Date</th>
            <th>Created By</th>
            <th>Created On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.data?.map((transaction) => (
            <tr key={transaction?.id}>
              <td>{transaction?.id}</td>
              <td>{transaction?.productID}</td>
              <td>{transaction?.productName}</td>
              <td>{transaction?.amount}</td>
              <td>{transaction?.customerName}</td>
              <td>{transaction?.Status?.name}</td>
              <td>{transaction?.transactionDate}</td>
              <td>{transaction?.createBy}</td>
              <td>{transaction?.createOn}</td>
              <td>
                <div className="d-flex  justify-content-center">
                  <Button
                    onClick={() => {
                      navigate(`/transactions/update/${transaction?.id}`);
                    }}
                    size="sm"
                    variant="outline-warning"
                    className="me-1"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={async () => {
                      await dispatcherDelete(transaction?.id);
                      refetch();
                    }}
                    size="sm"
                    variant="outline-danger"
                    className="ms-1"
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Col>
  );
};

export default Transaction;
