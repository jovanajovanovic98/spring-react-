package com.fpis.spring.controller;


import com.fpis.spring.dto.request.WriteInternalRuleDto;
import com.fpis.spring.entity.InternalComplaintRule;
import com.fpis.spring.service.InternalRuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/internal-rule")
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.DELETE, RequestMethod.POST, RequestMethod.PUT})
public class InternalRuleController {
  @Autowired
  private InternalRuleService internalRuleService;

  @GetMapping
  public List<InternalComplaintRule> getAll() {
    return internalRuleService.getAll();
  }

  @PostMapping
  public InternalComplaintRule create(@RequestBody WriteInternalRuleDto dto) {
    return internalRuleService.create(dto);
  }

  @PutMapping("/{id}")
  public InternalComplaintRule update(@PathVariable Long id, @RequestBody WriteInternalRuleDto dto) {
    return internalRuleService.update(id, dto);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable Long id) {
    internalRuleService.delete(id);
  }
}
