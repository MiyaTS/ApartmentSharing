package lpnu.Apartmentsharing.entity;

import lpnu.Apartmentsharing.entity.enums.UserRoles;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "user_entity")
public class UserEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private Long id;

    @Column
    private String username;
    @Column
    private String password;
    @Column
    private String email;
    @Column
    private String firstName;
    @Column
    private String lastName;
    @Column
    private String address;
    @Column
    private String imageURL;

    @Enumerated(EnumType.STRING)
    private UserRoles userRole;


    public UserEntity(String username, String password, String email, String firstName, String lastName, String address, String imageURL, UserRoles userRole) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.imageURL = imageURL;
        this.userRole = userRole;
    }
}
