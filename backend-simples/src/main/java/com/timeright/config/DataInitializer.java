package com.timeright.config;

import com.timeright.model.Usuario;
import com.timeright.model.Categoria;
import com.timeright.model.Profissional;
import com.timeright.repository.UsuarioRepository;
import com.timeright.repository.CategoriaRepository;
import com.timeright.repository.ProfissionalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * INICIALIZADOR DE DADOS - POPULA O BANCO COM DADOS INICIAIS
 * 
 * Esta classe é executada automaticamente quando a aplicação inicia
 * e cria dados básicos para demonstração.
 * 
 * Para TCC: Facilita a apresentação, pois já terá dados no sistema.
 */
@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private CategoriaRepository categoriaRepository;
    
    @Autowired
    private ProfissionalRepository profissionalRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // Criar usuário admin padrão
        if (usuarioRepository.count() == 0) {
            Usuario admin = new Usuario("Administrador", "admin@timeright.com", "admin123");
            usuarioRepository.save(admin);
            System.out.println("✅ Usuário admin criado: admin@timeright.com / admin123");
        }
        
        // Criar categorias de exemplo
        if (categoriaRepository.count() == 0) {
            categoriaRepository.save(new Categoria("Corte de Cabelo", "Corte masculino e feminino", 30.0));
            categoriaRepository.save(new Categoria("Manicure", "Cuidados com as unhas das mãos", 25.0));
            categoriaRepository.save(new Categoria("Pedicure", "Cuidados com as unhas dos pés", 30.0));
            categoriaRepository.save(new Categoria("Escova", "Escova e finalização", 40.0));
            categoriaRepository.save(new Categoria("Coloração", "Tintura e coloração capilar", 80.0));
            System.out.println("✅ Categorias de exemplo criadas");
        }
        
        // Criar profissionais de exemplo
        if (profissionalRepository.count() == 0) {
            profissionalRepository.save(new Profissional("Maria Silva", "Cabeleireira", "(11) 99999-1111"));
            profissionalRepository.save(new Profissional("João Santos", "Barbeiro", "(11) 99999-2222"));
            profissionalRepository.save(new Profissional("Ana Costa", "Manicure", "(11) 99999-3333"));
            profissionalRepository.save(new Profissional("Carlos Lima", "Cabeleireiro", "(11) 99999-4444"));
            System.out.println("✅ Profissionais de exemplo criados");
        }
        
        System.out.println("🎯 Sistema inicializado com dados de exemplo!");
    }
}