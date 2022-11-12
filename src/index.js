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
var until_1 = require("selenium-webdriver/lib/until");
var dotenv = require("dotenv");
// load .env
dotenv.config();
// Create a new bot
var bot = new grammy_1.Bot(process.env.TOKEN);
// ChromeDriver emulator, Chrome options
var screen = {
    width: 1920,
    height: 1080
};
var chrome = require('selenium-webdriver/chrome');
var chromeOptions = new chrome_1.Options();
chromeOptions.addArguments('--lang=en-US');
chromeOptions.addArguments('--headless');
chromeOptions.addArguments('--disable-gpu');
chromeOptions.addArguments('--no-sandbox');
chromeOptions.windowSize(screen);
chromeOptions.setChromeBinaryPath(process.env.CHROME_BINARY_PATH || '');
var serviceBuilder = new chrome.ServiceBuilder(process.env.CHROME_DRIVER_PATH);
// Pre-assign button text
var nextButton = "Next";
var submitButton = "Submit";
// Data to send:
var myName = process.env.MY_NAME;
var myContact = process.env.MY_CONTACT;
var successForm = [];
var failForm = [];
// Google form link regExp !!! NOT WORKING !!!
// const googleFormLinkExample = new RegExp(/https:\/\/docs.google.com\/forms\/d\/e\//gm)
// const googleFormLinkShortExample = new RegExp(/https:\/\/forms.gle\/\//gm)
// Function that detects URL in string
function detectURL(text) {
    var urlRegExp = new RegExp(/(https?:\/\/[^\s]+)/g);
    return text.match(urlRegExp);
}
// Bot reacts to commands: start, success, fail
bot.command('start', function (ctx) { var _a, _b; return console.log((_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id, (_b = ctx.from) === null || _b === void 0 ? void 0 : _b.username, 'trigger: start'); });
bot.command('success', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var successMessage, i, link, listNumber;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        console.log((_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id, (_b = ctx.from) === null || _b === void 0 ? void 0 : _b.username, 'trigger: success');
        if (((_c = ctx.from) === null || _c === void 0 ? void 0 : _c.id) == 806380705) {
            successMessage = '';
            for (i in successForm) {
                link = successForm[i];
                listNumber = +i + 1;
                successMessage += "".concat(listNumber, ". ").concat(link, "\n");
            }
            if (successMessage)
                ctx.reply('SUCCESS FORMS:\n' + successMessage);
            else
                ctx.reply('NO SUCCESS FORMS YET');
        }
        return [2 /*return*/];
    });
}); });
bot.command('fail', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var failMessage, i, link, listNumber;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        console.log((_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id, (_b = ctx.from) === null || _b === void 0 ? void 0 : _b.username, 'trigger: fail');
        if (((_c = ctx.from) === null || _c === void 0 ? void 0 : _c.id) == 806380705) {
            failMessage = '';
            for (i in failForm) {
                link = failForm[i];
                listNumber = +i + 1;
                failMessage += "".concat(listNumber, ". ").concat(link, "\n");
            }
            if (failMessage)
                ctx.reply('FAILED FORMS:\n' + failMessage);
            else
                ctx.reply('NO FAILED FORMS YET');
        }
        return [2 /*return*/];
    });
}); });
// This handler catch a message that has a link and if it is google form link, fill it and send.
// developed specially for GoStudy event 2022 group personally for me (Telegram: @anwar_kk)
bot.on("message", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var links, _i, links_1, link, driver, title, inputs, buttons, buttonSend, buttonNextFirst, result, resultText, _a, buttons_1, button, buttonText, input, buttons_3, _b, buttons_2, button, buttonText, inputNext, buttonsNext, _c, buttonsNext_1, button, buttonText, error_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                console.log("".concat(ctx.from.username, " send message."));
                console.log("Message: ".concat("text" in ctx.message ? ctx.message.text : ""));
                console.log(new Date());
                if (!ctx.message.text) return [3 /*break*/, 44];
                links = detectURL(ctx.message.text);
                if (!links) return [3 /*break*/, 44];
                _i = 0, links_1 = links;
                _d.label = 1;
            case 1:
                if (!(_i < links_1.length)) return [3 /*break*/, 44];
                link = links_1[_i];
                return [4 /*yield*/, new selenium_webdriver_1.Builder().forBrowser('chrome').setChromeOptions(chromeOptions).setChromeService(serviceBuilder).build()];
            case 2:
                driver = _d.sent();
                _d.label = 3;
            case 3:
                _d.trys.push([3, 39, 41, 43]);
                return [4 /*yield*/, driver.get(link)];
            case 4:
                _d.sent();
                return [4 /*yield*/, driver.getTitle()
                    // const textareas = await driver.findElements(By.className('KHxj8b tL9Q4c'))
                ];
            case 5:
                title = _d.sent();
                return [4 /*yield*/, driver.findElements(selenium_webdriver_1.By.className('whsOnd zHQkBf'))];
            case 6:
                inputs = _d.sent();
                return [4 /*yield*/, driver.findElements(selenium_webdriver_1.By.className('NPEfkd RveJvd snByac'))];
            case 7:
                buttons = _d.sent();
                buttonSend = void 0;
                buttonNextFirst = void 0;
                result = void 0;
                resultText = void 0;
                _a = 0, buttons_1 = buttons;
                _d.label = 8;
            case 8:
                if (!(_a < buttons_1.length)) return [3 /*break*/, 11];
                button = buttons_1[_a];
                return [4 /*yield*/, button.getText()];
            case 9:
                buttonText = _d.sent();
                if (buttonText == nextButton) {
                    buttonNextFirst = button;
                    return [3 /*break*/, 11];
                }
                if (buttonText == submitButton) {
                    buttonSend = button;
                    return [3 /*break*/, 11];
                }
                _d.label = 10;
            case 10:
                _a++;
                return [3 /*break*/, 8];
            case 11:
                if (!buttonNextFirst) return [3 /*break*/, 35];
                return [4 /*yield*/, buttonNextFirst.click()];
            case 12:
                _d.sent();
                return [4 /*yield*/, driver.wait(selenium_webdriver_1.until.elementsLocated(selenium_webdriver_1.By.className('whsOnd zHQkBf')), 3000)];
            case 13:
                _d.sent();
                return [4 /*yield*/, driver.findElement(selenium_webdriver_1.By.className('whsOnd zHQkBf'))];
            case 14:
                input = _d.sent();
                return [4 /*yield*/, driver.findElements(selenium_webdriver_1.By.className('NPEfkd RveJvd snByac'))];
            case 15:
                buttons_3 = _d.sent();
                return [4 /*yield*/, driver.wait((0, until_1.elementIsEnabled)(input), 3000)];
            case 16:
                _d.sent();
                return [4 /*yield*/, input.sendKeys(myName)];
            case 17:
                _d.sent();
                _b = 0, buttons_2 = buttons_3;
                _d.label = 18;
            case 18:
                if (!(_b < buttons_2.length)) return [3 /*break*/, 22];
                button = buttons_2[_b];
                return [4 /*yield*/, button.getText()];
            case 19:
                buttonText = _d.sent();
                if (!(buttonText == nextButton)) return [3 /*break*/, 21];
                return [4 /*yield*/, button.click()];
            case 20:
                _d.sent();
                return [3 /*break*/, 22];
            case 21:
                _b++;
                return [3 /*break*/, 18];
            case 22: return [4 /*yield*/, driver.findElement(selenium_webdriver_1.By.className('whsOnd zHQkBf'))];
            case 23:
                inputNext = _d.sent();
                return [4 /*yield*/, driver.findElements(selenium_webdriver_1.By.className('NPEfkd RveJvd snByac'))];
            case 24:
                buttonsNext = _d.sent();
                return [4 /*yield*/, driver.wait((0, until_1.elementIsEnabled)(inputNext), 3000)];
            case 25:
                _d.sent();
                return [4 /*yield*/, inputNext.sendKeys(myContact)];
            case 26:
                _d.sent();
                _c = 0, buttonsNext_1 = buttonsNext;
                _d.label = 27;
            case 27:
                if (!(_c < buttonsNext_1.length)) return [3 /*break*/, 32];
                button = buttonsNext_1[_c];
                return [4 /*yield*/, button.getText()];
            case 28:
                buttonText = _d.sent();
                if (!(buttonText == submitButton)) return [3 /*break*/, 31];
                return [4 /*yield*/, button.click()];
            case 29:
                _d.sent();
                return [4 /*yield*/, successForm.push(link)];
            case 30:
                _d.sent();
                return [3 /*break*/, 32];
            case 31:
                _c++;
                return [3 /*break*/, 27];
            case 32: return [4 /*yield*/, driver.findElement(selenium_webdriver_1.By.className('vHW8K'))];
            case 33:
                result = _d.sent();
                return [4 /*yield*/, result.getText()];
            case 34:
                resultText = _d.sent();
                return [3 /*break*/, 37];
            case 35: return [4 /*yield*/, failForm.push(link)];
            case 36:
                _d.sent();
                resultText = "Not Signed";
                _d.label = 37;
            case 37: return [4 /*yield*/, bot.api.sendMessage(806380705, "BOT-TRIGGER-CATCH-LINK: ".concat(link, "\nRESULT: ").concat(resultText))];
            case 38:
                _d.sent();
                return [3 /*break*/, 43];
            case 39:
                error_1 = _d.sent();
                return [4 /*yield*/, bot.api.sendMessage(806380705, "ERROR CATCHED: ".concat(error_1, "\n ").concat(link))];
            case 40:
                _d.sent();
                console.log('Error catched:', error_1);
                return [3 /*break*/, 43];
            case 41: return [4 /*yield*/, driver.quit()];
            case 42:
                _d.sent();
                return [7 /*endfinally*/];
            case 43:
                _i++;
                return [3 /*break*/, 1];
            case 44: return [2 /*return*/];
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
