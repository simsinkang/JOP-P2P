package com.p2p.job.controller;

import javax.transaction.Transactional;

import com.p2p.job.entity.*;
import com.p2p.job.repository.WorkRepository;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@Transactional
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/work")
public class WorkController {

    @Autowired
    JPAQueryFactory query;

    @Autowired
    WorkRepository workRepo;

    @GetMapping("/search/{keyword}/{value}/{num}/{size}")
    public ResponseEntity search(@PathVariable("keyword")String keyword,
                                 @PathVariable("value")String value,
                                 @PathVariable("num")int num,
                                 @PathVariable("size")int size) {

        Pageable page = PageRequest.of(num, size, Sort.Direction.DESC, "id");
        List<Object> board_list = new ArrayList<>();
        List<Object> member_list = new ArrayList<>();
        Map<String, List<Object>> result = new HashMap<>();

        BooleanBuilder builder = new BooleanBuilder();
        QWorkBoard qWorkBoard = QWorkBoard.workBoard;

        switch (keyword) {
            case "all":

            break;

            case "title":
//                builder.and(qMember.nickname.contains(value));
                break;

            case "nickname":
//                builder.and(qMember.name.contains(value));
                break;

            default:
                break;
        }

        result.put("board", board_list);
        result.put("member", member_list);

        if (result.isEmpty())
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok(result);
    }

    @PostMapping("/write/{id}")
    public ResponseEntity saveWorkBoard(@PathVariable("id") Long member_id,
                                        @RequestBody WorkBoard workBoard) {
        Member member = new Member();
        member.setId(member_id);
        workBoard.setMember(member);
        workRepo.save(workBoard);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/board/list/{num}/{size}")
    public ResponseEntity selectBoard(@PathVariable("num")int num,
                                      @PathVariable("size")int size) {
        Pageable page = PageRequest.of(num, size, Sort.Direction.DESC, "id");
        List<Object> board_list = new ArrayList<>();
        List<Object> member_list = new ArrayList<>();
        Map<String, List<Object>> result = new HashMap<>();

        workRepo.findByIdGreaterThan(0L, page).forEach(arr -> {
            board_list.add(arr);
            member_list.add(arr.getMember());
        });

        result.put("board", board_list);
        result.put("member", member_list);

        return ResponseEntity.ok(result);
    }

    @GetMapping("/board/detailList/{id}")
    public ResponseEntity detailBoard(@PathVariable("id")Long id) {
        QWorkBoard qWorkBoard = QWorkBoard.workBoard;
        Map<String, Object> list = new HashMap<>();

        query.selectFrom(qWorkBoard)
                .where(qWorkBoard.id.eq(id))
                .fetch()
                .forEach(arr -> {
                    list.put("board", arr);
                });

        return ResponseEntity.ok(list);
    }


    @GetMapping("/board/registr/{id}")
    public ResponseEntity registrBoard(@PathVariable("id")Long id) {
        QWorkBoard qWorkBoard = QWorkBoard.workBoard;
        List<Object> list = new ArrayList<>();

        query.from(qWorkBoard)
                .where(qWorkBoard.member.id.eq(id))
                .orderBy(qWorkBoard.id.desc())
                .fetch()
                .forEach(arr -> list.add(arr));

        return ResponseEntity.ok(list);
    }


    @GetMapping("board/volunteer/{id}")
    public ResponseEntity volunteerBoard(@PathVariable("id")Long id) {
        QWorkBoard qWorkBoard = QWorkBoard.workBoard;
        QVolunteer qVolunteer = QVolunteer.volunteer;

        List<HashMap<String, Object>> result = new ArrayList<>();
        List<WorkBoard> board_list = new ArrayList<>();

        query.selectFrom(qWorkBoard)
                .where(qWorkBoard.member.id.eq(id))
                .orderBy(qWorkBoard.id.desc())
                .fetch()
                .stream()
                .filter(b -> b.getProgressState().contains("모집중"))
                .forEach(board -> {
                    board_list.add(board);
                });

        for (int i = 0; i < board_list.size(); i++) {
            List<Member> member_list = new ArrayList<>();
            List<Volunteer> vol_list = new ArrayList<>();
            HashMap<String, Object> list = new HashMap<>();

            query.selectFrom(qVolunteer)
                    .where(qVolunteer.workBoard.id.eq(board_list.get(i).getId()))
                    .fetch()
                    .forEach(vol -> {
                        vol_list.add(vol);
                        member_list.add(vol.getMember());
                    });

            list.put("volunteer", vol_list);
            list.put("board", board_list.get(i));
            list.put("member", member_list);
            result.add(list);
        }

        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/")
    public ResponseEntity deleteWorkBoard(@PathVariable("num")Long num) {
        workRepo.deleteById(num);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/")
    public ResponseEntity updateWorkBoard(@RequestBody WorkBoard workBoard) {
        return ResponseEntity.ok().build();
    }



    

    
}