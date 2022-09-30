package com.fpis.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class OrderItem implements Serializable {

  @EmbeddedId
  private OrderItemPrimary orderItemPrimary;

  private BigDecimal quantity;
  private BigDecimal value;
  //@ManyToOne(fetch = FetchType.LAZY, optional = false)
  @ManyToOne
  @JoinColumn(name = "orders_id", insertable = false, updatable = false)
  private Orders orders;
  @ManyToOne
  private Product product;

}
