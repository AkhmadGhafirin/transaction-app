import { Button, Col, Form, Row, Container } from "react-bootstrap";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useGetTransactionByIdQuery,
} from "../services/transaction";
import { toast } from "react-toastify";

const TransactionForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id, "transsmkam");
  const [validated, setValidated] = useState(false);
  const [
    dispatcherCreate,
    { isLoading: isLoadingCreate, isFetching: isFetchingCreate },
  ] = useCreateTransactionMutation();
  const [
    dispatcherUpdate,
    { isLoading: isLoadingUpdate, isFetching: isFetchingUpdate },
  ] = useUpdateTransactionMutation();
  const [form, setForm] = useState({
    productID: "",
    productName: "",
    amount: "",
    customerName: "",
    status: "",
    transactionDate: "",
    createBy: "",
  });

  const {
    data: transaction,
    isLoading,
    isFetching,
  } = useGetTransactionByIdQuery(id);

  useEffect(() => {
    if (transaction) {
      console.log(transaction, "transaction effect");
      const date = new Date(transaction?.data?.transactionDate);
      const month =
        date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
      const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
      const formatTransactionDate = `${date.getFullYear()}-${month}-${day}`;
      console.log(formatTransactionDate, "<<<format");
      setForm({
        ...transaction?.data,
        transactionDate: formatTransactionDate,
      });
    }
  }, [transaction]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const checkValidate = () => {
    const {
      productID,
      productName,
      amount,
      customerName,
      status,
      transactionDate,
      createBy,
    } = form;

    return (
      productID !== undefined &&
      productID !== "" &&
      productName !== undefined &&
      productName !== "" &&
      amount !== undefined &&
      amount !== "" &&
      customerName !== undefined &&
      customerName !== "" &&
      status !== undefined &&
      status !== "" &&
      transactionDate !== undefined &&
      transactionDate !== "" &&
      createBy !== undefined &&
      createBy !== ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);
    // if (checkValidate()) {
    try {
      if (id) {
        const payload = {
          ...form,
          id: id
        }
        await dispatcherUpdate(payload);
        toast.success("Successfully update transaction");
      } else {
        await dispatcherCreate(form);
        toast.success("Successfully create new transaction");
      }
      navigate("/transactions");
    } catch (err) {
      toast.error(err);
    }
    // }
  };

  if (
    isLoading ||
    isFetching ||
    isLoadingCreate ||
    isFetchingCreate ||
    isLoadingUpdate ||
    isFetchingUpdate
  )
    return <Loading />;

  return (
    <>
      <Container className="py-3">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <h2 className="text-center">
            {id ? "Edit Transaction" : "Create Transaction"}
          </h2>
          <Form.Group className="mb-3">
            <Form.Label>Product ID</Form.Label>
            <Form.Control
              name="productID"
              autoComplete="off"
              value={form?.productID}
              onChange={handleOnChange}
              type="number"
              required
              placeholder="Enter Product ID"
            />
            <Form.Control.Feedback type="invalid">
              Product ID is required
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              name="productName"
              autoComplete="off"
              value={form?.productName}
              onChange={handleOnChange}
              type="text"
              required
              placeholder="Enter Product Name"
            />
            <Form.Control.Feedback type="invalid">
              Product Name is required
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              placeholder="Enter Amount"
              name="amount"
              value={form?.amount}
              required
              type="number"
              autoComplete="off"
              onChange={handleOnChange}
            />
            <Form.Control.Feedback type="invalid">
              Amount is required
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control
              placeholder="Enter Customer Name"
              name="customerName"
              value={form?.customerName}
              required
              type="text"
              autoComplete="off"
              onChange={handleOnChange}
            />
            <Form.Control.Feedback type="invalid">
              Customer Name is required
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Create By</Form.Label>
            <Form.Control
              placeholder="Enter Create By"
              name="createBy"
              value={form?.createBy}
              required
              type="text"
              autoComplete="off"
              onChange={handleOnChange}
            />
            <Form.Control.Feedback type="invalid">
              Create By is required
            </Form.Control.Feedback>
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={form?.status}
                required
                onChange={handleOnChange}
              >
                <option value="0" selected>
                  SUCCESS
                </option>
                <option value="1">FAILED</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Status is required
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} className="mb-3">
              <Form.Label>Transaction Date</Form.Label>
              <Form.Control
                placeholder="Enter Transaction Date"
                name="transactionDate"
                value={form?.transactionDate}
                required
                type="date"
                autoComplete="off"
                onChange={handleOnChange}
              />
              <Form.Control.Feedback type="invalid">
                Transaction Date is required
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <div className="d-flex justify-content-center my-5">
            <Button style={{ width: "250px" }} variant="dark" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default TransactionForm;
