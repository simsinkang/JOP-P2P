package com.p2p.job.controller;

import com.p2p.job.entity.*;
import com.p2p.job.repository.ProgressRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.querydsl.jpa.impl.JPAUpdateClause;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;

@Transactional
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/progress")
public class ProgressController {

    @Autowired
    JPAQueryFactory query;

    @Autowired
    EntityManager entityManager;

    @Autowired
    ProgressRepository proRepo;

    @PostMapping("/{volId}/{boardId}")
    public ResponseEntity proSave(@PathVariable("volId")Long volId,
                                  @PathVariable("boardId")Long boardId) {
        Volunteer volunteer = new Volunteer();
        WorkBoard workBoard = new WorkBoard();
        Progress progress = new Progress();

        QWorkBoard qWorkBoard = QWorkBoard.workBoard;

        volunteer.setId(volId);
        workBoard.setId(boardId);

        progress.setVolunteer(volunteer);
        progress.setWorkBoard(workBoard);

        proRepo.save(progress);

        new JPAUpdateClause(entityManager, qWorkBoard).where(qWorkBoard.id.eq(boardId))
                .set(qWorkBoard.progressState, "진행중")
                .execute();

        return ResponseEntity.ok("거래 진행");
    }

    @GetMapping("/my/list/{id}")
    public ResponseEntity progressSave(@PathVariable("id")Long id) {
        QVolunteer qVolunteer = QVolunteer.volunteer;
        QProgress qProgress = QProgress.progress;
        QWorkBoard qWorkBoard = QWorkBoard.workBoard;

        HashMap<String, Object> result = new HashMap<>();

        List<WorkBoard> board_temp = new ArrayList<>();
        List<WorkBoard> board_list = new ArrayList<>();
        List<WorkBoard> board_req_list = new ArrayList<>();

        List<Progress> pro_list = new ArrayList<>();

        query.selectFrom(qVolunteer)
                .where(qVolunteer.member.id.eq(id))
                .fetch()
                .forEach(vol -> {
                    query.selectFrom(qProgress)
                            .where(qProgress.volunteer.id.eq(vol.getId()))
                            .fetch()
                            .forEach(arr -> pro_list.add(arr));
                });

        pro_list.stream()
                .sorted(Comparator.reverseOrder())
                .forEach(b -> {
                    board_temp.add(b.getWorkBoard());
                });

        board_temp.stream()
                .filter(b -> b.getProgressState()
                .contains("진행중"))
                .forEach(bp -> board_list.add(bp));


        query.selectFrom(qWorkBoard)
                .where(qWorkBoard.member.id.eq(id))
                .orderBy(qWorkBoard.id.desc())
                .fetch()
                .stream()
                .filter(b -> b.getProgressState().contains("진행중"))
                .forEach(req -> board_req_list.add(req));

        result.put("volunteer", board_list);
        result.put("request", board_req_list);

        return ResponseEntity.ok(result);
    }

    @GetMapping("/trans/{id}")
    public ResponseEntity trans(@PathVariable("id")Long id) {
        QProgress qProgress = QProgress.progress;
        QVolunteer qVolunteer = QVolunteer.volunteer;

        List<Member> members = new ArrayList<>();

        query.selectFrom(qProgress)
                .where(qProgress.workBoard.id.eq(id))
                .fetch()
                .forEach(pro -> {
                    query.selectFrom(qVolunteer)
                            .where(qVolunteer.id.eq(pro.getVolunteer().getId()))
                            .fetch()
                            .forEach(v -> members.add(v.getMember()));
                });

        return ResponseEntity.ok(members);
    }

    @PostMapping("/payment/{req_id}/{vol_id}/{point}/{score}")
    public ResponseEntity payment(@PathVariable("req_id")Long req_id,
                                  @PathVariable("vol_id")Long vol_id,
                                  @PathVariable("point")int point,
                                  @PathVariable("score")double score) {
        QMember qMember = QMember.member;

        List<Member> req = query.selectFrom(qMember)
                .where(qMember.id.eq(req_id))
                .fetch();

        List<Member> vol = query.selectFrom(qMember)
                .where(qMember.id.eq(vol_id))
                .fetch();

        new JPAUpdateClause(entityManager, qMember).where(qMember.id.eq(req_id))
                .set(qMember.point, req.get(0).getPoint() - point)
                .execute();

        new JPAUpdateClause(entityManager, qMember).where(qMember.id.eq(vol_id))
                .set(qMember.point, vol.get(0).getPoint() + point)
                .set(qMember.volunteerScore, vol.get(0).getVolunteerScore() + score)
                .set(qMember.volScoreCount, vol.get(0).getVolScoreCount() + 1)
                .execute();

        return ResponseEntity.ok().build();
    }

    @PostMapping("/trans/end/{id}/{score}/{reqId}")
    public ResponseEntity end(@PathVariable("id")Long id,
                              @PathVariable("score")double score,
                              @PathVariable("reqId")Long reqId) {
        QWorkBoard qWorkBoard = QWorkBoard.workBoard;
        QMember qMember = QMember.member;

        List<Member> member = query.selectFrom(qMember)
                .where(qMember.id.eq(reqId))
                .fetch();

        new JPAUpdateClause(entityManager, qMember)
                .where(qMember.id.eq(reqId))
                .set(qMember.requestScore, member.get(0).getRequestScore() + score)
                .set(qMember.reqScoreCount, member.get(0).getReqScoreCount() + 1)
                .execute();


        new JPAUpdateClause(entityManager, qWorkBoard)
                .where(qWorkBoard.id.eq(id))
                .set(qWorkBoard.progressState, "종료")
                .execute();

        return ResponseEntity.ok().build();
    }


}
