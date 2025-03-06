FROM golang:1.24

WORKDIR /app

COPY go.mod go.sum .
RUN go mod download

COPY *.go .

RUN CGO_ENABLED=0 GOOS=linux go build -o /server

EXPOSE 8090

CMD ["/server", "serve", "--http=0.0.0.0:8090"]
