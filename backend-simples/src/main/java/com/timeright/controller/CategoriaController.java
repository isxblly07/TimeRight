package com.timeright.controller;

import com.timeright.model.Categoria;
import com.timeright.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

/**
 * CONTROLADOR DE CATEGORIAS - GERENCIA OS SERVIÇOS DO SALÃO
 * 
 * Este controller implementa um CRUD completo (Create, Read, Update, Delete)
 * para as categorias de serviços.
 * 
 * Para TCC: Demonstra as operações básicas de um sistema web.
 */
@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoriaController {
    
    @Autowired
    private CategoriaRepository categoriaRepository;
    
    /**
     * LISTAR TODAS AS CATEGORIAS
     * GET /api/categories
     */
    @GetMapping
    public List<Categoria> listarTodas() {
        return categoriaRepository.findAll();
    }
    
    /**
     * LISTAR APENAS CATEGORIAS ATIVAS
     * GET /api/categories/ativas
     */
    @GetMapping("/ativas")
    public List<Categoria> listarAtivas() {
        return categoriaRepository.findByAtivoTrue();
    }
    
    /**
     * BUSCAR CATEGORIA POR ID
     * GET /api/categories/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<Categoria> buscarPorId(@PathVariable Long id) {
        Optional<Categoria> categoria = categoriaRepository.findById(id);
        
        if (categoria.isPresent()) {
            return ResponseEntity.ok(categoria.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * CRIAR NOVA CATEGORIA
     * POST /api/categories
     */
    @PostMapping
    public Categoria criar(@RequestBody Categoria categoria) {
        return categoriaRepository.save(categoria);
    }
    
    /**
     * ATUALIZAR CATEGORIA EXISTENTE
     * PUT /api/categories/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<Categoria> atualizar(@PathVariable Long id, @RequestBody Categoria categoriaAtualizada) {
        Optional<Categoria> categoriaExistente = categoriaRepository.findById(id);
        
        if (categoriaExistente.isPresent()) {
            Categoria categoria = categoriaExistente.get();
            categoria.setNome(categoriaAtualizada.getNome());
            categoria.setDescricao(categoriaAtualizada.getDescricao());
            categoria.setPreco(categoriaAtualizada.getPreco());
            categoria.setAtivo(categoriaAtualizada.getAtivo());
            
            return ResponseEntity.ok(categoriaRepository.save(categoria));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * DELETAR CATEGORIA (desativar)
     * DELETE /api/categories/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        Optional<Categoria> categoria = categoriaRepository.findById(id);
        
        if (categoria.isPresent()) {
            // Em vez de deletar, apenas desativa
            categoria.get().setAtivo(false);
            categoriaRepository.save(categoria.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}