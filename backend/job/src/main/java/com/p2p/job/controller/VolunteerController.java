package com.p2p.job.controller;

import com.p2p.job.entity.Member;
import com.p2p.job.entity.QMember;
import com.p2p.job.entity.Volunteer;
import com.p2p.job.entity.WorkBoard;
import com.p2p.job.repository.VolunteerRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@Transactional
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/volunteer")
public class VolunteerController {
    @Autowired
    JPAQueryFactory query;

    @Autowired
    VolunteerRepository volRepo;

    @PostMapping("/request/{memberId}/{workId}")
    public ResponseEntity volSave(@PathVariable("memberId")Long memberId,
                                  @PathVariable("workId")Long workId) {
        Member member = new Member();
        WorkBoard workBoard = new WorkBoard();
        Volunteer volunteer = new Volunteer();

        member.setId(memberId);
        workBoard.setId(workId);
        volunteer.setMember(member);
        volunteer.setWorkBoard(workBoard);

        volRepo.save(volunteer);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/list/{id}")
    public ResponseEntity volList(@PathVariable("id")Long id) {
//        QMember qMember = QMember.member;
//        query.from(qMember)
//                .where(qMember.id.eq(id))

        return null;
    }
}
