package com.timeright;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * CLASSE PRINCIPAL DO SISTEMA TIME RIGHT
 * 
 * Esta é a classe que inicia toda a aplicação Spring Boot.
 * É o ponto de entrada do sistema.
 * 
 * Para TCC: Esta anotação @SpringBootApplication faz toda a "mágica"
 * do Spring Boot, configurando automaticamente o que precisamos.
 */
@SpringBootApplication
public class TimeRightApplication {
    
    public static void main(String[] args) {
        // Inicia a aplicação Spring Boot
        SpringApplication.run(TimeRightApplication.class, args);
        System.out.println("🚀 Time Right Backend iniciado com sucesso!");
        System.out.println("📊 Console H2: http://localhost:8080/h2-console");
        System.out.println("🌐 API: http://localhost:8080/api");
    }
}