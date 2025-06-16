import { test } from '@playwright/test';
import { Request } from './component/api/request';

let apiContext
let req
let token
test.beforeAll(async({ playwright, request }) => {
    try {
        req = new Request(apiContext);
        token = await req.login('取得登入授權', request);
        apiContext = await playwright.request.newContext({
            baseURL: 'https://www-sit.arctos.tw',
            extraHTTPHeaders: {
                'Authorization': 'Bearer ' + `${token}`
            }
        })
    } catch (err) {
        throw new Error(err)
    }
})

test('fetch', async () => {
    
    try {
        req = new Request(apiContext);
        await req.business_category_do_add('新增主類別');
        await req.business_category_do_add('新增次類別');
        await req.word_card_do_add('新增字卡標籤');
        await req.term_do_add('新增條款');
        await req.business_do_add('新增業務流程');
        await req.business_step_do_add('新增業務主步驟','視訊開始前'); //視訊開始前、視訊中、視訊結束後、子步驟
        await req.business_step_do_add('新增業務次步驟','子步驟');
        await req.business_step_word_card_do_add('新增業務步驟字卡');
        await req.business_step_term_do_add('新增業務步驟條款');
        await req.business_step_action_do_add('新增業務次步驟_新增動作');
        /**Get detile */
        await req.business_get_info('取得業務詳細');
        await req.word_card_get_list('取得字卡列表');
        await req.term_get_list('取得條款列表');
        /**Delete */
        await req.business_category_do_del('刪除主類別');
        await req.business_category_do_del('刪除次類別');
        await req.word_card_do_del('刪除字卡標籤');
        await req.term_do_del('刪除條款');
        await req.business_step_do_del('刪除業務主步驟');
        await req.business_step_do_del('刪除業務次步驟');
        // await req.business_step_word_card_do_del('刪除業務步驟字卡');
        // await req.business_step_term_do_del('刪除業務步驟條款');
        await req.business_do_del('刪除業務流程')
    } catch (err) {
        // await req.deleteId(type);
        throw new Error(err)
    }
});

