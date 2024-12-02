package com.mstramohz.book.book;

import lombok.*;

@Getter
@Builder
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BorrowedBooksResponse {

    private Integer id;

    private String title;

    private String authorName;

    private String isbn;

    private Double rate;

    private Boolean returned;

    private Boolean returnedApproved;

}
