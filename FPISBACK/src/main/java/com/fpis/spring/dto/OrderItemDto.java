package com.fpis.spring.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fpis.spring.entity.OrderItem;
import com.fpis.spring.entity.Product;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class OrderItemDto {
  private Long id;
  private BigDecimal quantity;
  private BigDecimal value;
  private Product product;


  public static OrderItemDto fromOrderItem(OrderItem orderItem) {
    OrderItemDto itemDto = new OrderItemDto();
    itemDto.setId(orderItem.getOrderItemPrimary().getItemId());
    itemDto.setProduct(orderItem.getProduct());
    itemDto.setValue(orderItem.getValue());
    itemDto.setQuantity(orderItem.getQuantity());
    return itemDto;
  }
}
