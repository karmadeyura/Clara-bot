const Discord = require("discord.js");
const low = require("lowdb")
const FileSync = require("lowdb/adapters/FileSync")
const express = require("express");
const app = express();

const adapter = new FileSync("database.json");
const db = low(adapter);

//DEBUT PARAMETRE HEROKU
app.set("port", (process.env.PORT || 5000))

app.listen(app.get("port"), function(){
  console.log(`Bot en fonctionnement sur le port ${app.get("port")}`);
})    


db.defaults({ histoires: [], xp: []})
    .write()

var bot = new Discord.Client();
var prefix =("");
var randnum = 0;

var storynumber = db.get(`histoires`).size().value();

bot.on("ready" ,() => {
    bot.user.setPresence({ game: { name: "Suivre SCARECROW"}})
    console.log("Bot Ready !");
});

bot.login(process.env.TOKEN);

bot.on("guildMemberAdd", member => {
    let role = member.guild.roles.find("name", "Admirateurs (Peut aider en cas de besoins)");
    member.guild.channels.find("name", "général").send(`:metal: ${member.user.username} Vient de rejoindre le serveur`)
    member.addRoles(role)
});

bot.on("guildMemberRemove", member => {
    member.guild.channels.find("name", "général").send(`:middle_finger: ${member.user.username} Vient de quitter le serveur`)
});    

