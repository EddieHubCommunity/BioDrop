FROM gitpod/workspace-mongodb:latest
RUN npx playwright install-deps chromium 
