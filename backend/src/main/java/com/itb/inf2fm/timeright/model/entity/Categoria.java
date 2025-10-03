package com.itb.inf2fm.timeright.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Table(name = "categorias")
public class Categoria {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Nome da categoria é obrigatório")
    @Column(nullable = false)
    private String nome;
    
    @Column(length = 500)
    private String descricao;
    
    @OneToMany(mappedBy = "categoria", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Servico> servicos;
    
    // Construtor vazio
    public Categoria() {}
    
    // Construtor com parâmetros
    public Categoria(String nome, String descricao) {
        this.nome = nome;
        this.descricao = descricao;
    }
    
    // Getters e Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getNome() {
        return nome;
    }
    
    public void setNome(String nome) {
        this.nome = nome;
    }
    
    public String getDescricao() {
        return descricao;
    }
    
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
    
    public List<Servico> getServicos() {
        return servicos;
    }
    
    public void setServicos(List<Servico> servicos) {
        this.servicos = servicos;
    }
}