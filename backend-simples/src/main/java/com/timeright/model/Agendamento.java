package com.timeright.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

/**
 * ENTIDADE AGENDAMENTO - REPRESENTA OS AGENDAMENTOS DOS CLIENTES
 * 
 * Esta é a entidade principal do sistema, onde ficam registrados
 * todos os agendamentos feitos pelos clientes.
 * 
 * Para TCC: Esta classe representa a regra de negócio principal
 * do sistema - o agendamento de serviços.
 */
@Entity
@Table(name = "agendamentos")
public class Agendamento {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Nome do cliente é obrigatório")
    private String nomeCliente;
    
    @NotBlank(message = "Telefone do cliente é obrigatório")
    private String telefoneCliente;
    
    @NotNull(message = "Data e hora são obrigatórias")
    private LocalDateTime dataHora;
    
    // RELACIONAMENTOS COM OUTRAS TABELAS
    @ManyToOne  // Muitos agendamentos para uma categoria
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;
    
    @ManyToOne  // Muitos agendamentos para um profissional
    @JoinColumn(name = "profissional_id")
    private Profissional profissional;
    
    private String observacoes;  // Observações do cliente
    
    private String status = "AGENDADO";  // AGENDADO, CONCLUIDO, CANCELADO
    
    private LocalDateTime criadoEm = LocalDateTime.now();
    
    // CONSTRUTORES
    public Agendamento() {}
    
    public Agendamento(String nomeCliente, String telefoneCliente, LocalDateTime dataHora) {
        this.nomeCliente = nomeCliente;
        this.telefoneCliente = telefoneCliente;
        this.dataHora = dataHora;
    }
    
    // GETTERS E SETTERS
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getNomeCliente() { return nomeCliente; }
    public void setNomeCliente(String nomeCliente) { this.nomeCliente = nomeCliente; }
    
    public String getTelefoneCliente() { return telefoneCliente; }
    public void setTelefoneCliente(String telefoneCliente) { this.telefoneCliente = telefoneCliente; }
    
    public LocalDateTime getDataHora() { return dataHora; }
    public void setDataHora(LocalDateTime dataHora) { this.dataHora = dataHora; }
    
    public Categoria getCategoria() { return categoria; }
    public void setCategoria(Categoria categoria) { this.categoria = categoria; }
    
    public Profissional getProfissional() { return profissional; }
    public void setProfissional(Profissional profissional) { this.profissional = profissional; }
    
    public String getObservacoes() { return observacoes; }
    public void setObservacoes(String observacoes) { this.observacoes = observacoes; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public LocalDateTime getCriadoEm() { return criadoEm; }
    public void setCriadoEm(LocalDateTime criadoEm) { this.criadoEm = criadoEm; }
}