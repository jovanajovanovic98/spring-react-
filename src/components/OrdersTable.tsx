import React from 'react'
import { Table, ButtonGroup, ButtonToolbar, Button } from 'rsuite'
import { Order } from '../types'
import *  as dateFns from 'date-fns'

interface Props {
  orders: Order[],
  onDelete: (id: number) => void,
  onUpdate: (id: number) => void,
}
export default function OrdersTable(props: Props) {
  return (
    <Table
      data={props.orders}
      autoHeight
      rowHeight={60}
    >
      <Table.Column flexGrow={1}>
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.Cell dataKey='id' />
      </Table.Column>
      <Table.Column flexGrow={3}>
        <Table.HeaderCell>Amount</Table.HeaderCell>
        <Table.Cell dataKey='amount' />
      </Table.Column>
      <Table.Column flexGrow={3}>
        <Table.HeaderCell>Date</Table.HeaderCell>
        <Table.Cell>
          {
            (order: any) => {
              return dateFns.format(new Date(order.dateOrder), 'dd.MM.yyyy');
            }
          }
        </Table.Cell>
      </Table.Column>
      <Table.Column flexGrow={3}>
        <Table.HeaderCell>Employee</Table.HeaderCell>
        <Table.Cell dataKey='employee.firstLastName' />
      </Table.Column>
      <Table.Column flexGrow={3}>
        <Table.HeaderCell>Note</Table.HeaderCell>
        <Table.Cell dataKey='note' />
      </Table.Column>
      <Table.Column flexGrow={2} minWidth={180}>
        <Table.HeaderCell>Actions</Table.HeaderCell>
        <Table.Cell>
          {
            (order: any) => {
              return (
                <ButtonGroup>
                  <ButtonToolbar>
                    <Button color="green" appearance="primary" onClick={() => {
                      props.onUpdate(order.id)
                    }}>Change</Button>
                    <Button color="red" appearance="primary" onClick={() => {
                      props.onDelete(order.id)
                    }}>Delete</Button>
                  </ButtonToolbar>
                </ButtonGroup>
              )
            }
          }
        </Table.Cell>
      </Table.Column>
    </Table>
  )
}
