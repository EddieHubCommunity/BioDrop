FROM gitpod/workspace-node-lts
RUN npx playwright install --with-deps chromium
