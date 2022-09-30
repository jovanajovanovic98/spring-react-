import React from 'react'
import { ButtonGroup, Table, ButtonToolbar, Button } from 'rsuite'
import { OrderItem } from '../types'

interface Props {
  items: OrderItem[],  
  onDelete: (item: OrderItem) => void,
  onSelect: (item: OrderItem) => void,
  selectedItem?: OrderItem
}

export default function OrderItemTable(props: Props) {
  return (
    <Table
      autoHeight
      data={props.items}
      rowHeight={60}
      rowClassName={(item: any) => {
        if (item === props.selectedItem) {
          return 'selected';
        }
        return '';
      }}
      onRowClick={(orderItem: any, _e) => {
        props.onSelect(orderItem);
      }}
    >
      <Table.Column flexGrow={1}>
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.Cell dataKey='id' />
      </Table.Column>
      <Table.Column flexGrow={2}>
        <Table.HeaderCell>Quantity</Table.HeaderCell>
        <Table.Cell dataKey='quantity' />
      </Table.Column>
      <Table.Column flexGrow={2}>
        <Table.HeaderCell>Value</Table.HeaderCell>
        <Table.Cell dataKey='value' />
      </Table.Column>
      <Table.Column flexGrow={3}>
        <Table.HeaderCell>Product</Table.HeaderCell>
        <Table.Cell dataKey='product.name' />
      </Table.Column>
      <Table.Column flexGrow={2}>
        <Table.HeaderCell>Actions</Table.HeaderCell>
        <Table.Cell>
          {
            (orderItem: any) => {
              return (
                <ButtonGroup>
                  <ButtonToolbar>
                    <Button color="red" appearance="primary" onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      props.onDelete(orderItem)
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
