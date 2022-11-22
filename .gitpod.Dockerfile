FROM gitpod/workspace-mongodb
RUN npx playwright install --with-deps chromium
