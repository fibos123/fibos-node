FROM tpblock/fibos-node:v5.0.3.0

WORKDIR /app

ADD index.js .
ADD start-snapshot.sh .

ENTRYPOINT ["/app/start-snapshot.sh"]
