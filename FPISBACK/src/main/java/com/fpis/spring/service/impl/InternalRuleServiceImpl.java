package com.fpis.spring.service.impl;

import com.fpis.spring.dto.request.WriteInternalRuleDto;
import com.fpis.spring.entity.InternalComplaintRule;
import com.fpis.spring.entity.SubjectRule;
import com.fpis.spring.repository.InternalRuleRepository;
import com.fpis.spring.repository.SubjectRuleRepository;
import com.fpis.spring.service.InternalRuleService;
import com.fpis.spring.service.SubjectRuleService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Getter
@Setter
public class InternalRuleServiceImpl implements InternalRuleService {
  @Autowired
  private InternalRuleRepository internalRuleRepository;
  @Autowired
  private SubjectRuleRepository subjectRuleRepository;

  @Override
  @Transactional(readOnly = true)
  public List<InternalComplaintRule> getAll() {
    return internalRuleRepository.findAll();
  }

  @Override
  @Transactional
  public InternalComplaintRule create(WriteInternalRuleDto dto) {
    InternalComplaintRule rule = dto.updateRule(null);
    Optional<SubjectRule> subjectRule = subjectRuleRepository.findById(dto.getSubjectRuleId());
    if (subjectRule.isPresent()) {
      rule.setSubjectRule(subjectRule.get());
    } else {
      throw new RuntimeException("Subject rule doesnt exist");
    }
    return internalRuleRepository.save(rule);
  }

  @Override
  @Transactional
  public InternalComplaintRule update(Long id, WriteInternalRuleDto dto) {
    InternalComplaintRule rule = internalRuleRepository
                                    .findById(id)
                                    .orElseThrow(() -> new RuntimeException("Rule doesnt exist"));
    rule = dto.updateRule(rule);

    if (dto.getSubjectRuleId() != null) {
      Optional<SubjectRule> subjectRule = subjectRuleRepository.findById(dto.getSubjectRuleId());
      if (subjectRule.isPresent()) {
        rule.setSubjectRule(subjectRule.get());
      } else {
        throw new RuntimeException("Subject rule doesnt exist");
      }
    }

    return internalRuleRepository.save(rule);
  }

  @Override
  @Transactional
  public void delete(Long id) {
    InternalComplaintRule rule = internalRuleRepository
            .findById(id)
            .orElseThrow(() -> new RuntimeException("Rule doesnt exist"));
    internalRuleRepository.delete(rule);
  }
}
