import { Container, Table } from "react-bootstrap";
import { useGetTransactionsSummariesQuery } from "../services/transaction";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Dashboard = () => {
  const {
    data: transactions,
    isError,
    error,
    isLoading,
  } = useGetTransactionsSummariesQuery();

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.error?.message)
    }
  }, [isError, error])

  if (isLoading) return <Loading />;

  return (
    <Container fluid>
      <Table striped bordered hover responsive style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Year</th>
            <th>Month</th>
            <th>Total Transaction</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.data?.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction?.year}</td>
              <td>{transaction?.month}</td>
              <td>{transaction?.count}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Dashboard;
