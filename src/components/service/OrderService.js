
const orderapiurl = process.env.REACT_APP_ORDERAPI_ORDER_URL;

const createOrder = (payload) => {
  console.log("in OrderService: createOrder");
  console.log("payload", payload);
  return fetch( orderapiurl, {
      method: "POST",
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(payload),
  }).then((res) => {
    return res.json();
  });
};

const fetchAllOrders = () => {
  return fetch( orderapiurl, {
    method: "get",
    mode: "cors",
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
}).then((res) => {
  console.log(res);
  return res.json();
}).catch((err) => {
  console.log(err);
});
}

const OrderService = {
  createOrder: createOrder,
  fetchAllOrders: fetchAllOrders,
};

export default OrderService;
