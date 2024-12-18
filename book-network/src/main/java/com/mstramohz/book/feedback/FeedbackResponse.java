package com.mstramohz.book.feedback;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackResponse {

    private Double note;

    private String comment;

    private Boolean ownFeedback;

}
