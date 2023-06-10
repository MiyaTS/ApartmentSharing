package lpnu.Apartmentsharing.entity.enums;

import lpnu.Apartmentsharing.entity.enums.Permission;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public enum UserRoles {
    USER(Set.of(Permission.USER_READ)),
    MANAGER(Set.of(Permission.USER_READ, Permission.USER_WRITE)),
    ADMIN(Set.of(Permission.USER_READ, Permission.USER_WRITE, Permission.USER_CREATE));


    private final Set<Permission> userPermissions;

    UserRoles(Set<Permission> userPermissions) {
        this.userPermissions = userPermissions;
    }

    public Set<Permission> getPermissions() {
        return userPermissions;
    }

    public List<SimpleGrantedAuthority> getAuthorities() {
        return getPermissions().stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toList());
    }
}
