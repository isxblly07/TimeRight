package com.timeright.repository;

import com.timeright.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * REPOSITÓRIO CATEGORIA - ACESSO AOS DADOS DE CATEGORIAS
 */
@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    
    // Buscar apenas categorias ativas
    List<Categoria> findByAtivoTrue();
    
    // Buscar categoria por nome
    Categoria findByNome(String nome);
}