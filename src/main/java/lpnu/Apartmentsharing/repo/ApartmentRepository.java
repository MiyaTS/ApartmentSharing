package lpnu.Apartmentsharing.repo;

import lpnu.Apartmentsharing.entity.Apartment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApartmentRepository extends JpaRepository<Apartment, Long> {

    Optional<Apartment> findApartmentById(Long id);

    Optional<Long> deleteApartmentById(Long id);

    List<Apartment> findApartmentsByPurchaserId(Long id);

    List<Apartment> findByRoomsAndPriceLessThanEqualAndQuarter(Integer rooms, Integer price, String quarter);

}
