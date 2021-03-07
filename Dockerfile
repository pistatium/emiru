FROM node:alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY front/package.json front/package-lock.json ./
RUN npm ci


FROM node:alpine AS front_builder
WORKDIR /app
COPY front .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build & npm run export


FROM golang:1.13 as builder
WORKDIR /app
ENV GO111MODULE=on
RUN groupadd -g 10001 emiru && useradd -u 10001 -g emiru emiru
COPY server/go.mod server/go.sum ./
RUN go mod download
COPY ./server .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o /go/bin/app


FROM scratch
COPY --from=front_builder /app/out /app/statics
COPY --from=builder /go/bin/app /go/bin/app
COPY --from=builder /etc/group /etc/group
COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt
EXPOSE 8080
USER emiru
ENV STATIC_DIR=/app/statics
ENTRYPOINT ["/go/bin/app"]
