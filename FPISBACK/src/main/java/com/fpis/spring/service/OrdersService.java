package com.fpis.spring.service;

import com.fpis.spring.dto.OrderDto;
import com.fpis.spring.dto.request.WriteOrderDto;
import com.fpis.spring.entity.Orders;

import java.util.List;

public interface OrdersService {

  List<OrderDto> getAll();
  OrderDto create(WriteOrderDto dto);
  OrderDto update(Long id, WriteOrderDto dto);
  void delete(Long id);
}
