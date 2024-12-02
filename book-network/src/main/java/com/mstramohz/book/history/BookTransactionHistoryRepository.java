package com.mstramohz.book.history;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface BookTransactionHistoryRepository extends JpaRepository<BookTransactionHistory, Integer> {
    @Query("""
            SELECT history
            FROM BookTransactionHistory history
            WHERE history.user.id = :userId
            """)
    Page<BookTransactionHistory> findAllBorrowedBooks(Pageable pageable, Integer userId);

    @Query("""
            SELECT history
            FROM BookTransactionHistory history
            WHERE history.book.owner.id = :userId
            """)
    Page<BookTransactionHistory> findAllReturnedBooks(Pageable pageable, Integer userId);

    @Query("""
            SELECT
            (COUNT(*) > 0) AS isBorrowed
            FROM BookTransactionHistory bth
            WHERE bth.user.id = :userId
            AND bth.book.id = :bookId
            AND bth.returnApproved = false
            """)
    boolean isAlreadyBorrowed(Integer bookId, Integer userId);

    @Query("""
            SELECT transaction
            FROM BookTransactionHistory  transaction
            WHERE transaction.user.id = :userId
            AND transaction.book.id = :bookId
            AND transaction.returned = false
            AND transaction.returnApproved = false
            """)
    Optional<BookTransactionHistory> findByBookAndUserId(Integer bookId, Integer userId);

    @Query("""
            SELECT transaction
            FROM BookTransactionHistory transaction
            WHERE transaction.book.owner.id = :ownerId
            AND transaction.book.id = :bookId
            AND transaction.returned = true
            AND transaction.returnApproved = false
            """)
Optional<BookTransactionHistory> findByBookAndOwnerId(@Param("ownerId") Integer ownerId, @Param("bookId") Integer bookId);

}
