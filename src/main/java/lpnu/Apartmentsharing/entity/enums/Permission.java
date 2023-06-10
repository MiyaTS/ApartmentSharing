package lpnu.Apartmentsharing.entity.enums;

public enum Permission {
    USER_READ("user:read"),
    USER_WRITE("user:write"),
    USER_CREATE("user:create");

    private final String permission;

    Permission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
