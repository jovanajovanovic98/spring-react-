package com.fpis.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemPrimary implements Serializable {

    @Column(name = "orders_id", updatable = false)
    private long ordersId;
    private long itemId;

}
