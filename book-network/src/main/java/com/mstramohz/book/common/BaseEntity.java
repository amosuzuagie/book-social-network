package com.mstramohz.book.common;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@Setter
@SuperBuilder
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class BaseEntity {
    @Id
    @GeneratedValue
    private Integer id;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime lastModifiedDate;

    @CreatedBy
    @Column(nullable = false, updatable = false)
    private Integer createdBy;

    @LastModifiedBy
    @Column(insertable = false)
    private Integer LastModifiedBy;

    public BaseEntity () {}

    public BaseEntity(Integer id, LocalDateTime createdDate, LocalDateTime lastModifiedDae, Integer createdBy, Integer lastModifiedBy) {
        this.id = id;
        this.createdDate = createdDate;
        this.lastModifiedDate = lastModifiedDae;
        this.createdBy = createdBy;
        LastModifiedBy = lastModifiedBy;
    }
}
