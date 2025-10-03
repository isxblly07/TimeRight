package com.itb.inf2fm.timeright.controller;

import com.itb.inf2fm.timeright.model.entity.Categoria;
import com.itb.inf2fm.timeright.model.services.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {
    
    @Autowired
    private CategoriaService categoriaService;
    
    @GetMapping
    public ResponseEntity<List<Categoria>> listarTodas() {
        List<Categoria> categorias = categoriaService.listarTodas();
        return ResponseEntity.ok(categorias);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Categoria> buscarPorId(@PathVariable Long id) {
        Optional<Categoria> categoria = categoriaService.buscarPorId(id);
        return categoria.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<?> criar(@Valid @RequestBody Categoria categoria) {
        if (categoriaService.existePorNome(categoria.getNome())) {
            return ResponseEntity.badRequest().body("Categoria já existe");
        }
        Categoria categoriaSalva = categoriaService.salvar(categoria);
        return ResponseEntity.ok(categoriaSalva);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @Valid @RequestBody Categoria categoria) {
        if (!categoriaService.buscarPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        categoria.setId(id);
        Categoria categoriaAtualizada = categoriaService.salvar(categoria);
        return ResponseEntity.ok(categoriaAtualizada);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        if (!categoriaService.buscarPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        categoriaService.deletar(id);
        return ResponseEntity.ok().build();
    }
}