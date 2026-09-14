#!/usr/bin/env bash
set -euo pipefail

# === Загрузка переменных из .env ===
if [ -f ".env" ]; then
  set -a
  source .env
  set +a
fi

# === Конфигурация ===
GITLAB_REGISTRY="registry.gitlab.com"
PROJECT_NAME="fact-frontend"
DOCKERFILE="Dockerfile"

# Теги образа
TAG_LATEST="${GITLAB_REGISTRY}/kabirovrm/fact-front-end/${PROJECT_NAME}:latest"
TAG_REF="${GITLAB_REGISTRY}/kabirovrm/fact-front-end/${PROJECT_NAME}:${IMAGE_TAG:-develop}"

# Создаём базовый .npmrc
cat > .npmrc <<EOF
@private:registry=https://repo.fact.digital/repository/npm-customize/
EOF

# Если есть username/password — добавляем Basic Auth
if [ -n "${NPM_REGISTRY_USER:-}" ] && [ -n "${NPM_REGISTRY_PASSWORD:-}" ]; then
  AUTH=$(printf '%s:%s' "${NPM_REGISTRY_USER}" "${NPM_REGISTRY_PASSWORD}" | base64)
  cat >> .npmrc <<EOF
//repo.fact.digital/repository/npm-customize/:_auth=${AUTH}
EOF
fi

echo "================================"
echo "  Build & Push Frontend Image"
echo "================================"
echo ""
echo "Target tags:"
echo "  - ${TAG_LATEST}"
echo "  - ${TAG_REF}"
echo ""

# Логин в GitLab Registry
echo "Logging in to ${GITLAB_REGISTRY}..."
docker login "${GITLAB_REGISTRY}" -u "${GITLAB_REGISTRY_USER}" -p "${GITLAB_REGISTRY_PASSWORD}"

# Сборка
echo ""
echo "Building image..."
docker build \
  -f "${DOCKERFILE}" \
  -t "${TAG_LATEST}" \
  -t "${TAG_REF}" \
  .

# Удаляем временный .npmrc
rm -f .npmrc

# Пуш
echo ""
echo "Pushing to GitLab Registry..."
docker push "${TAG_LATEST}"
docker push "${TAG_REF}"

echo ""
echo "Done!"
echo "Image: ${TAG_REF}"
echo ""
echo "To pull:"
echo "  docker pull ${TAG_REF}"
