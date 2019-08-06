package com.p2p.job.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(exclude = {"workBoard", "volunteer"})
@Entity
@Table(name = "progress")
public class Progress implements Comparable<Progress> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "progress_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "work_id")
    private WorkBoard workBoard;

    @ManyToOne
    @JoinColumn(name = "volunteer_id")
    private Volunteer volunteer;

    @Column(name = "finish_date")
    private LocalDateTime finishDate;

    @Override
    public int compareTo(Progress o) {
        return Long.compare(id, o.id);
    }
}