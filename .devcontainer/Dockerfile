
FROM mcr.microsoft.com/devcontainers/java:0-17

RUN <<-EOF
	set -x
	apt update
    apt-get install -y ca-certificates curl gnupg expect git make wget unzip vim
    mkdir -p /etc/apt/keyrings
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
    NODE_MAJOR=20
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
    apt update
    apt install nodejs -y
    npm install -g npm@10.2.5
EOF

RUN mkdir -p /usr/local/android-sdk-linux/cmdline-tools/latest
ENV ANDROID_HOME /usr/local/android-sdk-linux/cmdline-tools/latest
ENV PATH ${ANDROID_HOME}/tools:${ANDROID_HOME}/bin:$ANDROID_HOME/platform-tools:$PATH
ENV ANDROID_SDK_ROOT $ANDROID_SDK_HOME
ENV ANDROID_HOME $ANDROID_SDK_HOME
ENV ANDROID_SDK $ANDROID_SDK_HOME

# Set Debian to not prompt for user input during package installation
ENV DEBIAN_FRONTEND noninteractive

# Update package lists and install necessary packages
RUN apt update -yqq && \
    apt install -y \
      openssh-client \
      locales \
      libc6 libstdc++6 zlib1g libncurses5 build-essential libssl-dev ruby ruby-dev \
      libarchive-tools && \
    apt clean && \
    rm -rf /var/lib/apt/lists/*

# Set the locale to en_US.UTF-8
RUN localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8

# Set the system language to US English
ENV LANG en_US.UTF-8

# Download and untar Android SDK tools
RUN <<-EOF
    wget https://dl.google.com/android/repository/commandlinetools-linux-10406996_latest.zip -O tools.zip
    bsdtar xvf tools.zip --strip-components=1 -C /usr/local/android-sdk-linux/cmdline-tools/latest
    chown vscode:vscode -r /usr/local/android-sdk-linux/
    rm tools.zip
EOF

RUN <<-EOF
    sdkmanager --version
    sdkmanager --sdk_root=/usr/local/android-sdk-linux/latest "platform-tools" "platforms;android-33"
EOF
