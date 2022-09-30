import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button } from 'rsuite';
import { Employee, Order, Product, WriteOrder } from '../types';
import OrdersForm from './forms/OrdersForm';
import OrdersTable from './OrdersTable';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [empleyees, setEmpleyees] = useState<Employee[]>([])
  const [selectedOrderId, setSelectedOrderId] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([])

  const selectedOrder = orders.find(o => o.id === selectedOrderId);

  useEffect(() => {
    axios.get('/api/orders').then(res => {
      setOrders(res.data);
    })
    axios.get('/api/employee').then(res => {
      setEmpleyees(res.data)
    })
    axios.get('/api/product').then(res => {
      setProducts(res.data)
    })
  }, [])

  const deleteOrder = async (id: number) => {
    await axios.delete('/api/orders/' + id);
    setOrders(current => {
      return current.filter(e => e.id !== id);
    })
  }

  const createOrder = async (dto: WriteOrder) => {
    const res = await axios.post('/api/orders', dto);
    setOrders(current => {
      return [
        ...current,
        res.data
      ]
    })
  }
  const updateOrder = async (dto: WriteOrder) => {
    const res = await axios.put('/api/orders/' + selectedOrderId, dto);
    setOrders(current => {
      return current.map(order => {
        if (order.id !== selectedOrderId) {
          return order;
        }
        return res.data;
      })
    })
  }

  return (
    <div className='main'>
      <OrdersForm
        selectedOrder={selectedOrder}
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedOrderId(0);
        }}
        products={products}
        employees={empleyees}
        onSubmit={async dto => {
          if (!selectedOrderId) {
            createOrder(dto);
          } else {
            updateOrder(dto)
          }
        }}
      />
      <div className='title'>Orders</div>
      <div>
        <Button
          appearance='primary'
          onClick={() => {
            setOpenModal(true);

          }}
        >Create</Button>
      </div>
      <div>
        <OrdersTable
          orders={orders}
          onUpdate={id => {
            setSelectedOrderId(id);
            setOpenModal(true);
          }}
          onDelete={deleteOrder}
        />
      </div>
    </div>
  )
}
