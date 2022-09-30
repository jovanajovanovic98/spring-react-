import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'rsuite'
import { InternalComplaintRule, SubjectRule, WriteInternalComplaintRuleDto } from '../types'
import InternalRuleForm from './forms/InternalRuleForm'
import InternalRuleTable from './InternalRuleTable'

export default function InternalRulePage() {

  const [rules, setRules] = useState<InternalComplaintRule[]>([])
  const [subjectRules, setSubjectRules] = useState<SubjectRule[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [selectedRuleId, setSelectedRuleId] = useState(0);
  const selectedRule = rules.find(r => r.idInternalComplaintRule === selectedRuleId);

  useEffect(() => {
    axios.get('/api/internal-rule').then(res => {
      setRules(res.data);
    })
    axios.get('/api/subject-rule').then(res => {
      setSubjectRules(res.data)
    })
  }, [])


  const createInternalRule = async (dto: WriteInternalComplaintRuleDto) => {
    const res = await axios.post('/api/internal-rule', dto);
    setRules(current => {
      return [...current, res.data]
    });
  }
  const deleteInternalRule = async (id: number) => {
    await axios.delete('/api/internal-rule/' + id);
    setRules(current => {
      return current.filter(rule => rule.idInternalComplaintRule !== id);
    });
  }
  const updateInternalRule = async (dto: WriteInternalComplaintRuleDto) => {
    const res = await axios.put('/api/internal-rule/' + selectedRuleId, dto);
    setRules(current => {
      return current.map(element => {
        if (element.idInternalComplaintRule !== selectedRuleId) {
          return element;
        }
        return res.data;
      });
    });
  }

  return (
    <div className='main'>
      <InternalRuleForm
        internalRule={selectedRule}
        onSubmit={async (dto) => {
          if (selectedRuleId > 0) {
            updateInternalRule(dto);
          } else {
            createInternalRule(dto);
          }
        }}
        subjectRules={subjectRules}
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedRuleId(0);
        }}
      />
      <div className='title'>Internal complaint rules</div>
      <div>
        <Button
          appearance='primary'
          onClick={() => {
            setOpenModal(true);
          }}
        >Create</Button>
      </div>
      <div>
        <InternalRuleTable
          rules={rules}
          onDelete={deleteInternalRule}
          onUpdate={id => {
            setSelectedRuleId(id);
            setOpenModal(true);
          }}
        />
      </div>
    </div>
  )
}
