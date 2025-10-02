package com.timeright.repository;

import com.timeright.model.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

/**
 * REPOSITÓRIO AGENDAMENTO - ACESSO AOS DADOS DE AGENDAMENTOS
 */
@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
    
    // Buscar agendamentos por status
    List<Agendamento> findByStatus(String status);
    
    // Buscar agendamentos de hoje
    @Query("SELECT a FROM Agendamento a WHERE DATE(a.dataHora) = CURRENT_DATE ORDER BY a.dataHora")
    List<Agendamento> findAgendamentosHoje();
    
    // Buscar agendamentos por profissional
    List<Agendamento> findByProfissionalId(Long profissionalId);
    
    // Buscar agendamentos entre datas
    List<Agendamento> findByDataHoraBetween(LocalDateTime inicio, LocalDateTime fim);
}