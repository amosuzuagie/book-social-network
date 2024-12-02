package com.mstramohz.book.book;

import com.mstramohz.book.common.BaseEntity;
import com.mstramohz.book.feedback.Feedback;
import com.mstramohz.book.history.BookTransactionHistory;
import com.mstramohz.book.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@Setter
@Entity
@SuperBuilder
@AllArgsConstructor
public class Book extends BaseEntity {
    private String title;

    private String authorName;

    private String isbn;

    private String synopsis;

    private String bookCover;

    private Boolean archived;

    private Boolean shareable;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    @OneToMany(mappedBy = "book")
    private List<Feedback> feedbacks;

    @OneToMany(mappedBy = "book")
    private List<BookTransactionHistory> histories;

    public Book () {}

    @Transient
    public double getRate() {
        if (feedbacks == null || feedbacks.isEmpty()) return 0.0;
        var rate = this.feedbacks.stream()
                .mapToDouble(Feedback::getNote)
                .average()
                .orElse(0.0);
        return Math.round(rate * 10.0) / 10.0;
    }
}
