package com.mstramohz.book.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AuthenticationRequest {
    @Email(message = "Email is not well formatted")
    @NotEmpty(message = "Email is mandatory")
    @NotBlank(message = "Email is mandatory")
    private String email;


   // @Pattern(regexp = "^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+=-{};:<>,./?]).{8,}$", message = "Password must have at least 8 characters, one digit, one upper/lowercase character and one special character")
    @NotEmpty(message = "Password is mandatory")
    @NotBlank(message = "Password is mandatory")
    private String password;
}
