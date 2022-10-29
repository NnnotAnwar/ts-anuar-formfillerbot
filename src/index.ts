import { Bot, InlineKeyboard } from "grammy";
import { Builder, By } from "selenium-webdriver";
import "chromedriver";

//Create a new bot
const bot = new Bot("5739968241:AAET5XcN1c4lTsGdD9mJ3mOxwLV6J_kl-dU");

//ChromeDriver emulator
const chrome = require('selenium-webdriver/chrome');

//Pre-assign menu text
const firstMenu = "<b>Menu 1</b>\n\nA beautiful menu with a shiny inline button.";
const secondMenu = "<b>Menu 2</b>\n\nA better menu with even more shiny inline buttons.";

//Pre-assign button text
const nextButton = "Next";
const backButton = "Back";
const tutorialButton = "Tutorial";

//My Data:
const myName = "Anuar Kairulla";
const myContact = "+420 705 974 542"

//Build keyboards
const firstMenuMarkup = new InlineKeyboard().text(nextButton, backButton);

const secondMenuMarkup = new InlineKeyboard().text(backButton, backButton).text(tutorialButton, "https://core.telegram.org/bots/tutorial");

//Google form link regExp
// const googleFormLinkExample = new RegExp(/https:\/\/docs.google.com\/forms\/d\/e\//gm)
// const googleFormLinkShortExample = new RegExp(/https:\/\/forms.gle\/\//gm)

//Function that detects URL in string
function detectURL(text: string) {
   const urlRegExp = new RegExp(/(https?:\/\/[^\s]+)/g)
   return text.match(urlRegExp)
}

//This handler sends a menu with the inline buttons we pre-assigned above
// bot.command("menu", async (ctx) => {
//    await ctx.reply(firstMenu, {
//       parse_mode: "HTML",
//       reply_markup: firstMenuMarkup,
//    });
// });

//This handler sends react on message
// bot.on("message", (ctx) => {
//    if (ctx.message.text && (googleFormLinkExample.test(ctx.message.text) || googleFormLinkShortExample.test(ctx.message.text))) {
//       ctx.reply('This is Google Form Link')
//    }
// });

bot.on("message", async (ctx) => {
   if (ctx.message.text) {
      const links = detectURL(ctx.message.text)
      if (links) {
         for (const link of links) {
            const driver = await new Builder().forBrowser('chrome').build()
            try {
               await driver.get(link)
               const title = await driver.getTitle()
               const textareas = await driver.findElements(By.className('KHxj8b tL9Q4c'))
               const inputs = await driver.findElements(By.className('whsOnd zHQkBf'))
               const buttons = await driver.findElements(By.className('NPEfkd RveJvd snByac'))
               for (const button of buttons) {
                  let buttonText = await button.getText()
                  ctx.reply(buttonText)
               }
            }
            catch (error) {
               console.log('Error driver:', error)
            }
            finally {
               await driver.quit()
            }

         }
         console.log(
            `${ctx.from.first_name} wrote ${"text" in ctx.message ? ctx.message.text : ""
            }`,
         );
      }
   }
})

//This handler processes back button on the menu
// bot.callbackQuery(backButton, async (ctx) => {
//    //Update message content with corresponding menu section
//    await ctx.editMessageText(firstMenu, {
//       reply_markup: firstMenuMarkup,
//       parse_mode: "HTML",
//    });
// });

//This handler processes next button on the menu
// bot.callbackQuery(nextButton, async (ctx) => {
//    //Update message content with corresponding menu section
//    await ctx.editMessageText(secondMenu, {
//       reply_markup: secondMenuMarkup,
//       parse_mode: "HTML",
//    });
// });


//This function would be added to the dispatcher as a handler for messages coming from the Bot API
// bot.on("message", async (ctx) => {
//    //Print to console
//    console.log(
//       `${ctx.from.first_name} wrote ${"text" in ctx.message ? ctx.message.text : ""
//       }`,
//    );

//    if (ctx.message.text) {
//       //Scream the message
//       await ctx.reply(ctx.message.text.toUpperCase(), {
//          entities: ctx.message.entities,
//       });
//    } else {
//       //This is equivalent to forwarding, without the sender's name
//       await ctx.copyMessage(ctx.message.chat.id);
//    }
// });

//Start the Bot
bot.start();
