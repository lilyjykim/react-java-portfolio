package com.lilyjykim.backend.controller;

import com.lilyjykim.backend.dto.UserRequestDTO;
import com.lilyjykim.backend.dto.UserResponseDTO;
import com.lilyjykim.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    // 사용자 생성
    @PostMapping
    public ResponseEntity<Long> createUser(@RequestBody UserRequestDTO dto) {
        Long id = userService.createUser(dto);
        return ResponseEntity.ok(id);
    }

    // 사용자 전체 조회
    @GetMapping
    public List<UserResponseDTO> getUsers() {
        return userService.getAllUsers();
    }

    // 사용자 단일 조회
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    // 사용자 정보 수정
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateUser(@PathVariable Long id, @RequestBody UserRequestDTO dto) {
        userService.updateUser(id, dto);
        return ResponseEntity.ok().build();
//        return ResponseEntity.noContent().build();
    }

    // 사용자 정보 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
