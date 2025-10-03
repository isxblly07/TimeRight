package com.itb.inf2fm.timeright.controller;

import com.itb.inf2fm.timeright.model.entity.Agendamento;
import com.itb.inf2fm.timeright.model.services.AgendamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/agendamentos")
public class AgendamentoController {
    
    @Autowired
    private AgendamentoService agendamentoService;
    
    @GetMapping
    public ResponseEntity<List<Agendamento>> listarTodos() {
        List<Agendamento> agendamentos = agendamentoService.listarTodos();
        return ResponseEntity.ok(agendamentos);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Agendamento> buscarPorId(@PathVariable Long id) {
        Optional<Agendamento> agendamento = agendamentoService.buscarPorId(id);
        return agendamento.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/hoje")
    public ResponseEntity<List<Agendamento>> listarHoje() {
        List<Agendamento> agendamentos = agendamentoService.listarAgendamentosHoje();
        return ResponseEntity.ok(agendamentos);
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Agendamento>> listarPorStatus(@PathVariable String status) {
        try {
            Agendamento.StatusAgendamento statusEnum = Agendamento.StatusAgendamento.valueOf(status.toUpperCase());
            List<Agendamento> agendamentos = agendamentoService.listarPorStatus(statusEnum);
            return ResponseEntity.ok(agendamentos);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping
    public ResponseEntity<?> criar(@Valid @RequestBody Agendamento agendamento) {
        if (agendamento.getDataHora().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Não é possível agendar no passado");
        }
        Agendamento agendamentoSalvo = agendamentoService.salvar(agendamento);
        return ResponseEntity.ok(agendamentoSalvo);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @Valid @RequestBody Agendamento agendamento) {
        if (!agendamentoService.buscarPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        agendamento.setId(id);
        Agendamento agendamentoAtualizado = agendamentoService.salvar(agendamento);
        return ResponseEntity.ok(agendamentoAtualizado);
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<?> atualizarStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        Optional<Agendamento> agendamentoOpt = agendamentoService.buscarPorId(id);
        if (!agendamentoOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        try {
            Agendamento agendamento = agendamentoOpt.get();
            String novoStatus = request.get("status");
            Agendamento.StatusAgendamento statusEnum = Agendamento.StatusAgendamento.valueOf(novoStatus.toUpperCase());
            agendamento.setStatus(statusEnum);
            
            Agendamento agendamentoAtualizado = agendamentoService.salvar(agendamento);
            return ResponseEntity.ok(agendamentoAtualizado);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Status inválido");
        }
    }
    
    @GetMapping("/estatisticas")
    public ResponseEntity<Map<String, Object>> obterEstatisticas() {
        Map<String, Object> estatisticas = new HashMap<>();
        estatisticas.put("total", agendamentoService.listarTodos().size());
        estatisticas.put("agendados", agendamentoService.contarPorStatus(Agendamento.StatusAgendamento.AGENDADO));
        estatisticas.put("confirmados", agendamentoService.contarPorStatus(Agendamento.StatusAgendamento.CONFIRMADO));
        estatisticas.put("realizados", agendamentoService.contarPorStatus(Agendamento.StatusAgendamento.REALIZADO));
        estatisticas.put("cancelados", agendamentoService.contarPorStatus(Agendamento.StatusAgendamento.CANCELADO));
        
        return ResponseEntity.ok(estatisticas);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        if (!agendamentoService.buscarPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        agendamentoService.deletar(id);
        return ResponseEntity.ok().build();
    }
}