package com.fpis.spring.repository;

import com.fpis.spring.entity.OrderItem;
import com.fpis.spring.entity.OrderItemPrimary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, OrderItemPrimary> {
}
