package com.fpis.spring.repository;

import com.fpis.spring.entity.InternalComplaintRule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InternalRuleRepository extends JpaRepository<InternalComplaintRule, Long> {
}
