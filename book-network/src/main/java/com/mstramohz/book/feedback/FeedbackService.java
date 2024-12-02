package com.mstramohz.book.feedback;

import com.mstramohz.book.book.Book;
import com.mstramohz.book.book.BookRepository;
import com.mstramohz.book.common.PageResponse;
import com.mstramohz.book.exception.OperationNotPermittedException;
import com.mstramohz.book.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class FeedbackService {
    private final BookRepository bookRepository;
    private final FeedbackMapper feedbackMapper;
    private final FeedbackRepository feedbackRepository;

    public Integer save(FeedbackRequest request, Authentication connectedUser) {

        Book book = bookRepository.findById(request.bookId())
                .orElseThrow(()-> new EntityNotFoundException("No book found with ID:: " + request.bookId()));
        if (book.getArchived() || !book.getShareable())
            throw new OperationNotPermittedException("Book is either archived or not shareable.");
        User user = ((User) connectedUser.getPrincipal());
        if (Objects.equals(book.getOwner().getId(), user.getId()))
            throw new OperationNotPermittedException("You cannot give a feedback on your book");
        Feedback feedback = feedbackMapper.toFeedback(request);

        return feedbackRepository.save(feedback).getId();
    }

    public PageResponse<FeedbackResponse> findAllFeedbackByBook(Integer bookId, int page, int size, Authentication connectedUser) {
        Pageable pageable = PageRequest.of(page, size);
        User user = ((User) connectedUser.getPrincipal());
        Page<Feedback> feedbacks = feedbackRepository.findAllFeedbackByBookId(bookId, pageable);
        List<FeedbackResponse> feedbackResponse = feedbacks.stream()
                .map(f -> feedbackMapper.toFeedbackResponse(f, user.getId()))
                .toList();
        return new PageResponse<>(
                feedbackResponse,
                feedbacks.getNumber(),
                feedbacks.getSize(),
                feedbacks.getTotalElements(),
                feedbacks.getTotalPages(),
                feedbacks.isFirst(),
                feedbacks.isLast()
        );
    }
}
