import React, { useEffect, useState } from 'react'
import { FlexboxGrid, Form, Modal, Input, DatePicker, InputPicker, Schema, Button } from 'rsuite'
import { Employee, Order, OrderItem, Product, WriteOrder, WriteOrderItem } from '../../types'
import OrderItemTable from '../OrderItemTable';

//@ts-ignore
const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

interface Props {
  open: boolean,
  onClose: () => void,
  employees: Employee[],
  products: Product[],
  selectedOrder?: Order,
  onSubmit: (dto: WriteOrder) => Promise<void>
}
const orderModel = Schema.Model({
  dateOrder: Schema.Types.DateType().isRequired(),
  employeeId: Schema.Types.NumberType().isRequired(),
  note: Schema.Types.StringType().isRequired(),
})

const itemModel = Schema.Model({
  quantity: Schema.Types.NumberType().min(0).isRequired(),
  productId: Schema.Types.NumberType().isRequired(),
})

const initalStateOrder: WriteOrder = {
  dateOrder: null,
  employeeId: null,
  note: '',
}
const initialStateItem: WriteOrderItem & { value?: number | '' } = {
  id: null,
  productId: null,
  quantity: 0,
  value: ''
}

export default function OrdersForm(props: Props) {

  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [selectedItem, setSelectedItem] = useState<OrderItem | undefined>(undefined)
  const [orderForm, setOrderForm] = useState<WriteOrder>(initalStateOrder)
  const [orderItemForm, setOrderItemForm] = useState<WriteOrderItem & { value?: number | '' }>(initialStateItem)
  const [deleteItemIds, setDeleteItemIds] = useState<number[]>([])

  useEffect(() => {

    if (props.selectedOrder) {
      setOrderItems(props.selectedOrder.listItems);
      setOrderForm({
        dateOrder: new Date(props.selectedOrder.dateOrder),
        employeeId: props.selectedOrder.employee.idEmployee,
        note: props.selectedOrder.note,
      })
    } else {
      setOrderForm(initalStateOrder);
      setOrderItems([]);
    }

    setDeleteItemIds([]);
    setSelectedItem(undefined);
    setOrderItemForm(initialStateItem)

  }, [props.selectedOrder])


  useEffect(() => {
    if (!selectedItem) {
      setOrderItemForm(initialStateItem)
    } else {
      setOrderItemForm({
        id: selectedItem.id,
        productId: selectedItem.product.productId,
        quantity: selectedItem.quantity,
        value: selectedItem.value
      })
    }
  }, [selectedItem])


  return (
    <Modal
      size='full'
      open={props.open}
      onClose={props.onClose}
    >
      <Modal.Header>
        <Modal.Title className='title'>{props.selectedOrder ? 'Update ' : 'Create '} order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FlexboxGrid justify='space-between'>
          <FlexboxGrid.Item colspan={5}>
            <Form
              fluid
              model={orderModel}
              formValue={orderForm}
              onChange={value => {
                //@ts-ignore
                setOrderForm(value)
              }}
              onSubmit={async valid => {
                if (!valid) {
                  return;
                }
                await props.onSubmit({
                  deleteItemIds,
                  dateOrder: orderForm.dateOrder?.valueOf() || null,
                  employeeId: orderForm.employeeId,
                  note: orderForm.note,
                  items: orderItems.map(item => {
                    return {
                      id: item.id,
                      productId: item.product.productId,
                      quantity: item.quantity
                    }
                  })
                });
                setOrderForm(initalStateOrder);
                setOrderItemForm(initialStateItem);
                setOrderItems([]);
                props.onClose();
              }}
            >
              <Form.Group>
                <Form.ControlLabel>Date order</Form.ControlLabel>
                <Form.Control name='dateOrder' accepter={DatePicker} oneTap />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>Employe</Form.ControlLabel>
                <Form.Control
                  name='employeeId'
                  accepter={InputPicker}
                  data={props.employees.map(employee => {
                    return {
                      value: employee.idEmployee,
                      label: employee.firstLastName
                    }
                  })}
                />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>Note</Form.ControlLabel>
                <Form.Control name='note' accepter={Textarea} />
              </Form.Group>

              <Button type='submit' appearance='primary'>Save</Button>
            </Form>

          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={10}>

            <OrderItemTable
              selectedItem={selectedItem}
              items={orderItems}
              onDelete={item => {
                if (item.id) {
                  setDeleteItemIds(current => {
                    return [...current, item.id!];
                  })
                }
                setOrderItems(current => {
                  return current.filter(i => i !== item);
                })
                setSelectedItem(undefined);
              }}
              onSelect={item => {
                setSelectedItem(current => {
                  if (current === item) {
                    return undefined; 
                  }
                  return item; 
                });
              }}
            />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={5}>
            <div className='title'>{selectedItem ? 'Update ' : 'Add '} item</div>
            <Form
              fluid
              model={itemModel}
              formValue={orderItemForm}
              onChange={value => {
                //@ts-ignore
                setOrderItemForm(value);
              }}
              onSubmit={(valid) => {
                if (!valid) {
                  return;
                }
                const product = props.products.find(p => p.productId === Number(orderItemForm.productId));
                if (!product) {
                  return;
                }
                if (selectedItem) {
                  setOrderItems(currnet => {
                    return currnet.map(item => {
                      if (item !== selectedItem) {
                        return item;
                      }
                      return {
                        ...item,
                        product: product,
                        quantity: orderItemForm.quantity,
                        value: product.price * orderItemForm.quantity
                      }
                    })
                  })
                } else {
                  setOrderItems(current => {
                    return [
                      ...current,
                      {
                        id: null,
                        quantity: orderItemForm.quantity,
                        product,
                        value: product.price * orderItemForm.quantity
                      }
                    ]
                  })
                }
                setSelectedItem(undefined);
                setOrderItemForm(initialStateItem);
              }}
            >
              <Form.Group>
                <Form.ControlLabel>Quantity</Form.ControlLabel>
                <Form.Control name='quantity' />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>Product</Form.ControlLabel>
                <Form.Control
                  name='productId'
                  accepter={InputPicker}
                  data={props.products.map(product => {
                    return {
                      value: product.productId,
                      label: product.name
                    }
                  })}
                />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>Value</Form.ControlLabel>
                <Form.Control name='value' readOnly />
              </Form.Group>
              <Button appearance='primary' type='submit'>Save</Button>
            </Form>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Modal.Body>
    </Modal>
  )
}
