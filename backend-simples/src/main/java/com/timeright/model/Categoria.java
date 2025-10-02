package com.timeright.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

/**
 * ENTIDADE CATEGORIA - REPRESENTA OS TIPOS DE SERVIÇOS
 * 
 * Exemplo: Corte de Cabelo, Manicure, Pedicure, etc.
 * 
 * Para TCC: Esta classe representa as categorias de serviços
 * oferecidos pelo salão de beleza.
 */
@Entity
@Table(name = "categorias")
public class Categoria {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Nome da categoria é obrigatório")
    private String nome;
    
    private String descricao;  // Descrição opcional da categoria
    
    private Double preco;  // Preço base do serviço
    
    private Boolean ativo = true;
    
    // CONSTRUTORES
    public Categoria() {}
    
    public Categoria(String nome, String descricao, Double preco) {
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
    }
    
    // GETTERS E SETTERS
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    
    public Double getPreco() { return preco; }
    public void setPreco(Double preco) { this.preco = preco; }
    
    public Boolean getAtivo() { return ativo; }
    public void setAtivo(Boolean ativo) { this.ativo = ativo; }
}