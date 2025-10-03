package com.itb.inf2fm.timeright.model.repository;

import com.itb.inf2fm.timeright.model.entity.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
    
    List<Agendamento> findByDataHoraBetweenOrderByDataHoraAsc(LocalDateTime inicio, LocalDateTime fim);
    
    List<Agendamento> findByStatusOrderByDataHoraAsc(Agendamento.StatusAgendamento status);
    
    long countByStatus(Agendamento.StatusAgendamento status);
    
    @Query("SELECT a FROM Agendamento a WHERE DATE(a.dataHora) = DATE(:data) ORDER BY a.dataHora")
    List<Agendamento> findAgendamentosDoDia(@Param("data") LocalDateTime data);
}