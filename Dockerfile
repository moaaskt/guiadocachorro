# Usamos a versão LTS do Node
FROM node:20-alpine

WORKDIR /app

# Copiamos apenas os arquivos de dependências primeiro (otimiza o cache)
COPY package*.json ./

# Instalamos as dependências
RUN npm install

# Copiamos o restante do código
COPY . .

# Expomos a porta do Next.js
EXPOSE 3000

# Rodamos o comando de desenvolvimento
CMD ["npm", "run", "dev"]