package com.fpis.spring.controller;

import com.fpis.spring.entity.Product;
import com.fpis.spring.service.ProductService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
@Getter
@Setter
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.DELETE, RequestMethod.POST, RequestMethod.PUT})
public class ProductController {
  @Autowired
  private ProductService productService;

  @GetMapping
  public List<Product> getAll() {
    return productService.getAll();
  }
}
