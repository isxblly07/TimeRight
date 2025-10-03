package com.itb.inf2fm.timeright.model.repository;

import com.itb.inf2fm.timeright.model.entity.Servico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ServicoRepository extends JpaRepository<Servico, Long> {
    
    List<Servico> findByCategoriaId(Long categoriaId);
    
    List<Servico> findAllByOrderByPrecoAsc();
}