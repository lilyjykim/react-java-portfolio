package com.lilyjykim.backend.service;

import com.lilyjykim.backend.dto.UserRequestDTO;
import com.lilyjykim.backend.dto.UserResponseDTO;
import com.lilyjykim.backend.entity.User;
import com.lilyjykim.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private static final Logger log = LoggerFactory.getLogger(UserService.class);


    // 사용자 등록
    public Long createUser(UserRequestDTO dto) {
        User user = new User(dto.getName(),dto.getEmail(),dto.getPassword());
        return userRepository.save(user).getId();
    }

    // 사용자 전체 조회
    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> new UserResponseDTO(user.getId(),user.getName(),user.getEmail()))
                .collect(Collectors.toList());
    }

    // 사용자 단일 조회
    public UserResponseDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 업습니다."));
        return new UserResponseDTO(user.getId(),user.getName(),user.getEmail());
    }

    // 사용자 수정
    @Transactional
    public void updateUser(Long id, UserRequestDTO dto){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
//                .orElseThrow(()-> new IllegalArgumentException("사용자를 찾을 수 없습니다. ID : " + id ));

        user.update(dto.getName(),dto.getEmail(),dto.getPassword());

    }

    // 사용자 삭제
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                        .orElseThrow(()-> new IllegalArgumentException("User not found with id : " + id));

        userRepository.delete(user);
        log.info("User deleted with id : " + id);
    }


}
