"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const selenium_webdriver_1 = require("selenium-webdriver");
require("chromedriver");
const chrome_1 = require("selenium-webdriver/chrome");
//Create a new bot
const bot = new grammy_1.Bot("5540006836:AAHWVOln6dC6p9TMSDey2qI00MBLHAHHg34");
//ChromeDriver emulator, Chrome options
const chrome = require('selenium-webdriver/chrome');
const chromeOptions = new chrome_1.Options().addArguments('--lang=ru');
//Pre-assign menu text
const firstMenu = "<b>Menu 1</b>\n\nA beautiful menu with a shiny inline button.";
const secondMenu = "<b>Menu 2</b>\n\nA better menu with even more shiny inline buttons.";
//Pre-assign button text
const nextButton = "Next";
const backButton = "Back";
const tutorialButton = "Tutorial";
//Data to send:
const myName = "Anuar Kairulla";
const myContact = "Telegram: @anwar_kk";
//Build keyboards
const firstMenuMarkup = new grammy_1.InlineKeyboard().text(nextButton, backButton);
const secondMenuMarkup = new grammy_1.InlineKeyboard().text(backButton, backButton).text(tutorialButton, "https://core.telegram.org/bots/tutorial");
//Google form link regExp
// const googleFormLinkExample = new RegExp(/https:\/\/docs.google.com\/forms\/d\/e\//gm)
// const googleFormLinkShortExample = new RegExp(/https:\/\/forms.gle\/\//gm)
//Function that detects URL in string
function detectURL(text) {
    const urlRegExp = new RegExp(/(https?:\/\/[^\s]+)/g);
    return text.match(urlRegExp);
}
// This handler catch a message that has a link and if it is google form link, fill it and send.
// developed specially for GoStudy event 2022 group personally for me (Telegram: @anwar_kk)
bot.on("message", async (ctx) => {
    if (ctx.message.text) {
        const links = detectURL(ctx.message.text);
        if (links) {
            for (const link of links) {
                const driver = await new selenium_webdriver_1.Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
                try {
                    await driver.get(link);
                    const title = await driver.getTitle();
                    const textareas = await driver.findElements(selenium_webdriver_1.By.className('KHxj8b tL9Q4c'));
                    const inputs = await driver.findElements(selenium_webdriver_1.By.className('whsOnd zHQkBf'));
                    const buttons = await driver.findElements(selenium_webdriver_1.By.className('NPEfkd RveJvd snByac'));
                    let buttonSend;
                    let buttonNextFirst;
                    for (const button of buttons) {
                        const buttonText = await button.getText();
                        if (buttonText == 'Далее') {
                            buttonNextFirst = button;
                        }
                        if (buttonText == 'Отправить') {
                            buttonSend = button;
                        }
                    }
                    if (textareas.length == 2 && buttonSend) {
                        await textareas[0].sendKeys(myName);
                        await textareas[1].sendKeys(myContact);
                        await buttonSend.click();
                    }
                    if (textareas.length == 0 && buttonNextFirst) {
                        await buttonNextFirst.click();
                        await driver.wait(selenium_webdriver_1.until.elementsLocated(selenium_webdriver_1.By.className('KHxj8b tL9Q4c')), 3000);
                        const textarea = await driver.findElement(selenium_webdriver_1.By.className('KHxj8b tL9Q4c'));
                        await driver.wait(selenium_webdriver_1.until.elementIsEnabled(textarea), 3000);
                        await textarea.sendKeys(myName);
                        const buttons = await driver.findElements(selenium_webdriver_1.By.className('NPEfkd RveJvd snByac'));
                        for (const button of buttons) {
                            await driver.wait(selenium_webdriver_1.until.elementIsEnabled(button), 3000);
                            const buttonText = await button.getText();
                            if (buttonText == 'Далее') {
                                await button.click();
                                await driver.wait(selenium_webdriver_1.until.elementsLocated(selenium_webdriver_1.By.className('KHxj8b tL9Q4c')), 3000);
                                const textarea = await driver.findElement(selenium_webdriver_1.By.className('KHxj8b tL9Q4c'));
                                await driver.wait(selenium_webdriver_1.until.elementIsEnabled(textarea), 3000);
                                await textarea.sendKeys(myContact);
                                const buttons = await driver.findElements(selenium_webdriver_1.By.className('NPEfkd RveJvd snByac'));
                                for (const button of buttons) {
                                    await driver.wait(selenium_webdriver_1.until.elementIsEnabled(button), 3000);
                                    const buttonText = await button.getText();
                                    if (buttonText == 'Отправить') {
                                        await button.click();
                                    }
                                }
                            }
                        }
                    }
                }
                catch (error) {
                    console.log('Error catched:', error);
                }
                finally {
                    await driver.quit();
                    ctx.forwardMessage('806380705');
                }
            }
        }
        console.log(`${ctx.from.username} send message.`);
        console.log(`Message: ${"text" in ctx.message ? ctx.message.text : ""}`);
        console.log(new Date());
    }
});
//Start the Bot
try {
    bot.start();
}
catch (e) {
    console.log('Bot not started:', e);
}
