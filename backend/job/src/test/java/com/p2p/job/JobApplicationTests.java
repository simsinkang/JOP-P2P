package com.p2p.job;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import com.p2p.job.entity.*;
import com.p2p.job.repository.MemberRepository;
import com.p2p.job.repository.VolunteerRepository;
import com.p2p.job.repository.WorkRepository;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.Commit;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.*;


@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
@Commit
public class JobApplicationTests {

	@Autowired
	JPAQueryFactory query;

	@Autowired
	WorkRepository workRepo;

	@Autowired
	MemberRepository memberRepo;

	@Autowired
	EntityManager entityManager;

	@Autowired
	VolunteerRepository volRepo;

	@Test
	public void contextLoads() {

	}

}
