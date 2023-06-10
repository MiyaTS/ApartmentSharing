package lpnu.Apartmentsharing.service;

import lpnu.Apartmentsharing.entity.Apartment;
import lpnu.Apartmentsharing.exception.ApartmentNotFoundException;
import lpnu.Apartmentsharing.repo.ApartmentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class ApartmentService {
    ApartmentRepository apartmentRepository;

    public Apartment findApartmentById(Long id) {
        return apartmentRepository.findApartmentById(id)
                .orElseThrow(() -> new ApartmentNotFoundException("Computer was not found with id: " + id));
    }

    public List<Apartment> findApartmentsByCriteria(Integer rooms, Integer price, String quarter) {
        return apartmentRepository.findByRoomsAndPriceLessThanEqualAndQuarter(rooms, price, quarter);
    }

    public List<Apartment> findAllApartments() {
        return apartmentRepository.findAll();
    }

    public List<Apartment> findAllApartmentsByUserId(Long id) {
        return apartmentRepository.findApartmentsByPurchaserId(id);
    }

    public Apartment addApartment(Apartment apartment) {
        return apartmentRepository.save(apartment);
    }

    public Apartment updateApartment(Apartment apartment) {
        return apartmentRepository.save(apartment);
    }

    public Long deleteApartment(Long id) {
        return apartmentRepository.deleteApartmentById(id).orElseThrow(() -> new ApartmentNotFoundException("Cannot delete apartment with id: "  + id
        + ", because there is no such id"));
    }

}
