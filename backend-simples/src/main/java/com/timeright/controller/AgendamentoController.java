package com.timeright.controller;

import com.timeright.model.Agendamento;
import com.timeright.repository.AgendamentoRepository;
import com.timeright.repository.CategoriaRepository;
import com.timeright.repository.ProfissionalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

/**
 * CONTROLADOR DE AGENDAMENTOS - CORE DO SISTEMA
 * 
 * Este é o controlador mais importante do sistema, pois gerencia
 * a funcionalidade principal: os agendamentos.
 * 
 * Para TCC: Aqui está implementada a regra de negócio principal.
 */
@RestController
@RequestMapping("/api/agendamentos")
@CrossOrigin(origins = "http://localhost:5173")
public class AgendamentoController {
    
    @Autowired
    private AgendamentoRepository agendamentoRepository;
    
    @Autowired
    private CategoriaRepository categoriaRepository;
    
    @Autowired
    private ProfissionalRepository profissionalRepository;
    
    /**
     * LISTAR TODOS OS AGENDAMENTOS
     */
    @GetMapping
    public List<Agendamento> listarTodos() {
        return agendamentoRepository.findAll();
    }
    
    /**
     * LISTAR AGENDAMENTOS DE HOJE
     */
    @GetMapping("/hoje")
    public List<Agendamento> agendamentosHoje() {
        return agendamentoRepository.findAgendamentosHoje();
    }
    
    /**
     * BUSCAR AGENDAMENTO POR ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Agendamento> buscarPorId(@PathVariable Long id) {
        Optional<Agendamento> agendamento = agendamentoRepository.findById(id);
        return agendamento.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * CRIAR NOVO AGENDAMENTO
     */
    @PostMapping
    public ResponseEntity<?> criar(@RequestBody AgendamentoRequest request) {
        try {
            Agendamento agendamento = new Agendamento();
            agendamento.setNomeCliente(request.getNomeCliente());
            agendamento.setTelefoneCliente(request.getTelefoneCliente());
            agendamento.setDataHora(request.getDataHora());
            agendamento.setObservacoes(request.getObservacoes());
            
            // Buscar categoria e profissional
            if (request.getCategoriaId() != null) {
                categoriaRepository.findById(request.getCategoriaId())
                    .ifPresent(agendamento::setCategoria);
            }
            
            if (request.getProfissionalId() != null) {
                profissionalRepository.findById(request.getProfissionalId())
                    .ifPresent(agendamento::setProfissional);
            }
            
            Agendamento salvo = agendamentoRepository.save(agendamento);
            return ResponseEntity.ok(salvo);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao criar agendamento: " + e.getMessage());
        }
    }
    
    /**
     * ATUALIZAR STATUS DO AGENDAMENTO
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<?> atualizarStatus(@PathVariable Long id, @RequestBody StatusRequest request) {
        Optional<Agendamento> agendamento = agendamentoRepository.findById(id);
        
        if (agendamento.isPresent()) {
            agendamento.get().setStatus(request.getStatus());
            agendamentoRepository.save(agendamento.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // CLASSES AUXILIARES PARA REQUISIÇÕES
    public static class AgendamentoRequest {
        private String nomeCliente;
        private String telefoneCliente;
        private java.time.LocalDateTime dataHora;
        private Long categoriaId;
        private Long profissionalId;
        private String observacoes;
        
        // Getters e Setters
        public String getNomeCliente() { return nomeCliente; }
        public void setNomeCliente(String nomeCliente) { this.nomeCliente = nomeCliente; }
        
        public String getTelefoneCliente() { return telefoneCliente; }
        public void setTelefoneCliente(String telefoneCliente) { this.telefoneCliente = telefoneCliente; }
        
        public java.time.LocalDateTime getDataHora() { return dataHora; }
        public void setDataHora(java.time.LocalDateTime dataHora) { this.dataHora = dataHora; }
        
        public Long getCategoriaId() { return categoriaId; }
        public void setCategoriaId(Long categoriaId) { this.categoriaId = categoriaId; }
        
        public Long getProfissionalId() { return profissionalId; }
        public void setProfissionalId(Long profissionalId) { this.profissionalId = profissionalId; }
        
        public String getObservacoes() { return observacoes; }
        public void setObservacoes(String observacoes) { this.observacoes = observacoes; }
    }
    
    public static class StatusRequest {
        private String status;
        
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }
}