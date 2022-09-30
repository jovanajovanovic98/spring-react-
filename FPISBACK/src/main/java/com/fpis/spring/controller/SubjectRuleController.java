package com.fpis.spring.controller;
import com.fpis.spring.entity.SubjectRule;
import com.fpis.spring.service.SubjectRuleService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subject-rule")
@Getter
@Setter
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.DELETE, RequestMethod.POST, RequestMethod.PUT})
public class SubjectRuleController {
    @Autowired
    private SubjectRuleService subjectRuleService;

    @GetMapping
    public List<SubjectRule> getAll() {
        return subjectRuleService.getAll();
    }
}
