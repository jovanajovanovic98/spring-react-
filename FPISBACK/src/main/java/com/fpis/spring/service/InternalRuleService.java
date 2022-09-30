package com.fpis.spring.service;

import com.fpis.spring.dto.request.WriteInternalRuleDto;
import com.fpis.spring.entity.InternalComplaintRule;

import java.util.List;

public interface InternalRuleService {
  List<InternalComplaintRule> getAll();

  InternalComplaintRule create(WriteInternalRuleDto dto);
  InternalComplaintRule update(Long id, WriteInternalRuleDto dto);

  void delete(Long id);
}
