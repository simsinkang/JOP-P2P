package com.p2p.job.repository;

import com.p2p.job.entity.WorkBoard;

import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkRepository extends CrudRepository<WorkBoard, Long>, QuerydslPredicateExecutor<WorkBoard> {
    public List<WorkBoard> findByIdGreaterThan(Long id, Pageable page);
}