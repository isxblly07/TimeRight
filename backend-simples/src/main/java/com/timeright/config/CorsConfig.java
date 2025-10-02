package com.timeright.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/**
 * CONFIGURAÇÃO DE CORS - PERMITE ACESSO DO FRONTEND
 * 
 * CORS (Cross-Origin Resource Sharing) é necessário para que
 * o frontend (localhost:5173) possa acessar o backend (localhost:8080).
 * 
 * Para TCC: Esta configuração é essencial para integrar frontend e backend.
 */
@Configuration
public class CorsConfig {
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Permite acesso do frontend
        configuration.addAllowedOrigin("http://localhost:5173");
        
        // Permite todos os métodos HTTP (GET, POST, PUT, DELETE)
        configuration.addAllowedMethod("*");
        
        // Permite todos os headers
        configuration.addAllowedHeader("*");
        
        // Permite credenciais
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        
        return source;
    }
}