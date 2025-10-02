package com.timeright.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

/**
 * ENTIDADE PROFISSIONAL - REPRESENTA OS FUNCIONÁRIOS DO SALÃO
 * 
 * Cada profissional pode realizar diferentes tipos de serviços.
 * 
 * Para TCC: Esta classe representa os profissionais que trabalham
 * no salão e podem ser agendados pelos clientes.
 */
@Entity
@Table(name = "profissionais")
public class Profissional {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Nome do profissional é obrigatório")
    private String nome;
    
    private String especialidade;  // Ex: Cabeleireiro, Manicure, etc.
    
    private String telefone;
    
    private Boolean ativo = true;
    
    // CONSTRUTORES
    public Profissional() {}
    
    public Profissional(String nome, String especialidade, String telefone) {
        this.nome = nome;
        this.especialidade = especialidade;
        this.telefone = telefone;
    }
    
    // GETTERS E SETTERS
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    
    public String getEspecialidade() { return especialidade; }
    public void setEspecialidade(String especialidade) { this.especialidade = especialidade; }
    
    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }
    
    public Boolean getAtivo() { return ativo; }
    public void setAtivo(Boolean ativo) { this.ativo = ativo; }
}