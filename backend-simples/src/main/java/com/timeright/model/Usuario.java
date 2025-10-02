package com.timeright.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/**
 * ENTIDADE USUÁRIO - REPRESENTA A TABELA DE USUÁRIOS NO BANCO
 * 
 * Esta classe representa um usuário do sistema (admin).
 * Cada atributo vira uma coluna na tabela do banco de dados.
 * 
 * Para TCC: Esta é uma classe modelo (Model) que representa
 * os dados que serão salvos no banco de dados.
 */
@Entity  // Indica que esta classe é uma tabela no banco
@Table(name = "usuarios")  // Nome da tabela no banco
public class Usuario {
    
    @Id  // Chave primária
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto incremento
    private Long id;
    
    @NotBlank(message = "Nome é obrigatório")  // Validação: não pode ser vazio
    private String nome;
    
    @Email(message = "Email deve ser válido")  // Validação: formato de email
    @NotBlank(message = "Email é obrigatório")
    @Column(unique = true)  // Email único no banco
    private String email;
    
    @NotBlank(message = "Senha é obrigatória")
    private String senha;
    
    private Boolean ativo = true;  // Por padrão, usuário ativo
    
    // CONSTRUTORES
    public Usuario() {}  // Construtor vazio (obrigatório para JPA)
    
    public Usuario(String nome, String email, String senha) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }
    
    // GETTERS E SETTERS (métodos para acessar e modificar os dados)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
    
    public Boolean getAtivo() { return ativo; }
    public void setAtivo(Boolean ativo) { this.ativo = ativo; }
}