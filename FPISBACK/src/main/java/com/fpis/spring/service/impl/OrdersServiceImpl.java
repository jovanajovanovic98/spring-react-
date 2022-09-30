package com.fpis.spring.service.impl;

import com.fpis.spring.dto.OrderDto;
import com.fpis.spring.dto.request.WriteOrderDto;
import com.fpis.spring.dto.request.WriteOrderItemDto;
import com.fpis.spring.entity.*;
import com.fpis.spring.repository.EmployeeRepository;
import com.fpis.spring.repository.OrderItemRepository;
import com.fpis.spring.repository.OrdersRepository;
import com.fpis.spring.repository.ProductRepository;
import com.fpis.spring.service.OrdersService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Getter
@Setter
@Service
public class OrdersServiceImpl implements OrdersService {

  @Autowired
  private OrdersRepository ordersRepository;
  @Autowired
  private ProductRepository productRepository;
  @Autowired
  private EmployeeRepository employeeRepository;
  @Autowired
  private OrderItemRepository orderItemRepository;

  @Override
  @Transactional(readOnly = true)
  public List<OrderDto> getAll() {
    List<Orders> orders = ordersRepository.findAll();
    return orders.stream().map(OrderDto::fromOrder).collect(Collectors.toList());

  }

  @Override
  @Transactional
  public OrderDto create(WriteOrderDto dto) {

    Orders orders = createOrUpdateOrderFromDto(null, dto);
    List<OrderItem> orderItems = new LinkedList<>();
    orders = ordersRepository.save(orders);
    int i = 1;
    for (WriteOrderItemDto itemDto : dto.getItems()) {
      OrderItem item = createOrUpdateItemFromDto(null, itemDto, orders);
      item.getOrderItemPrimary().setItemId(i++);
      orderItems.add(item);
    }
    orderItemRepository.saveAll(orderItems);
    orders.setAmount(orderItems.stream().map(OrderItem::getValue).reduce(BigDecimal.ZERO, BigDecimal::add));
    orders.setListItems(orderItems);
    return OrderDto.fromOrder(orders);
  }

  @Override
  @Transactional
  public OrderDto update(Long id, WriteOrderDto dto) {
    Orders orders = ordersRepository.findById(id).orElseThrow(() -> new RuntimeException("No such order"));
    long itemId = orders
            .getListItems()
            .stream()
            .map(item ->item.getOrderItemPrimary().getItemId())
            .max(Long::compare).orElse(0L) + 1;

    orders = createOrUpdateOrderFromDto(orders, dto);
    List<OrderItem> orderItems = orders.getListItems();
    for (WriteOrderItemDto itemDto : dto.getItems()) {
      if (itemDto.getId() == null) {
        OrderItem item = createOrUpdateItemFromDto(null, itemDto, orders);
        item.getOrderItemPrimary().setItemId(itemId++);
        orderItems.add(item);
      } else {
        OrderItem item = orderItems
                .stream()
                .filter(i -> Objects.equals(i.getOrderItemPrimary().getItemId(), itemDto.getId()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No such item"));
        createOrUpdateItemFromDto(item, itemDto, orders);
      }
    }
    List<OrderItem> itemsToSave = new LinkedList<>();
    for (OrderItem orderItem : orderItems) {
      if (dto.getDeleteItemIds() != null &&
          dto.getDeleteItemIds().contains(orderItem.getOrderItemPrimary().getItemId())) {
        orderItemRepository.delete(orderItem);
      } else {
        itemsToSave.add(orderItem);
      }
    }

    itemsToSave = orderItemRepository.saveAll(itemsToSave);
    orders.setListItems(itemsToSave);
    orders.setAmount(itemsToSave.stream().map(OrderItem::getValue).reduce(BigDecimal.ZERO, BigDecimal::add));
    return OrderDto.fromOrder(orders);
  }

  @Override
  @Transactional
  public void delete(Long id) {
    Orders orders = ordersRepository.findById(id).orElseThrow(() -> new RuntimeException("Order doesn't exist"));
    ordersRepository.delete(orders);
  }

  private Orders createOrUpdateOrderFromDto(Orders orders, WriteOrderDto dto) {
    if (orders == null) {
      orders = new Orders();
    }
    if (dto.getNote() != null) {
      orders.setNote(dto.getNote());
    }
    if (dto.getDateOrder() != null)
      orders.setDateOrder(new Date(dto.getDateOrder()));
    if (dto.getEmployeeId() != null) {
      Employee employee = employeeRepository.findById(dto.getEmployeeId()).orElseThrow(() -> new RuntimeException("No such employee"));
      orders.setEmployee(employee);
    }
    return orders;
  }

  private OrderItem createOrUpdateItemFromDto(OrderItem orderItem, WriteOrderItemDto itemDto, Orders orders) {
    if (orderItem == null) {
      orderItem =  new OrderItem();
      OrderItemPrimary primary = new OrderItemPrimary();
      primary.setOrdersId(orders.getId());
      orderItem.setOrderItemPrimary(primary);
    }
    orderItem.setOrders(orders);
    if (itemDto.getQuantity() != null)
      orderItem.setQuantity(itemDto.getQuantity());
    if (itemDto.getProductId() != null) {
      Product product = productRepository.findById(itemDto.getProductId()).orElseThrow(() -> new RuntimeException("Missing product"));
      orderItem.setProduct(product);
    }
    orderItem.setValue(orderItem.getProduct().getPrice().multiply(orderItem.getQuantity()));
    return orderItem;
  }
}
