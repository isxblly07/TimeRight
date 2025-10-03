package com.itb.inf2fm.timeright.controller;

import com.itb.inf2fm.timeright.model.entity.Usuario;
import com.itb.inf2fm.timeright.model.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    
    @Autowired
    private UsuarioService usuarioService;
    
    @GetMapping
    public ResponseEntity<List<Usuario>> listarTodos() {
        List<Usuario> usuarios = usuarioService.listarTodos();
        return ResponseEntity.ok(usuarios);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Long id) {
        Optional<Usuario> usuario = usuarioService.buscarPorId(id);
        return usuario.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<?> criar(@Valid @RequestBody Usuario usuario) {
        if (usuarioService.existePorEmail(usuario.getEmail())) {
            return ResponseEntity.badRequest().body("Email já cadastrado");
        }
        Usuario usuarioSalvo = usuarioService.salvar(usuario);
        return ResponseEntity.ok(usuarioSalvo);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @Valid @RequestBody Usuario usuario) {
        if (!usuarioService.buscarPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        usuario.setId(id);
        Usuario usuarioAtualizado = usuarioService.salvar(usuario);
        return ResponseEntity.ok(usuarioAtualizado);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        if (!usuarioService.buscarPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        usuarioService.deletar(id);
        return ResponseEntity.ok().build();
    }
}