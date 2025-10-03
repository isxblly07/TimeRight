package com.itb.inf2fm.timeright.config;

import com.itb.inf2fm.timeright.model.entity.Usuario;
import com.itb.inf2fm.timeright.model.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private UsuarioService usuarioService;
    
    @Override
    public void run(String... args) throws Exception {
        if (!usuarioService.existePorEmail("admin@timeright.com")) {
            Usuario admin = new Usuario("Administrador", "admin@timeright.com", "admin123");
            usuarioService.salvar(admin);
            System.out.println("Usuário admin criado: admin@timeright.com / admin123");
        }
    }
}