import { Table } from "react-bootstrap";
import { useGetTransactionsSummariesQuery } from "../services/transaction";
import Loading from "../components/Loading";

const Dashboard = () => {
  const {
    data: transactions,
    isLoading,
    isFetching,
  } = useGetTransactionsSummariesQuery();
  if (isLoading || isFetching) return <Loading />;
  return (
    <Table striped bordered hover size="sm" responsive style={{ margin: 20 }}>
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
  );
};

export default Dashboard;
