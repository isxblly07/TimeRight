package com.itb.inf2fm.timeright.model.repository;

import com.itb.inf2fm.timeright.model.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    
    List<Categoria> findAllByOrderByNomeAsc();
    
    boolean existsByNomeIgnoreCase(String nome);
}