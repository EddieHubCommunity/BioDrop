FROM gitpod/workspace-mongodb:latest
RUN npx playwright install --with-deps chromium
