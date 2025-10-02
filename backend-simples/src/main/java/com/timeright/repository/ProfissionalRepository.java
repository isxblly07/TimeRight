package com.timeright.repository;

import com.timeright.model.Profissional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * REPOSITÓRIO PROFISSIONAL - ACESSO AOS DADOS DE PROFISSIONAIS
 */
@Repository
public interface ProfissionalRepository extends JpaRepository<Profissional, Long> {
    
    // Buscar apenas profissionais ativos
    List<Profissional> findByAtivoTrue();
    
    // Buscar profissionais por especialidade
    List<Profissional> findByEspecialidade(String especialidade);
}