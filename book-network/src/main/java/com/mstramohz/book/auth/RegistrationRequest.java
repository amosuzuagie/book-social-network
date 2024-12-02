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
public class RegistrationRequest {
    @NotEmpty(message = "Firstname is mandatory")
    @NotBlank(message = "Firstname is mandatory")
    private String firstname;

    @NotEmpty(message = "Lastname is mandatory")
    @NotBlank(message = "Lastname is mandatory")
    private String lastname;

    @Email(message = "Email is not well formatted")
    @NotEmpty(message = "Email is mandatory")
    @NotBlank(message = "Email is mandatory")
    private String email;

    @Pattern(regexp = ".{8,}", message = "Password must contain at least 8 characters.")
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z]).*$", message = "Password must contain at least one uppercase and lowercase letter.")
    @Pattern(regexp = ".*[^a-zA-Z0-9].*", message = "Password must contain at least one special character.")
    @Pattern(regexp = ".*\\d.*", message = "Password must contain at least one digit number")
    @NotBlank(message = "Password is mandatory")
    private String password;
}
