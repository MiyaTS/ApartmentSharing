package lpnu.Apartmentsharing.entity.enums;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String address;
    private String imageURL;
    private String userRole;

    public UserDTO(Long id, String username, String email, String firstName, String lastName, String address, String imageURL, UserRoles userRole) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.imageURL = imageURL;
        this.userRole = userRole.name();
    }
}
