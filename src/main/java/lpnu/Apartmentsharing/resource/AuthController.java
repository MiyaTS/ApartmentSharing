package lpnu.Apartmentsharing.resource;

import lpnu.Apartmentsharing.entity.UserEntity;
import lpnu.Apartmentsharing.entity.enums.UserRoles;
import lpnu.Apartmentsharing.filter.JwtTokenProvider;
import lpnu.Apartmentsharing.payload.request.LoginRequest;
import lpnu.Apartmentsharing.payload.request.SignupRequest;
import lpnu.Apartmentsharing.payload.response.JwtResponse;
import lpnu.Apartmentsharing.payload.response.MessageResponse;
import lpnu.Apartmentsharing.repo.UserRepository;
import lpnu.Apartmentsharing.security.SecureUser;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {
    AuthenticationManager authenticationManager;
    UserRepository userRepository;
    PasswordEncoder encoder;
    JwtTokenProvider jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {


        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        SecureUser user = (SecureUser) authentication.getPrincipal();
        List<String> authorities = user.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        response.setHeader("Authorization", "Bearer " + jwt);
        return ResponseEntity.ok(new JwtResponse(jwt, user.getUsername(), user.getId(), authorities) );
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUserBySignUp( @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        // Create new user's account
        UserEntity user = new UserEntity(
                signUpRequest.getUsername(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getEmail(),
                signUpRequest.getFirstName(),
                signUpRequest.getLastName(),
                signUpRequest.getAddress(),
                signUpRequest.getImageURL(),
                UserRoles.USER
        );

/*        {
                "username": "test",
                "password": "123",
                "email": "test@123",
                "firstName": "Alan",
                "lastName": "Po"
        }*/

        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @PostMapping("/createUser")
    public ResponseEntity<?> registerUserByAdmin( @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        // Create new user's account
        UserEntity user = new UserEntity(
                signUpRequest.getUsername(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getEmail(),
                signUpRequest.getFirstName(),
                signUpRequest.getLastName(),
                signUpRequest.getAddress(),
                signUpRequest.getImageURL(),
                signUpRequest.getRole()
        );

/*        {
                "username": "test",
                "password": "123",
                "email": "test@123",
                "firstName": "Alan",
                "lastName": "Po"
                "role": "ADMIN"
        }*/

        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}
