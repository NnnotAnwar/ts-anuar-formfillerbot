"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var grammy_1 = require("grammy");
var selenium_webdriver_1 = require("selenium-webdriver");
require("chromedriver");
var chrome_1 = require("selenium-webdriver/chrome");
//Create a new bot
var bot = new grammy_1.Bot("5540006836:AAHWVOln6dC6p9TMSDey2qI00MBLHAHHg34");
//ChromeDriver emulator, Chrome options
var chrome = require('selenium-webdriver/chrome');
var chromeOptions = new chrome_1.Options().addArguments('--lang=ru');
//Pre-assign menu text
var firstMenu = "<b>Menu 1</b>\n\nA beautiful menu with a shiny inline button.";
var secondMenu = "<b>Menu 2</b>\n\nA better menu with even more shiny inline buttons.";
//Pre-assign button text
var nextButton = "Next";
var backButton = "Back";
var tutorialButton = "Tutorial";
//Data to send:
var myName = "Anuar Kairulla";
var myContact = "Telegram: @anwar_kk";
//Build keyboards
var firstMenuMarkup = new grammy_1.InlineKeyboard().text(nextButton, backButton);
var secondMenuMarkup = new grammy_1.InlineKeyboard().text(backButton, backButton).text(tutorialButton, "https://core.telegram.org/bots/tutorial");
//Google form link regExp
// const googleFormLinkExample = new RegExp(/https:\/\/docs.google.com\/forms\/d\/e\//gm)
// const googleFormLinkShortExample = new RegExp(/https:\/\/forms.gle\/\//gm)
//Function that detects URL in string
function detectURL(text) {
    var urlRegExp = new RegExp(/(https?:\/\/[^\s]+)/g);
    return text.match(urlRegExp);
}
function sendKey(driver, key, className) {
    return __awaiter(this, void 0, void 0, function () {
        var buttons, _i, buttons_1, button, buttonText, newKey, _a, buttons_2, button, buttonText;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!key) return [3 /*break*/, 15];
                    // await driver.wait(until.elementLocated(By.className(className)))
                    // await driver.wait(until.elementIsEnabled(key), 1500)
                    return [4 /*yield*/, key.sendKeys(myName)];
                case 1:
                    // await driver.wait(until.elementLocated(By.className(className)))
                    // await driver.wait(until.elementIsEnabled(key), 1500)
                    _b.sent();
                    return [4 /*yield*/, driver.findElements(selenium_webdriver_1.By.className('NPEfkd RveJvd snByac'))];
                case 2:
                    buttons = _b.sent();
                    _i = 0, buttons_1 = buttons;
                    _b.label = 3;
                case 3:
                    if (!(_i < buttons_1.length)) return [3 /*break*/, 7];
                    button = buttons_1[_i];
                    return [4 /*yield*/, button.getText()];
                case 4:
                    buttonText = _b.sent();
                    if (!(buttonText == 'Далее')) return [3 /*break*/, 6];
                    return [4 /*yield*/, button.click()];
                case 5:
                    _b.sent();
                    _b.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 3];
                case 7: return [4 /*yield*/, driver.findElement(selenium_webdriver_1.By.className(className))];
                case 8:
                    newKey = _b.sent();
                    return [4 /*yield*/, driver.wait(selenium_webdriver_1.until.elementIsEnabled(newKey), 1500)];
                case 9:
                    _b.sent();
                    return [4 /*yield*/, newKey.sendKeys(myContact)];
                case 10:
                    _b.sent();
                    _a = 0, buttons_2 = buttons;
                    _b.label = 11;
                case 11:
                    if (!(_a < buttons_2.length)) return [3 /*break*/, 14];
                    button = buttons_2[_a];
                    return [4 /*yield*/, button.getText()];
                case 12:
                    buttonText = _b.sent();
                    if (buttonText == 'Отправить') {
                        //await button.click()
                    }
                    _b.label = 13;
                case 13:
                    _a++;
                    return [3 /*break*/, 11];
                case 14: return [3 /*break*/, 16];
                case 15: return [2 /*return*/, 0];
                case 16: return [2 /*return*/];
            }
        });
    });
}
// This handler catch a message that has a link and if it is google form link, fill it and send.
// developed specially for GoStudy event 2022 group personally for me (Telegram: @anwar_kk)
bot.on("message", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var links, _i, links_1, link, driver, title, textareas, inputs, buttons, buttonSend, buttonNextFirst, _a, buttons_3, button, buttonText, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!ctx.message.text) return [3 /*break*/, 24];
                links = detectURL(ctx.message.text);
                if (!links) return [3 /*break*/, 23];
                _i = 0, links_1 = links;
                _b.label = 1;
            case 1:
                if (!(_i < links_1.length)) return [3 /*break*/, 23];
                link = links_1[_i];
                return [4 /*yield*/, new selenium_webdriver_1.Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build()];
            case 2:
                driver = _b.sent();
                _b.label = 3;
            case 3:
                _b.trys.push([3, 19, 20, 22]);
                return [4 /*yield*/, driver.get(link)];
            case 4:
                _b.sent();
                return [4 /*yield*/, driver.getTitle()];
            case 5:
                title = _b.sent();
                return [4 /*yield*/, driver.findElements(selenium_webdriver_1.By.className('KHxj8b tL9Q4c'))];
            case 6:
                textareas = _b.sent();
                return [4 /*yield*/, driver.findElements(selenium_webdriver_1.By.className('whsOnd zHQkBf'))];
            case 7:
                inputs = _b.sent();
                return [4 /*yield*/, driver.findElements(selenium_webdriver_1.By.className('NPEfkd RveJvd snByac'))];
            case 8:
                buttons = _b.sent();
                buttonSend = void 0;
                buttonNextFirst = void 0;
                _a = 0, buttons_3 = buttons;
                _b.label = 9;
            case 9:
                if (!(_a < buttons_3.length)) return [3 /*break*/, 12];
                button = buttons_3[_a];
                return [4 /*yield*/, button.getText()];
            case 10:
                buttonText = _b.sent();
                if (buttonText == 'Далее') {
                    buttonNextFirst = button;
                }
                if (buttonText == 'Отправить') {
                    buttonSend = button;
                }
                _b.label = 11;
            case 11:
                _a++;
                return [3 /*break*/, 9];
            case 12:
                if (!(textareas.length == 2 && buttonSend)) return [3 /*break*/, 16];
                return [4 /*yield*/, textareas[0].sendKeys(myName)];
            case 13:
                _b.sent();
                return [4 /*yield*/, textareas[1].sendKeys(myContact)];
            case 14:
                _b.sent();
                return [4 /*yield*/, buttonSend.click()];
            case 15:
                _b.sent();
                _b.label = 16;
            case 16:
                if (!buttonNextFirst) return [3 /*break*/, 18];
                return [4 /*yield*/, buttonNextFirst.click()];
            case 17:
                _b.sent();
                _b.label = 18;
            case 18: return [3 /*break*/, 22];
            case 19:
                error_1 = _b.sent();
                console.log('Error catched:', error_1);
                return [3 /*break*/, 22];
            case 20: return [4 /*yield*/, driver.quit()];
            case 21:
                _b.sent();
                ctx.forwardMessage('806380705');
                return [7 /*endfinally*/];
            case 22:
                _i++;
                return [3 /*break*/, 1];
            case 23:
                console.log("".concat(ctx.from.username, " send message."));
                console.log("Message: ".concat("text" in ctx.message ? ctx.message.text : ""));
                console.log(new Date());
                _b.label = 24;
            case 24: return [2 /*return*/];
        }
    });
}); });
//Start the Bot
try {
    bot.start();
}
catch (e) {
    console.log('Bot not started, error:', e);
}
