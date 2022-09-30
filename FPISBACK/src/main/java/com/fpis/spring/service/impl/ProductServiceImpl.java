package com.fpis.spring.service.impl;


import com.fpis.spring.entity.Product;
import com.fpis.spring.repository.ProductRepository;
import com.fpis.spring.service.ProductService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Getter
@Setter
public class ProductServiceImpl implements ProductService {
  @Autowired
  private ProductRepository productRepository;

  @Override
  public List<Product> getAll() {
    return productRepository.findAll();
  }
}
