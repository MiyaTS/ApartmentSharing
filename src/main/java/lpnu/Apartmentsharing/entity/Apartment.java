package lpnu.Apartmentsharing.entity;

import lpnu.Apartmentsharing.entity.enums.Status;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "apartments")
public class Apartment implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "apartment_id",nullable = false, updatable = false)
    private Long id;

    @Column(nullable = false)
    private Integer area;
    @Column(nullable = false)
    private String location;
    @Column(nullable = false)
    private String quarter;
    @Column(nullable = false)
    private Integer floor;
    @Column(nullable = false)
    private Integer rooms;
    @Column(length = 1000)
    private String imageUrl;
    @Column(nullable = false)
    private Integer price;
    @Column
    private String reportMessage;
    @Column
    private Status status;
    @Column
    private Long purchaserId;
}
