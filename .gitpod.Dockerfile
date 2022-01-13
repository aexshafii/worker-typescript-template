FROM gitpod/workspace-full

RUN sudo apt-get update \
 && sudo apt-get cowsay -y  