bot.on("message", message => {

    var msgauthor = message.author.id;

    if(message.author.bot)return;

    if(!db.get("xp").find({user: msgauthor}).value()){
        db.get("xp").push({user: msgauthor, xp:1}).write();
    }else{
        var userxpdb = db.get("xp").filter({user: msgauthor}).find("xp").value();
        console.log(userxpdb);
        var userxp = Object.values(userxpdb)
        console.log(userxp);
        console.log(`Nombre d'xp : ${userxp[1]}`)
        db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();
    }
    
    if (message.content ==="Ping"){
        message.reply("Pong");
        console.log("Ping Pong");
    }
    
    if (message.content ==="ping"){
        message.reply("Pong");
        console.log("Ping Pong");
    }

    if (message.content ==="Un café ?"){
        message.reply("Du rhum si possible");
        console.log("Ping Pong");
    }

    if (message.content ==="un café ?"){
        message.reply("Du rhum si possible");
        console.log("Ping Pong");
    }

    
    if (message.content ==="clara"){
        message.reply("Tu ma appelé ?");
        console.log("clara");
    }

    if (message.content ==="Clara"){
        message.reply("Tu ma appelé ?");
        console.log("Clara");
    }

    if (message.content ==="🍺"){
        message.reply("🍻");
        console.log("biere");
    }

    if (message.content ==="Salut"){
        message.reply("salut");
        console.log("salut salut");
    }

    if (message.content ==="salut"){
        message.reply("salut");
        console.log("salut salut");
    }




    if(!message.content.startsWith(prefix)) return;
    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()){

        case"newstory":
        var value = message.content.substr(10);
        var author = message.author.username.toString();
        var number = db.get(`histoire`).map(`id`).value();
       // var storyid = number + 1;
        console.log(value);
        message.reply("ajout de l'histoire a la base de données")
        
        
        db.get(`histoires`)
            .push({ story_value: value, story_author: author})
            .write()
        break;

        case "tellstory" :
        
        story_random();
        console.log(randnum);

        var story = db.get(`histoires[${randnum}].story_value`).toString().value();
        var author_story = db.get(`histoires[${randnum}].story_author`).toString().value();
        console.log(story);

        message.channel.send(`C'est partie ! : ${story} (Histoire de ${author_story})`)

        break;


        case "say":
        let say = args.slice(1).join(' ');
        if (!message.channel.permissionsFor(message.member).hasPermission("KICK_MEMBERS")){
            message.reply("Tu n'as pas les droits d'utiliser cette commande ! :warning: ")}
        if (!say) return message.reply("Tu as oublier le message !")
            .addField(say) 
            message.delete();
            message.channel.sendMessage(say)
            message.channel.sendEmbed


        break;



    }     

    if(message.content === prefix + "help"){
       var help_embed = new Discord.RichEmbed()
            .setColor("#FEFEFE")
            .addField("Commandes du Bot !", " -/help : affiche les commandes du Bot !")
            .addField("Interaction", "Ping ! Le bot repond Pong !")
        message.channel.sendEmbed(help_embed);
      // message.channel.sendMessage("Voici les commandes du Bot :\n -/help pour afficher les commandes");
       console.log("commande help demandée !");

    }

    
     if (message.content === "Tout le monde sait que je suis un ange"){
        random();

        if (randnum == 0){
            message.reply("c'est pas beau de mentire");
            console.log(randnum);
        }

        if (randnum == 1){
            message.reply("je te rappel que tu est surnomé le psychopathe...");
            console.log(randnum);
        }

        if (randnum == 2){
            message.reply("BWAHAHAHAHAHAHA excuse moi j'ai pas pu me retenir");
            console.log(randnum);
        }

    }

    if (message.content === "Clara explique lui"){
        random();

        if (randnum == 0){
            message.channel.sendMessage("la vie et une roulette russe... et tu a perdu");
            console.log(randnum);
        }

        if (randnum == 1){
            message.channel.sendMessage("tu prefere mourir comment ?");
            console.log(randnum);
        }

        if (randnum == 2){
            message.channel.sendMessage("un, deux, trois devine qui ne vivra pas...");
            console.log(randnum);
        }

    }

    if (message.content === "Mdr"){
        random();

        if (randnum == 0){
            message.channel.sendMessage("Tu trouve sa drole toi ?");
            console.log(randnum);
        }

        if (randnum == 1){
            message.channel.sendMessage("Il en faut peu pour te faire rire toi...");
            console.log(randnum);
        }

        if (randnum == 2){
            message.channel.sendMessage("Mdr");
            console.log(randnum);
        }

        if (randnum == 3){
            message.channel.sendMessage("A quel moment je suis censé rire ?");
            console.log(randnum);
        }

        if (randnum == 4){
            message.channel.sendMessage("Pas mal XD");
            console.log(randnum);
        }

    }

    if (message.content === "mdr"){
        random();

        if (randnum == 0){
            message.channel.sendMessage("Tu trouve sa drole toi ?");
            console.log(randnum);
        }

        if (randnum == 1){
            message.channel.sendMessage("Il en faut peu pour te faire rire toi...");
            console.log(randnum);
        }

        if (randnum == 2){
            message.channel.sendMessage("Mdr");
            console.log(randnum);
        }

        if (randnum == 3){
            message.channel.sendMessage("A quel moment je suis censé rire ?");
            console.log(randnum);
        }

        if (randnum == 4){
            message.channel.sendMessage("Pas mal XD");
            console.log(randnum);
        }

    }

    if (message.content === "la vie est une roulette russe..."){
        random();

        if (randnum == 0){
            message.channel.sendMessage("Et tu a perdu !");
            console.log(randnum);
        }

        if (randnum == 1){
            message.channel.sendMessage("Et tu a gagner !");
            console.log(randnum);
        }

    }

    if (message.content === "La vie est une roulette russe..."){
        random();

        if (randnum == 0){
            message.channel.sendMessage("Et tu a perdu !");
            console.log(randnum);
        }

        if (randnum == 1){
            message.channel.sendMessage("Et tu a gagner !");
            console.log(randnum);
        }

    }

    if (message.content === "Lol"){
        random();

        if (randnum == 0){
            message.channel.sendMessage("Trolololololololol");
            console.log(randnum);
        }

        if (randnum == 1){
            message.channel.sendMessage("Lol");
            console.log(randnum);
        }

        if (randnum == 2){
            message.channel.sendMessage("Lel");
            console.log(randnum);
        }

        if (randnum == 3){
            message.channel.sendMessage("Mouais...");
            console.log(randnum);
        }

        if (randnum == 4){
            message.channel.sendMessage("Chuis morte XD");
            console.log(randnum);
        }

    }

    if (message.content === "lol"){
        random();

        if (randnum == 0){
            message.channel.sendMessage("Trolololololololol");
            console.log(randnum);
        }

        if (randnum == 1){
            message.channel.sendMessage("Lol");
            console.log(randnum);
        }

        if (randnum == 2){
            message.channel.sendMessage("Lel");
            console.log(randnum);
        }

        if (randnum == 3){
            message.channel.sendMessage("Mouais...");
            console.log(randnum);
        }

        if (randnum == 4){
            message.channel.sendMessage("Chuis morte XD");
            console.log(randnum);
        }

    }

    




    if (message.content === prefix + "xpstat"){
        var xp = db.get("xp").filter({user: msgauthor}).find(`xp`).value()
        var xpfinal = Object.values(xp);
        var xp_embed = new Discord.RichEmbed()
            .setTitle(`xp de ${message.author.username}`)
            .setDescription("Voici tout ton xp !")
            .addField("xp :", `${xpfinal[1]} xp`)
        message.channel.send({embed: xp_embed});
    }
    
});

function story_random(min, max) {
    min = Math.ceil(0);
    max = Math.floor(storynumber);
    randnum = Math.floor(Math.random() * (max - min +1) + min);

}
   
function random(min,max) {
    min = Math.ceil(0);
    max = Math.floor(2);
    randnum = Math.floor(Math.random() * (max - min +1) + min);
}
