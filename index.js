const express = require("express");
const app = express();
const ejs = require('ejs');
const Discord = require("discord.js");
const client = new Discord.Client();

let people = ['geddy', 'neil', 'alex'];

client.on("ready", async () => {
  console.log('[BOT] Iniciado');
  await client.user.setStatus("idle");
});

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', async (req, res) => {
  try {
    const rocks = await client.users.fetch("293941434610876416");
    const force = await client.users.fetch("148549182972624896");
    const revoltz = await client.users.fetch("280766532202528768");
    const nosol = await client.users.fetch("814220712398684261");
    const farias = await client.users.fetch("178509136164683776");
    const server = await client.guilds.fetch("1213614999444922448");
    // Passando as informações do Discord para o arquivo index.ejs
    res.render("index", { rocks, force, revoltz, nosol, farias, server, people });
  } catch (error) {
    console.error('Erro ao buscar informações do Discord:', error);
    res.status(500).send('Erro ao buscar informações do Discord.');
  }
});

app.use(function(req, res, next) {
  res.removeHeader("x-powered-by");
  next();
});

app.post("*", async (req, res) => {
  return res.send('nao');
});

app.get("*", async (req, res) => {
  res.status(404).redirect('https://discord.gg/8x');
});

client.login("MTIxMzYxNDczODE4NjA0NzUxOA.GFbBhz.yCirEmOLiGalyvqwYo5wReDZLBa8aR8HU21qic");

// Configurando o servidor para ouvir a porta process.env.PORT
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});

// 600000 milissegundos = 10 minutos
setTimeout(() => {
  console.log('Tempo limite atingido. Saindo...');
  server.close();
  process.exit();
}, 600000);
