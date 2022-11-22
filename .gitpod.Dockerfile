FROM gitpod/workspace-mongodb:latest
RUN apt-get update && npx playwright install-deps
