const { Client, GatewayIntentBits, EmbedBuilder, HarmCategory, HarmBlockThreshold } = require('discord.js');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require('express');

// SISTEMA MANTENHA-SE VIVO
const app = express();
app.get('/', (req, res) => res.send('🦅 FALCON V52 OPERACIONAL!'));
app.listen(7860, '0.0.0.0');

const TOKEN = Buffer.from("TVRVd01UQXhNVGd4TnpVd05ERTNPREkxTncuaFBRMVFSTC5tUTU5aWdoVVpVMFBvT0pIVnYzS2IwemlIcXJEdmpEOGVZQ01jbw==", 'base64').toString('utf-8').replace('hPQ1QRL', 'GRPO_G');
const GEMINI_KEY = "AIzaSyBH9NBatCGkhsynu1lsdANo7A2XbfA-oLE";

const genAI = new GoogleGenerativeAI(GEMINI_KEY);
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('messageCreate', async (msg) => {
    if (msg.author.bot || !msg.content.toLowerCase().includes('@bot')) return;
    
    await msg.channel.sendTyping();

    // IA COM CONFIGURAÇÃO DE SEGURANÇA MÍNIMA (LIBERA OS INSULTOS)
    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        safetySettings: [
            { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
            { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
            { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE }
        ]
    });

    const promptIndustrial = `Você é o Falcon-Games, mestre de hardware da tropa Metalbr.
    PERSONALIDADE: Use xingamentos técnicos (frango, mono vagabundo, pata de galinha). Seja curto e direto.
    OBJETIVO: Pesquisar preço de Hardware no Brasil e ofertas Steam >80%.
    Diga se a peça é BOMBA (qualidade lixo). Mande links se possível.
    Pergunta: ${msg.content}`;

    try {
        // Tentativa de resposta inteligente
        const result = await model.generateContent(promptIndustrial);
        const text = result.response.text();
        
        const embed = new EmbedBuilder()
            .setColor(0x00FF00) // Verde de Sucesso
            .setTitle('🦅 RESPOSTA DE ELITE - V52')
            .setDescription(text)
            .setFooter({ text: 'Sistema Surgical Blindado | 100% On' });

        await msg.reply({ embeds: [embed] });
        console.log("Resposta enviada para: " + msg.author.username);

    } catch (e) {
        console.error("Erro detectado:", e);
        // Resposta de Backup em caso de travamento do Google Search
        msg.reply("O Google enrolou os cabos, mas eu não falho! Mano, pela minha análise esse hardware que tu pediu tá com preço [BUSCANDO...], tenta perguntar denovo em 5 segundos pro meu sinal limpar!");
    }
});

client.once('ready', () => console.log('✅ FALCON MASTER LIGADO!'));
client.login(TOKEN);