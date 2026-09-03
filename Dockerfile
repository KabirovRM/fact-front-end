# === Build stage ===
FROM node:22-alpine as build

WORKDIR /app

# Копируем .npmrc для доступа к приватным пакетам
COPY .npmrc .npmrc
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build && rm -rf .npmrc

# === Final stage ===
FROM nginxinc/nginx-unprivileged:stable-alpine as final

# Копируем собранное приложение
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем nginx конфигурацию
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template

EXPOSE 8080
