package com.timeright.controller;

import com.timeright.model.Usuario;
import com.timeright.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

/**
 * CONTROLADOR DE AUTENTICAÇÃO - GERENCIA LOGIN E CADASTRO
 * 
 * Esta classe recebe as requisições HTTP do frontend e processa
 * as operações de login e cadastro de usuários.
 * 
 * Para TCC: O Controller é a camada que recebe as requisições
 * do frontend e retorna as respostas (API REST).
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")  // Permite acesso do frontend
public class AuthController {
    
    @Autowired  // Injeção de dependência - Spring cria automaticamente
    private UsuarioRepository usuarioRepository;
    
    /**
     * ENDPOINT DE LOGIN
     * POST /api/auth/login
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // Busca usuário por email
        Optional<Usuario> usuario = usuarioRepository.findByEmail(request.getEmail());
        
        if (usuario.isPresent() && usuario.get().getSenha().equals(request.getSenha())) {
            // Login bem-sucedido
            return ResponseEntity.ok(new LoginResponse("Login realizado com sucesso!", usuario.get()));
        } else {
            // Login falhou
            return ResponseEntity.badRequest().body(new ErrorResponse("Email ou senha inválidos"));
        }
    }
    
    /**
     * ENDPOINT PARA BUSCAR DADOS DO USUÁRIO LOGADO
     * GET /api/auth/me
     */
    @GetMapping("/me")
    public ResponseEntity<?> me(@RequestParam String email) {
        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);
        
        if (usuario.isPresent()) {
            return ResponseEntity.ok(usuario.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // CLASSES AUXILIARES PARA REQUISIÇÕES E RESPOSTAS
    public static class LoginRequest {
        private String email;
        private String senha;
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        
        public String getSenha() { return senha; }
        public void setSenha(String senha) { this.senha = senha; }
    }
    
    public static class LoginResponse {
        private String message;
        private Usuario usuario;
        
        public LoginResponse(String message, Usuario usuario) {
            this.message = message;
            this.usuario = usuario;
        }
        
        public String getMessage() { return message; }
        public Usuario getUsuario() { return usuario; }
    }
    
    public static class ErrorResponse {
        private String error;
        
        public ErrorResponse(String error) {
            this.error = error;
        }
        
        public String getError() { return error; }
    }
}