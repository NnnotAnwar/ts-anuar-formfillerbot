import { Bot, InlineKeyboard } from "grammy"
import { Builder, Button, By, until, WebDriver, WebElement } from "selenium-webdriver"
import "chromedriver"
import { Options } from "selenium-webdriver/chrome"
import { elementIsEnabled, elementIsVisible, elementsLocated } from "selenium-webdriver/lib/until"
import * as dotenv from 'dotenv'

// load .env
dotenv.config()

// Create a new bot
const bot = new Bot(process.env.TOKEN as string)

// ChromeDriver emulator, Chrome options
const screen = {
   width: 1920,
   height: 1080
}


const chrome = require('selenium-webdriver/chrome')
const chromeOptions = new Options()
chromeOptions.addArguments('--lang=en-US')
chromeOptions.addArguments('--headless')
chromeOptions.addArguments('--disable-gpu')
chromeOptions.addArguments('--no-sandbox')
chromeOptions.windowSize(screen);
chromeOptions.setChromeBinaryPath(process.env.CHROME_BINARY_PATH || '')

const serviceBuilder = new chrome.ServiceBuilder(process.env.CHROME_DRIVER_PATH)

// Pre-assign button text
const nextButton = "Next"
const submitButton = "Submit"

// Data to send:
const myName = process.env.MY_NAME as string
const myContact = process.env.MY_CONTACT as string

const successForm: string[] = []
const failForm: string[] = []

// Google form link regExp !!! NOT WORKING !!!
// const googleFormLinkExample = new RegExp(/https:\/\/docs.google.com\/forms\/d\/e\//gm)
// const googleFormLinkShortExample = new RegExp(/https:\/\/forms.gle\/\//gm)

// Function that detects URL in string
function detectURL(text: string) {
   const urlRegExp = new RegExp(/(https?:\/\/[^\s]+)/g)
   return text.match(urlRegExp)
}

// Bot reacts to commands: start, success, fail
bot.command('start', ctx => console.log(ctx.from?.id, ctx.from?.username, 'trigger: start'))

bot.command('success', async (ctx) => {
   console.log(ctx.from?.id, ctx.from?.username, 'trigger: success')
   if (ctx.from?.id == 806380705) {
      let successMessage: string = ''
      for (const i in successForm) {
         let link = successForm[i]
         let listNumber: number = +i + 1
         successMessage += `${listNumber}. ${link}\n`
      }
      if (successMessage) ctx.reply('SUCCESS FORMS:\n' + successMessage)
      else ctx.reply('NO SUCCESS FORMS YET')
   }
})

bot.command('fail', async (ctx) => {
   console.log(ctx.from?.id, ctx.from?.username, 'trigger: fail')
   if (ctx.from?.id == 806380705) {
      let failMessage: string = '';
      for (const i in failForm) {
         let link = failForm[i]
         let listNumber: number = +i + 1
         failMessage += `${listNumber}. ${link}\n`
      }
      if (failMessage) ctx.reply('FAILED FORMS:\n' + failMessage)
      else ctx.reply('NO FAILED FORMS YET')
   }
})

// This handler catch a message that has a link and if it is google form link, fill it and send.
// developed specially for GoStudy event 2022 group personally for me (Telegram: @anwar_kk)
bot.on("message", async (ctx) => {
   console.log(`${ctx.from.username} send message.`)
   console.log(`Message: ${"text" in ctx.message ? ctx.message.text : ""}`)
   console.log(new Date())
   if (ctx.message.text) {
      const links = detectURL(ctx.message.text)
      if (links) {
         for (const link of links) {
            const driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).setChromeService(serviceBuilder).build()
            try {
               await driver.get(link)
               const title = await driver.getTitle()
               // const textareas = await driver.findElements(By.className('KHxj8b tL9Q4c'))
               const inputs = await driver.findElements(By.className('whsOnd zHQkBf'))
               const buttons = await driver.findElements(By.className('NPEfkd RveJvd snByac'))
               let buttonSend
               let buttonNextFirst
               let result
               let resultText
               for (const button of buttons) {
                  const buttonText = await button.getText()
                  if (buttonText == nextButton) {
                     buttonNextFirst = button
                     break
                  }
                  if (buttonText == submitButton) {
                     buttonSend = button
                     break
                  }
               }

               /* !!!Форма Кристины!!!
               if (textareas.length == 2 && buttonSend) {
                  await textareas[0].sendKeys(myName)
                  await textareas[1].sendKeys(myContact)
                  await buttonSend.click()
                  await successForm.push(link)
               }
               */

               if (buttonNextFirst) {
                  await buttonNextFirst.click()
                  await driver.wait(until.elementsLocated(By.className('whsOnd zHQkBf')), 3000)
                  const input = await driver.findElement(By.className('whsOnd zHQkBf'))
                  const buttons = await driver.findElements(By.className('NPEfkd RveJvd snByac'))
                  await driver.wait(elementIsEnabled(input), 3000)
                  await input.sendKeys(myName)
                  for (const button of buttons) {
                     const buttonText = await button.getText()
                     if (buttonText == nextButton) {
                        await button.click()
                        break
                     }
                  }
                  const inputNext = await driver.findElement(By.className('whsOnd zHQkBf'))
                  const buttonsNext = await driver.findElements(By.className('NPEfkd RveJvd snByac'))
                  await driver.wait(elementIsEnabled(inputNext), 3000)
                  await inputNext.sendKeys(myContact)
                  for (const button of buttonsNext) {
                     const buttonText = await button.getText()
                     if (buttonText == submitButton) {
                        await button.click()
                        await successForm.push(link)
                        break
                     }
                  }
                  result = await driver.findElement(By.className('vHW8K'))
                  resultText = await result.getText()
               } else {
                  await failForm.push(link)
                  resultText = "Not Signed"
               }
               await bot.api.sendMessage(806380705, `BOT-TRIGGER-CATCH-LINK: ${link}\nRESULT: ${resultText}`)

            }
            catch (error) {
               await bot.api.sendMessage(806380705, `ERROR CATCHED: ${error}\n ${link}`)
               console.log('Error catched:', error)
            }
            finally {
               await driver.quit()
            }
         }
      }
   }
})

//Start the Bot
try {
   bot.start();
} catch (e) {
   console.log('Bot not started, error:', e)
}