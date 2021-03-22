# emiru


![image](https://user-images.githubusercontent.com/394378/111996538-7836aa80-8b5d-11eb-94cc-3cd7c6164b9e.png)

つかってみる → https://emiru.pistatium.dev/


## 開発

### Twitter アプリの申請

Twitter の開発者登録をし、CONSUMER_KEY, CONSUMER_SECRETを得る。
また Callback として localhost:8888 を登録しておく。

### 環境変数のセット

```
export TWITTER_CONSUMER_KEY=
export TWITTER_CONSUMER_SECRET=
export LOCAL_PORT=8888
```

### 開発サーバーの立ち上げ

```
docker-compose up
```
