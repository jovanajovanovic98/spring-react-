package com.fpis.spring.service.impl;

import com.fpis.spring.entity.SubjectRule;
import com.fpis.spring.repository.SubjectRuleRepository;
import com.fpis.spring.service.SubjectRuleService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Getter
@Setter
public class SubjectRuleServiceImpl implements SubjectRuleService {
  @Autowired
  private SubjectRuleRepository subjectRuleRepository;

  @Override
  public List<SubjectRule> getAll() {
    return subjectRuleRepository.findAll();
  }
}
