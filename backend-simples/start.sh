#!/bin/bash

# Script para iniciar o backend simplificado do Time Right
# Para TCC - Ensino Médio Técnico

echo "🚀 Iniciando Time Right Backend Simplificado..."
echo ""
echo "📋 Verificando pré-requisitos..."

# Verificar se Java está instalado
if ! command -v java &> /dev/null; then
    echo "❌ Java não encontrado. Instale Java 17+ para continuar."
    exit 1
fi

# Verificar se Maven está instalado
if ! command -v mvn &> /dev/null; then
    echo "❌ Maven não encontrado. Instale Maven 3.6+ para continuar."
    exit 1
fi

echo "✅ Java e Maven encontrados!"
echo ""
echo "🔧 Compilando e iniciando aplicação..."
echo ""

# Executar a aplicação
mvn spring-boot:run

echo ""
echo "🎯 Para acessar:"
echo "   API: http://localhost:8080/api"
echo "   Console H2: http://localhost:8080/h2-console"
echo ""
echo "🔐 Login padrão:"
echo "   Email: admin@timeright.com"
echo "   Senha: admin123"