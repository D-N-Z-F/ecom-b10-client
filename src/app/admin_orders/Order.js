"use client";

import { Dropdown, Table } from "react-daisyui";

function Order({ order }) {
  return (
    <Table.Row>
      <div>{order.user.fullname}</div>
      <div>
        <Dropdown horizontal="left" hover="true">
          <Dropdown.Toggle>{order.items.length}</Dropdown.Toggle>
          <Dropdown.Menu>
            {order.items.map((item, i) => (
              <Dropdown.Item key={i} className="text-white">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h4>Product ID</h4>
                  <p>{item.product}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h4>Quantity</h4>
                  <p>{item.quantity}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h4>Subtotal</h4>
                  <p>{item.subtotal}</p>
                </div>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div>{order.total}</div>
      <div>{order.purchased_date.slice(0, 10)}</div>
    </Table.Row>
  );
}

export default Order;
