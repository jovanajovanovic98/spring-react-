package com.fpis.spring.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class WriteOrderItemDto {
  //ako je 0 onda je kreiranje, a u suprotnom je azuriranje
  private Long id;
  private BigDecimal quantity;
  private Long productId;
}
