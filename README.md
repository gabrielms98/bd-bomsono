# bd-bomsono

> Projeto da rede de Hoteis Bom Sono

#### Build Setup

``` bash
# install dependencies
npm install

# install sqlite3 module dependencies
electron-builder install-app-deps

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


```

### Conectando ao banco de dados MYSQL

``` bash
#servidor
iniciar o servidor mySQL

#alterar a variavel const sequelize
alterar na variavel com as informações do seu banco de dados criado localmente

#obs
se possivel criar o banco de dados com a mesma rota ja especificada para não causar
problema de conexão no desenvolvimento em conjunto

#tipo Sequelize
Sequelize('nome-bd', 'usuario', 'senha', {
  host: 'endereco-servidor',
  dialect: 'tipo-sv',
  port: 'porta',
  storage: 'path/to/database.db'
})

```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[8fae476](https://github.com/SimulatedGREG/electron-vue/tree/8fae4763e9d225d3691b627e83b9e09b56f6c935) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
