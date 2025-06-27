export class Cases {
    constructor(page) {
        this.page = page;
    }

    async addNewCase(info) {
        switch (info.entryPlace) {
            case "預約案件列表":
                await this.page.getByText(info.entryPlace).click();
                await this.page.locator('.table-container').getByRole("button", { name: info.addCaseBtn }).click();
                /**業務項目名稱 */
                await this.page.locator('div:nth-child(2) > .v-input__control > .v-field > .v-field__append-inner > .mdi-menu-down').first().click();
                await this.page.locator('.v-select__content').getByText(info.serviceCatagory , { exact: true }).click();
                // await this.page.locator('.v-menu > div > div > div:nth-child(2)').click(); //寫死
                /**視訊類型 */
                await this.page.locator('.v-row > div:nth-child(3) > div > .v-input > .v-input__control > .v-field > .v-field__field > .v-field__input').click();
                await this.page.locator('.v-select__content').getByText(info.viewCatagory).click();
                /**視訊日期 */
                await this.page.locator('.v-row > div:nth-child(4) > div > .v-input > .v-input__control').click();
                // await this.page.locator('.v-date-picker-controls__month').getByRole('button').nth(1).click(); //next month
                let txt = this.page.$eval('.v-date-picker-controls', node => node.innerText);
                console.log('txt>>',await txt) //2025年6月
                let today = new Date();
                let choosenNum = String(today.getDate()).padStart(2, '0');
                console.log('choosenNum>>',choosenNum);
                await this.page.getByRole('button', { name: choosenNum, exact: true, disabled: false  }).first().click();
                /**選擇時段 */ //寫死
                await this.page.locator('#select').click();
                await this.page.getByText('02:00').last().click();
                await this.page.getByText('02:20').click();
                await this.page.locator('#select').click();
                // await this.page.locator(`xpath=//div[contains(@id, "slotsContainer")]/div[contains(@data-time, "02:00")]`).click();
                // await this.page.waitForTimeout(10000);     
                /**人數 */   
                await this.page.locator('div:nth-child(2) > .v-input__control > .v-field > .v-field__append-inner > .mdi-menu-down').nth(1).click();
                await this.page.locator('.v-select__content').getByText( info.person , { exact: true }).click();
                /**客戶1姓名 */
                await this.page.locator('.v-field__input').nth(6).fill(info.customer1Name);
                /**客戶1稱謂 */
                await this.page.locator('.v-field__input').nth(7).fill(info.customer1xx);
                /**客戶1Email */
                await this.page.locator('.v-field__input').nth(8).fill(info.customer1Email);
                /**客戶1手機 */
                await this.page.locator('.v-field__input')
                await this.page.locator('.v-field__input').nth(9).click();
                await this.page.locator('.v-list-item__content', { hasText: '+886' }).click();
                await this.page.locator('.v-field__input').nth(10).fill(info.customer1Tel);
                break;
            case "即時案件列表":
                await this.page.getByText(info.entryPlace).click();
                await this.page.locator('.table-container').getByRole("button", { name: info.addCaseBtn }).click();
                /**業務項目名稱 */
                await this.page.locator('div:nth-child(2) > .v-input__control > .v-field > .v-field__field > .v-field__input').first().click();
                await this.page.locator('.v-select__content').getByText(info.serviceCatagory , { exact: true }).click();
                // await this.page.locator('.v-menu > div > div > div:nth-child(2)').click(); //寫死
                /**視訊類型 */
                await this.page.locator('div:nth-child(2) > .v-input__control > .v-field > .v-field__field > .v-field__input').nth(2).click();
                await this.page.getByText(info.viewCatagory).click();
                /**人數 */
                await this.page.locator('div:nth-child(2) > .v-input__control > .v-field > .v-field__field > .v-field__input').nth(1).click();
                await this.page.locator('.v-select__content').getByText( info.person , { exact: true }).click();
                break;
            default:
                break;
        }
        /**送出 */
        await this.page.getByRole('button', { name: '確認' }).click();
        let res = await this.page.waitForResponse(/get_list/, { timeout: 30000 });
        let resJson = await res.json();
        let taskNum = resJson.data[0].task_num;

        /**Result */
        await this.page.waitForSelector('.v-snackbar__content')
        let alertText = this.page.locator('.v-snackbar__content').textContent();
        console.log(await alertText); //success / The 業務項目 field must be an integer.

        /**Delete */
        switch (info.entryPlace) {
            case "預約案件列表":
                await this.page.getByRole('row', { name: taskNum }).getByRole('button').nth(2).click();
                await this.page.locator('.v-overlay__content > .v-list').click();
                break;
            case "即時案件列表":
                await this.page.getByRole('row', { name: taskNum }).getByRole('button').nth(1).click();
                await this.page.locator('.v-overlay__content > .v-list > .v-list-item:nth-child(2)').click(); //取消
                break;
            default:
                break;
        }
        await this.page.locator('.v-card-item:nth-child(4) > div > div > div > button:nth-child(2)').click(); //確認取消

    }
}