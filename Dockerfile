# --- Estágio 1: Build ---
# Usamos uma imagem completa do Node para ter acesso ao npm e construir o projeto
FROM node:18-alpine AS builder

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de definição de dependências
COPY package*.json ./

# Instala apenas as dependências de produção de forma otimizada
RUN npm ci --only=production


# --- Estágio 2: Produção ---
# Usamos uma imagem "slim", que é muito menor e mais segura para rodar a aplicação
FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /app

# Define um usuário não-root para rodar a aplicação (boa prática de segurança)
USER node

# Copia as dependências já instaladas do estágio de "build"
COPY --chown=node:node --from=builder /app/node_modules ./node_modules

# Copia o código da aplicação
COPY --chown=node:node . .

# Expõe a porta que a nossa aplicação usa dentro do container
EXPOSE 3000

# Comando para iniciar a aplicação quando o container rodar
CMD [ "node", "index.js" ]