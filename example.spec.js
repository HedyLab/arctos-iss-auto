import { test, expect } from '@playwright/test';
import { Cases } from './component/Cases';
import { Verify } from './component/Verify';

let newScheduleCaseInfo = {
  "entryPlace" : "預約案件列表",
  "addCaseBtn" : "新增案件",
  "serviceCatagory" : "arctos房屋貸款",
  // "serviceCatagory" : "arctos 訪廠業務 202306-12",
  "person" : "2",
  "viewCatagory" : "中繼",
  "customer1Id" : "身分證",
  "customer1Name" : "姓名",
  "customer1Email" : "Email@email.com",
  "customer1Tel" : "0983833939",
  "customer1xx": "稱謂"
}

let newRealTimeCaseInfo = {
  "entryPlace" : "即時案件列表",
  "addCaseBtn" : "新增案件",
  "serviceCatagory" : "arctos房屋貸款",
  "person" : "2",
  "viewCatagory" : "直連",
}

test('Add new case', async ({ page }) => {
  test.setTimeout(400000)
  const verify = new Verify(page);
  const cases = new Cases(page);
  await verify.loginArctosBackOffice();
  await cases.addNewCase(newRealTimeCaseInfo);
});

