require('dotenv').config(); //載入.env環境檔
const webdriver = require('selenium-webdriver'), // 加入虛擬網頁套件
    By = webdriver.By,//你想要透過什麼方式來抓取元件，通常使用xpath、css
    until = webdriver.until;//直到抓到元件才進入下一步(可設定等待時間)
const fb_username = process.env.FB_USERNAME
const fb_userpass = process.env.FB_PASSWORD
const chrome = require('selenium-webdriver/chrome');
const path = require('path');//用於處理文件路徑的小工具
const fs = require("fs");//讀取檔案用

// function helloWorld () { // 創建函式
//     const content = 'helloWorld' // 給變數內容
//     console.log(content) // 用日誌將內容印出來
// }
// helloWorld() // 觸發

// function getEnvVariable () {
//     const env_variable= process.env.YOUR_VARIABLE // 取出環境變數
//     console.log(env_variable)
// }
// getEnvVariable()

// async function openCrawlerWeb() {

//     // 建立這個browser的類型
//     let driver = await new webdriver.Builder().forBrowser("chrome").build();
//     const web = 'https://www.google.com/';//填寫你想要前往的網站
//     driver.get(web)//透國這個driver打開網頁
// }
//openCrawlerWeb()//打開爬蟲網頁

// function checkDriver() {
//     try {
//         chrome.getDefaultService()//確認是否有預設
//     } catch {
//         console.warn('找不到預設driver!');
        
//         //'../chromedriver.exe'記得調整成自己的路徑
//         const file_path = './chromedriver.exe'        
//         //請確認印出來日誌中的位置是否與你路徑相同
//         console.log(path.join(__dirname, file_path));
        
//         //確認路徑下chromedriver.exe是否存在  
//         if (fs.existsSync(path.join(__dirname, file_path))) {
//             console.log('開始設定driver路徑');  
//             //設定driver路徑
//             const service = new chrome.ServiceBuilder(path.join(__dirname, file_path)).build();
//             chrome.setDefaultService(service);
//             console.log('設定driver路徑');
//         } else {
//             console.error('無法設定driver路徑');
//             return false
//         }
//     }
//     return true
// }

// async function openCrawlerWeb() {

//     if (!checkDriver()) {// 檢查Driver是否是設定，如果無法設定就結束程式
//         return
//     }
    
//     // 建立這個broswer的類型
//     let driver = await new webdriver.Builder().forBrowser("chrome").build();
//     const web = 'https://www.google.com/';//填寫你想要前往的網站
//     driver.get(web)//透國這個driver打開網頁
// }

async function loginFacebook () {
    chrome_options = webdriver.ChromeOptions()
    
    // let driver = await new webdriver.Builder().forBrowser("chrome").build();
    let driver = await new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .setChromeOptions(new chrome.Options().addArguments("--incognito"))
    .build();
     
    const web = 'https://www.facebook.com/login';
    await driver.get(web)//在這裡要用await確保打開完網頁後才能繼續動作

    
    //使用until是要求直到網頁顯示了這個元件才能執行下一步
    const fb_email_ele = await driver.
        wait(until.elementLocated(By.xpath(`/html/body/div[1]/div[1]/div[1]/div/div[2]/div[2]/form/div/div[1]/input`)));//找出填寫email的元件
    fb_email_ele.sendKeys(fb_username)

    const fb_pass_ele = await driver.
        wait(until.elementLocated(By.xpath(`/html/body/div[1]/div[1]/div[1]/div/div[2]/div[2]/form/div/div[2]/div/div/input`)));
    fb_pass_ele.sendKeys(fb_userpass)

    const login_button = await driver.
        wait(until.elementLocated(By.xpath(`/html/body/div[1]/div[1]/div[1]/div/div[2]/div[2]/form/div/div[3]/button`)))
    login_button.click()

    // 禁用警告框
    chromeOptions.add_argument('--no-sandbox')
    driver.executeScript("window.alert = function() {}; window.confirm = function() {}; window.prompt = function() {};");

    const search_input = await driver.
        wait(until.elementLocated(By.xpath(`/html/body/div[1]/div[1]/div[1]/div/div[2]/div[2]/form/div/div[3]/button`)))
        search_input.sendKeys("紫星")

}
///html/body/div[1]/div/div[1]/div/div[2]/div[3]/div/div/div/div/div/label/input
loginFacebook()//登入FB