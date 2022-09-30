package com.fpis.spring.dto;

import com.fpis.spring.entity.Employee;
import com.fpis.spring.entity.Orders;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class OrderDto {
    private Long id;
    private Date dateOrder;
    private String note;
    private BigDecimal amount;
    private List<OrderItemDto> listItems;
    private Employee employee;

    public static OrderDto fromOrder(Orders orders) {
        OrderDto orderDto = new OrderDto();
        orderDto.setId(orders.getId());
        orderDto.setDateOrder(orders.getDateOrder());
        orderDto.setAmount(orders.getAmount());
        orderDto.setNote(orders.getNote());
        orderDto.setEmployee(orders.getEmployee());
        orderDto.setListItems(
                orders.getListItems().stream().map(OrderItemDto::fromOrderItem).collect(Collectors.toList())
        );

        return orderDto;
    }
}
