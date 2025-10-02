package com.timeright.controller;

import com.timeright.model.Profissional;
import com.timeright.repository.ProfissionalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

/**
 * CONTROLADOR DE PROFISSIONAIS - GERENCIA OS FUNCIONÁRIOS
 */
@RestController
@RequestMapping("/api/professionals")
@CrossOrigin(origins = "http://localhost:5173")
public class ProfissionalController {
    
    @Autowired
    private ProfissionalRepository profissionalRepository;
    
    @GetMapping
    public List<Profissional> listarTodos() {
        return profissionalRepository.findAll();
    }
    
    @GetMapping("/ativos")
    public List<Profissional> listarAtivos() {
        return profissionalRepository.findByAtivoTrue();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Profissional> buscarPorId(@PathVariable Long id) {
        Optional<Profissional> profissional = profissionalRepository.findById(id);
        return profissional.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public Profissional criar(@RequestBody Profissional profissional) {
        return profissionalRepository.save(profissional);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Profissional> atualizar(@PathVariable Long id, @RequestBody Profissional profissionalAtualizado) {
        Optional<Profissional> profissionalExistente = profissionalRepository.findById(id);
        
        if (profissionalExistente.isPresent()) {
            Profissional profissional = profissionalExistente.get();
            profissional.setNome(profissionalAtualizado.getNome());
            profissional.setEspecialidade(profissionalAtualizado.getEspecialidade());
            profissional.setTelefone(profissionalAtualizado.getTelefone());
            profissional.setAtivo(profissionalAtualizado.getAtivo());
            
            return ResponseEntity.ok(profissionalRepository.save(profissional));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        Optional<Profissional> profissional = profissionalRepository.findById(id);
        
        if (profissional.isPresent()) {
            profissional.get().setAtivo(false);
            profissionalRepository.save(profissional.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}