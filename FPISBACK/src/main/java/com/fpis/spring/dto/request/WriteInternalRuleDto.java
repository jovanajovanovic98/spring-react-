package com.fpis.spring.dto.request;

import com.fpis.spring.entity.InternalComplaintRule;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class WriteInternalRuleDto {
  private Long dateEntry;
  private String description;
  private String name;
  private Long subjectRuleId;

  public InternalComplaintRule updateRule(InternalComplaintRule internalComplaintRule) {
    if (internalComplaintRule == null) {
      internalComplaintRule = new InternalComplaintRule();
    }
    if (dateEntry != null) {
      internalComplaintRule.setDateEntry(new Date(dateEntry));
    }
    if (description != null) {
      internalComplaintRule.setDescription(description);
    }
    if (name != null) {
      internalComplaintRule.setName(name);
    }
    return internalComplaintRule;
  }
}
