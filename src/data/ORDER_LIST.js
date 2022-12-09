var ORDER_LIST = [ {
    order_id: 123,
    order_date: "2022-03-01",
    order_amount: '45,000.00',
    order_status: "ordered",
    payment_status: "paid",
    items: [
      {
        id: 1,
        name: "Lenovo IdeaPad Flex 5 11th Gen Intel Core i3 14 FHD 2-in-1 Convertible Laptop (8GB/512GB SDD/Windows 11/Office 2021/Backlit Keyboard/Fingerprint Reader/Graphite Grey/1.5Kg), 82HS015PIN",
        quantity: 1,
        unit_price: '25,000',
        image_url : 'http://localhost:8000/laptop.jpg'
      },
      {
        id: 2,
        name: "Samsung Galaxy M12 (Blue,6GB RAM, 128GB Storage)",
        quantity: 2,
        unit_price: '10,000',
        image_url : 'http://localhost:8000/mobile.jpg'
      },
    ],
  },
  {
    order_id: 124,
    order_date: "2022-03-20",
    order_amount: '3,400.00',
    order_status: "ordered",
    payment_status: "paid",
    items: [
      {
        id: 1,
        name: "Books",
        quantity: 1,
        unit_price: '3,000',
        image_url: 'http://localhost:8000/book.jpg'
      },
      {
        id: 2,
        name: "Stationary",
        quantity: 1,
        unit_price: '400',
        image_url : 'http://localhost:8000/stationary.png'
      },
    ],
  }
];

export default ORDER_LIST;