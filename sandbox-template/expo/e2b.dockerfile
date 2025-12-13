FROM node:20-slim

RUN apt-get update && apt-get install -y \
    git curl unzip netcat-openbsd \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN npm install -g @react-native-reusables/cli

# 🔑 CRITICAL FOR DOCKER
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0

WORKDIR /home/user/expo-app

RUN npx --yes create-expo-app@latest . --yes

RUN npm install @react-native-reusables/cli --save-dev
RUN npx @react-native-reusables/cli init --yes

# Move the expo app to the root directory
RUN mv /home/user/expo-app/* /home/user/ && rm -rf /home/user/expo-app

WORKDIR /home/user

COPY sandbox-template/expo/compile_page.sh /compile_page.sh
RUN chmod +x /compile_page.sh

EXPOSE 19006

CMD ["/compile_page.sh"]
