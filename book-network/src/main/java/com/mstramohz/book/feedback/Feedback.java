package com.mstramohz.book.feedback;

import com.mstramohz.book.book.Book;
import com.mstramohz.book.common.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@Entity
@SuperBuilder
@AllArgsConstructor
public class Feedback extends BaseEntity {
    private Double note;
    private String comment;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

    public Feedback () {}
}
