package com.timeright.controller;

import com.timeright.repository.AgendamentoRepository;
import com.timeright.repository.CategoriaRepository;
import com.timeright.repository.ProfissionalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

/**
 * CONTROLADOR DO DASHBOARD - ESTATÍSTICAS DO SISTEMA
 * 
 * Este controller fornece dados estatísticos para o painel administrativo.
 * 
 * Para TCC: Demonstra como criar relatórios simples e úteis.
 */
@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {
    
    @Autowired
    private AgendamentoRepository agendamentoRepository;
    
    @Autowired
    private CategoriaRepository categoriaRepository;
    
    @Autowired
    private ProfissionalRepository profissionalRepository;
    
    /**
     * ESTATÍSTICAS GERAIS DO SISTEMA
     * GET /api/dashboard/stats
     */
    @GetMapping("/stats")
    public Map<String, Object> estatisticas() {
        Map<String, Object> stats = new HashMap<>();
        
        // Contadores básicos
        stats.put("totalAgendamentos", agendamentoRepository.count());
        stats.put("totalCategorias", categoriaRepository.count());
        stats.put("totalProfissionais", profissionalRepository.count());
        
        // Agendamentos de hoje
        stats.put("agendamentosHoje", agendamentoRepository.findAgendamentosHoje().size());
        
        // Agendamentos por status
        stats.put("agendamentosAgendados", agendamentoRepository.findByStatus("AGENDADO").size());
        stats.put("agendamentosConcluidos", agendamentoRepository.findByStatus("CONCLUIDO").size());
        stats.put("agendamentosCancelados", agendamentoRepository.findByStatus("CANCELADO").size());
        
        return stats;
    }
}