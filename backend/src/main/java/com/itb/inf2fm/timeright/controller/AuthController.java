package com.itb.inf2fm.timeright.controller;

import com.itb.inf2fm.timeright.model.entity.Usuario;
import com.itb.inf2fm.timeright.model.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private UsuarioService usuarioService;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<Usuario> usuarioOpt = usuarioService.buscarPorEmail(request.getEmail());
        
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("erro", "Usuário não encontrado"));
        }
        
        Usuario usuario = usuarioOpt.get();
        
        if (!usuario.getSenha().equals(request.getSenha())) {
            return ResponseEntity.badRequest().body(Map.of("erro", "Senha incorreta"));
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("sucesso", true);
        response.put("usuario", Map.of(
            "id", usuario.getId(),
            "nome", usuario.getNome(),
            "email", usuario.getEmail()
        ));
        
        return ResponseEntity.ok(response);
    }
    
    public static class LoginRequest {
        private String email;
        private String senha;
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        
        public String getSenha() { return senha; }
        public void setSenha(String senha) { this.senha = senha; }
    }
}