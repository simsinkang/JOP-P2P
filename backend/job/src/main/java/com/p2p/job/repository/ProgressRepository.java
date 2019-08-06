package com.p2p.job.repository;

import com.p2p.job.entity.Progress;

import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProgressRepository extends CrudRepository<Progress,Long>, QuerydslPredicateExecutor<Progress> {

}