import React, { useEffect, useState } from 'react'
import { Button, DatePicker, Form, Input, InputPicker, Modal, Schema } from 'rsuite'
import { SubjectRule, WriteInternalComplaintRuleDto, InternalComplaintRule } from '../../types';

//@ts-ignore
const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

interface Props {
  open: boolean,
  subjectRules: SubjectRule[],
  internalRule?: InternalComplaintRule,
  onClose: () => void,
  onSubmit: (dto: WriteInternalComplaintRuleDto) => Promise<void>
}

const model = Schema.Model({
  name: Schema.Types.StringType().isRequired(),
  dateEntry: Schema.Types.DateType().isRequired(),
  subjectRuleId: Schema.Types.NumberType().isRequired().isInteger(),
  description: Schema.Types.StringType().isRequired(),
})

const initialState: WriteInternalComplaintRuleDto = {
  dateEntry: null,
  description: '',
  name: '',
  subjectRuleId: null
}

export default function InternalRuleForm(props: Props) {
  const [formState, setFormState] = useState<WriteInternalComplaintRuleDto>(initialState);


  useEffect(() => {

    if (!props.internalRule) {
      setFormState(initialState);
    } else {
      setFormState({
        name: props.internalRule.name,
        dateEntry: new Date(props.internalRule.dateEntry),
        description: props.internalRule.description,
        subjectRuleId: props.internalRule.subjectRule.idSubjectRule
      })
    }

  }, [props.internalRule])

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
    >
      <Modal.Header>
        <Modal.Title className='title'>{props.internalRule ? 'Update ' : 'Create '} internal rule</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          formValue={formState}
          onChange={val => {
            //@ts-ignore
            setFormState(val);
          }}
          model={model}
          onSubmit={async (check) => {
            if (!check) {
              return;
            }
            await props.onSubmit({
              ...formState,
              dateEntry: new Date(formState.dateEntry || 0).valueOf()
            });
            props.onClose();
            setFormState(initialState);
          }}
        >
          <Form.Group>
            <Form.ControlLabel>Name</Form.ControlLabel>
            <Form.Control name='name' />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Date entry</Form.ControlLabel>
            <Form.Control name='dateEntry' accepter={DatePicker} oneTap />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Subject rule</Form.ControlLabel>
            <Form.Control
              name='subjectRuleId'
              accepter={InputPicker}
              data={props.subjectRules.map(rule => {
                return {
                  value: rule.idSubjectRule,
                  label: rule.nameSubjectRule
                }
              })}
            />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Description</Form.ControlLabel>
            <Form.Control name='description' accepter={Textarea} />
          </Form.Group>
          <Button type='submit' appearance='primary'>Save</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
