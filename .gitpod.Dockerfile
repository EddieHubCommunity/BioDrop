FROM gitpod/workspace-mongodb:latest
RUN sudo npx playwright install --with-deps chromium
