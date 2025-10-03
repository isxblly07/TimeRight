package com.itb.inf2fm.timeright.controller;

import com.itb.inf2fm.timeright.model.entity.Servico;
import com.itb.inf2fm.timeright.model.services.ServicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/servicos")
public class ServicoController {
    
    @Autowired
    private ServicoService servicoService;
    
    @GetMapping
    public ResponseEntity<List<Servico>> listarTodos() {
        List<Servico> servicos = servicoService.listarTodos();
        return ResponseEntity.ok(servicos);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Servico> buscarPorId(@PathVariable Long id) {
        Optional<Servico> servico = servicoService.buscarPorId(id);
        return servico.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/categoria/{categoriaId}")
    public ResponseEntity<List<Servico>> listarPorCategoria(@PathVariable Long categoriaId) {
        List<Servico> servicos = servicoService.listarPorCategoria(categoriaId);
        return ResponseEntity.ok(servicos);
    }
    
    @PostMapping
    public ResponseEntity<Servico> criar(@Valid @RequestBody Servico servico) {
        Servico servicoSalvo = servicoService.salvar(servico);
        return ResponseEntity.ok(servicoSalvo);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @Valid @RequestBody Servico servico) {
        if (!servicoService.buscarPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        servico.setId(id);
        Servico servicoAtualizado = servicoService.salvar(servico);
        return ResponseEntity.ok(servicoAtualizado);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        if (!servicoService.buscarPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        servicoService.deletar(id);
        return ResponseEntity.ok().build();
    }
}