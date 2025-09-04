package com.lilyjykim.backend.repository;

import com.lilyjykim.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    // 추가로 필요하면 메서드 정의 가능
}
