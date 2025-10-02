package com.timeright.repository;

import com.timeright.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * REPOSITÓRIO USUÁRIO - INTERFACE PARA ACESSAR O BANCO DE DADOS
 * 
 * Esta interface herda do JpaRepository, que já tem todos os métodos
 * básicos para trabalhar com banco (salvar, buscar, deletar, etc.).
 * 
 * Para TCC: O Repository é a camada que faz a comunicação com o banco.
 * É aqui que definimos as consultas personalizadas.
 */
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    // MÉTODO PERSONALIZADO: buscar usuário por email
    // O Spring cria automaticamente a implementação baseada no nome do método
    Optional<Usuario> findByEmail(String email);
    
    // MÉTODO PERSONALIZADO: verificar se email já existe
    boolean existsByEmail(String email);
}