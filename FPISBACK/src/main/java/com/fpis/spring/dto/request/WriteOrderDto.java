package com.fpis.spring.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class WriteOrderDto {
  private Long dateOrder;
  private String note;
  private Long employeeId;
  private List<Long> deleteItemIds;
  private List<WriteOrderItemDto> items;
}
