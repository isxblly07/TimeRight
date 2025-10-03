package com.itb.inf2fm.timeright.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;

@Entity
@Table(name = "servicos")
public class Servico {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Nome do serviço é obrigatório")
    @Column(nullable = false)
    private String nome;
    
    @Column(length = 500)
    private String descricao;
    
    @NotNull(message = "Preço é obrigatório")
    @Positive(message = "Preço deve ser positivo")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal preco;
    
    @NotNull(message = "Duração é obrigatória")
    @Positive(message = "Duração deve ser positiva")
    @Column(name = "duracao_minutos", nullable = false)
    private Integer duracaoMinutos;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoria;
    
    // Construtor vazio
    public Servico() {}
    
    // Construtor com parâmetros
    public Servico(String nome, String descricao, BigDecimal preco, Integer duracaoMinutos, Categoria categoria) {
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.duracaoMinutos = duracaoMinutos;
        this.categoria = categoria;
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
    
    public BigDecimal getPreco() {
        return preco;
    }
    
    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }
    
    public Integer getDuracaoMinutos() {
        return duracaoMinutos;
    }
    
    public void setDuracaoMinutos(Integer duracaoMinutos) {
        this.duracaoMinutos = duracaoMinutos;
    }
    
    public Categoria getCategoria() {
        return categoria;
    }
    
    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }
}