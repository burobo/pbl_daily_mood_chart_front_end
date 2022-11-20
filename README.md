### デプロイ方法

#### nuxiでビルド
```
docker-compose exec app sh
nuxi build
```

#### samでデプロイ
```
cd dmc-front-sam-app
cp -r ../src/.output ./nuxt-output
sam build
sam deploy
```
