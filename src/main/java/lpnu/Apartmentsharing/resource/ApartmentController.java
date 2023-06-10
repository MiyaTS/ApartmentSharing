package lpnu.Apartmentsharing.resource;

import lpnu.Apartmentsharing.entity.Apartment;
import lpnu.Apartmentsharing.service.ApartmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/apartments")
public class ApartmentController {
    private final ApartmentService apartmentService;

    public ApartmentController(ApartmentService apartmentService) {
        this.apartmentService = apartmentService;
    }

    @GetMapping("/user/{id}")
    @PreAuthorize("hasAuthority('user:read')")
    public ResponseEntity<List<Apartment>> findApartmentByCriteria(@PathVariable("id") Long id) {
        System.out.println(id);
            List<Apartment> toys = apartmentService.findAllApartmentsByUserId(id);
            return new ResponseEntity<>(toys, HttpStatus.OK);
    }

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('user:read')")
    public ResponseEntity<List<Apartment>> findAllApartments() {
        List<Apartment> toys = apartmentService.findAllApartments();
        return new ResponseEntity<>(toys, HttpStatus.OK);
    }

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('user:read')")
    public ResponseEntity<Apartment> addToy(@RequestBody Apartment apartment) {
        Apartment newApartment = apartmentService.addApartment(apartment);
        return new ResponseEntity<>(newApartment, HttpStatus.CREATED);

    }

    @PutMapping("/update")
    @PreAuthorize("hasAuthority('user:read')")
    public ResponseEntity<Apartment> updateComputer(@RequestBody Apartment apartment) {
        Apartment updatedApartment = apartmentService.updateApartment(apartment);
        return new ResponseEntity<>(updatedApartment, HttpStatus.OK);
    }

    @PutMapping("/report")
    @PreAuthorize("hasAuthority('user:read')")
    public ResponseEntity<Apartment> updateReport(@RequestBody Apartment apartment) {
        Apartment updatedApartment = apartmentService.updateApartment(apartment);
        return new ResponseEntity<>(updatedApartment, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('user:read')")
    public ResponseEntity<?> deleteToy(@PathVariable("id") Long id) {
        apartmentService.deleteApartment(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/search/{rooms}/{price}/{quarter}")
    @PreAuthorize("hasAuthority('user:read')")
    public ResponseEntity<List<Apartment>> findApartmentByCriteria(@PathVariable("rooms") Integer rooms, @PathVariable("price") Integer price,
                                                                   @PathVariable("quarter") String quarter) {
        List<Apartment> apartmentsByCriteria = apartmentService.findApartmentsByCriteria(rooms, price, quarter);
        return new ResponseEntity<>(apartmentsByCriteria, HttpStatus.OK);
    }
}
