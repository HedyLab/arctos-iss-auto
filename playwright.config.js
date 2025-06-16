const { defineConfig, devices } = require('@playwright/test');
const path = require('node:path');
const fs = require('fs');

const projectName = path.basename(__dirname);

function getOutputFolder() {
    if (fs.existsSync('outputFolder.txt')) {
        const outputFolder = fs.readFileSync('outputFolder.txt', 'utf-8').trim();
        const concurrentFolder = `${outputFolder}_${(new Date()).getMonth() + 1}-${(new Date()).getDate()}-${(new Date()).getHours()}h.${(new Date()).getMinutes()}m.${(new Date()).getSeconds()}s`;
        return concurrentFolder;
    } else {
        const defaultFolder = `C:/Report/${projectName}/${(new Date()).getMonth() + 1}-${(new Date()).getDate()}-${(new Date()).getHours()}h.${(new Date()).getMinutes()}m.${(new Date()).getSeconds()}s`;
        return defaultFolder;
    }
}

module.exports = defineConfig({
    retries: 0,
    reporter: [
        ['list', { printSteps: true }],
        ['html', { outputFolder: getOutputFolder() }]
    ],
    expect: {
        timeout: 10 * 1000
    },
    projects: [
        {
            name: 'mobile-Chrome',
            testMatch: '*/*mobile.spec.js',
            use: {
                ...devices['mobile Chrome'],
                viewport: { width: 411, height: 731 },
                browserName: 'chromium',
                isMobile: true,
                userAgent: 'Mozilla/5.0 (iPhone14,6; U; CPU iPhone OS 15_4 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/19E241 Safari/602.1'

            },
        },
        {
            name: 'mobile-Safari',
            testMatch: '*/*mobile.spec.js',
            use: {
                ...devices['mobile Safari'],
                viewport: { width: 390, height: 844 },
                browserName: 'webkit',
                isMobile: true,
                userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1'
            },
        },
        {
            name: 'Chrome',
            testIgnore: '*/*mobile.spec.js',
            use: {
                ...devices['Desktop Chrome'],
                isMobile: false,
                browserName: 'chromium',
                userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.6045.160 Safari/537.36'
            },
        },
        {
            name: 'Edge',
            testIgnore: '*/*mobile.spec.js',
            use: {
                ...devices['Desktop MicrosoftEdge'],
                isMobile: false,
                channel: 'msedge',
                userAgent: 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Mobile Safari/537.36 Edg/89.0.774.57'
            },
        },
        {
            name: 'FireFox',
            testIgnore: '*/*mobile.spec.js',
            use: {
                ...devices['FireFox'],
                isMobile: false,
                browserName: 'firefox',
                userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0'
            },
        }
    ]
});
