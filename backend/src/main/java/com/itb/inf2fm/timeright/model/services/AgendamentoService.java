package com.itb.inf2fm.timeright.model.services;

import com.itb.inf2fm.timeright.model.entity.Agendamento;
import com.itb.inf2fm.timeright.model.repository.AgendamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AgendamentoService {
    
    @Autowired
    private AgendamentoRepository agendamentoRepository;
    
    public List<Agendamento> listarTodos() {
        return agendamentoRepository.findAll();
    }
    
    public List<Agendamento> listarPorStatus(Agendamento.StatusAgendamento status) {
        return agendamentoRepository.findByStatusOrderByDataHoraAsc(status);
    }
    
    public List<Agendamento> listarAgendamentosHoje() {
        LocalDateTime hoje = LocalDate.now().atStartOfDay();
        return agendamentoRepository.findAgendamentosDoDia(hoje);
    }
    
    public Optional<Agendamento> buscarPorId(Long id) {
        return agendamentoRepository.findById(id);
    }
    
    public Agendamento salvar(Agendamento agendamento) {
        return agendamentoRepository.save(agendamento);
    }
    
    public void deletar(Long id) {
        agendamentoRepository.deleteById(id);
    }
    
    public long contarPorStatus(Agendamento.StatusAgendamento status) {
        return agendamentoRepository.countByStatus(status);
    }
}