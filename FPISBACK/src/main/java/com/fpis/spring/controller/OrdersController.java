package com.fpis.spring.controller;

import com.fpis.spring.dto.OrderDto;
import com.fpis.spring.dto.request.WriteOrderDto;
import com.fpis.spring.service.OrdersService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@Setter
@Getter
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.DELETE, RequestMethod.POST, RequestMethod.PUT})
public class OrdersController {
  @Autowired
  private OrdersService ordersService;

  @GetMapping
  public List<OrderDto> getAll() {
    return ordersService.getAll();
  }

  @PostMapping
  public OrderDto create(@RequestBody WriteOrderDto dto) {
    return ordersService.create(dto);
  }

  @PutMapping("/{id}")
  public OrderDto update(@PathVariable Long id, @RequestBody WriteOrderDto dto) {
    return ordersService.update(id, dto);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable Long id) {
    ordersService.delete(id);
  }
}
