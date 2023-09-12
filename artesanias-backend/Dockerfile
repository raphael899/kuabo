# Usa una imagen base de Node.js
FROM node:19.3

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Instala ts-node de manera global
RUN npm install -g ts-node

# Copia los archivos específicos de la aplicación
COPY public ./public
COPY src ./src
COPY .env ./

# Expone el puerto en el que tu aplicación se ejecutará
EXPOSE 3000

# Comando para ejecutar tu aplicación
CMD ["npm", "start"]
