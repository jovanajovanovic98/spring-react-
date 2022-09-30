import React from 'react'
import { Button, ButtonGroup, ButtonToolbar, Table } from 'rsuite'
import *  as dateFns from 'date-fns'
import { InternalComplaintRule } from '../types'

interface Props {
  rules: InternalComplaintRule[],
  onDelete: (id: number) => void,
  onUpdate: (id: number) => void,
}

export default function InternalRuleTable(props: Props) {
  return (
    <Table
      data={props.rules}
      rowHeight={60}
      autoHeight
    > 
      <Table.Column flexGrow={1}>
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.Cell dataKey='idInternalComplaintRule' />
      </Table.Column>
      <Table.Column flexGrow={4}>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.Cell dataKey='name' />
      </Table.Column>
      <Table.Column flexGrow={4}>
        <Table.HeaderCell>Date entry</Table.HeaderCell>
        <Table.Cell>
          {
            (rule: any) => {
              return dateFns.format(new Date(rule.dateEntry), 'dd.MM.yyyy');
            }
          }
        </Table.Cell>
      </Table.Column>
      <Table.Column flexGrow={4}>
        <Table.HeaderCell>Subject rule</Table.HeaderCell>
        <Table.Cell dataKey='subjectRule.nameSubjectRule' />
      </Table.Column>
      <Table.Column flexGrow={2} minWidth={180}>
        <Table.HeaderCell>Actions</Table.HeaderCell>
        <Table.Cell>
          {
            (rule: any) => {
              return (
                <ButtonGroup>
                  <ButtonToolbar>
                    <Button color="green" appearance="primary" onClick={() => {
                      props.onUpdate(rule.idInternalComplaintRule)
                    }}>Change</Button>
                    <Button color="red" appearance="primary" onClick={() => {
                      props.onDelete(rule.idInternalComplaintRule)
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
