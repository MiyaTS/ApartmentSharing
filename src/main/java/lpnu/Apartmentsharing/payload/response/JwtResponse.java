package lpnu.Apartmentsharing.payload.response;

import lombok.Data;

import java.util.List;

@Data
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private String username;
    private Long id;
    private List<String> authorities;

    public JwtResponse(String token, String username, Long id, List<String> authorities) {
        this.token = token;
        this.username = username;
        this.id = id;
        this.authorities = authorities;
    }
}
