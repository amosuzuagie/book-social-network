package com.mstramohz.book.handler;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@Getter
public enum BusinessErrorCodes {
    NO_CODE(0, NOT_IMPLEMENTED, "No code."),
    INCORRECT_PASSWORD(300, BAD_REQUEST, "Password is incorrect."),
    NEW_PASSWORD_DOES_NOT_MATCH(301, BAD_REQUEST, "New password does not match."),
    ACCOUNT_LOCKED(302, FORBIDDEN, "User account is locked."),
    ACCOUNT_DISABLED(302, FORBIDDEN, "User account is disabled."),
    BAD_CREDENTIALS(304, FORBIDDEN, "Incorrect email and, or password.")
    ;

    private final int code;
    private final String description;
    private final HttpStatus httpStatus;

    BusinessErrorCodes(int code, HttpStatus httpStatus, String description) {
        this.code = code;
        this.description = description;
        this.httpStatus = httpStatus;
    }
}
