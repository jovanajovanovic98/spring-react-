package com.fpis.spring.repository;

import com.fpis.spring.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrdersRepository extends JpaRepository<Orders, Long> {
  //@Query("SELECT o FROM Orders o LEFT JOIN FETCH o.employee")
  //List<Orders> getAll();
}
