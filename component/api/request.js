import expectResponse from "./expect_response.js";

export class Request {
    constructor(apiContext) {
        this.apiContext = apiContext
        this.code
        this.token
        this.requestBody
        this.response
        this.categoryId
        this.subCategoryId
        this.businessId
        this.stepCategory
        this.businessStepId
        this.businessSubStepId
        this.stepWordCardId
        this.stepTermId
        this.stepActionId
        this.wordCardIdArray
        this.termId
    }

    async auth_code(type, request) {
        this.response = await request.post('https://www-sit.arctos.tw/api/auth/code', { 
            data: {
                "role": "MODERATOR", //使用者角色: ADMIN、SWITCH、CLIENT、MODERATOR、PUBLISHER
                "user_id": "100001",
                "name": "RoRo"
            },
            headers: {
                "arc-license-id": "9EAB5E8D-761B-4654-91E9-E2EE36F142AF",
                "arc-license-key": "Ou8KscgfbQRzgp2CDqWZQjaVdPtisNK7XROTEeZu"
            }
        });
        this.code = expectResponse.checkResponse(type, this.response.status(), await this.response.json());
    }

    async login(type, request) {
        this.response = await request.post('https://www-sit.arctos.tw/api/auth/login', { 
            data: {
                "grant_type": "password",
                "account": "aryan@ihh.tw",
                "password": "24954821"
                // "grant_type": "authorization_code",
                // "code": "def50200314661a4e51e670afedf845b3c643bbdd83dda11ecd53f6deaf499d3f16b2239a40c2bae66b0c75e10e21f9768f4992bd437a18b858c20f1fa16d2cac65be7a7d0571f71f205228460c9eb896eb4ca34fc6e7a5c11929318d0485c9cdb28af66f2aa672b4f8e34157f769cea6c560978cde35ae1d59b9bc07c42551835c6d6db2780a442480dcac1fa003f2b1b331a12d0fbc400892215aaa8c6d9eb370c3e16dfa9d21935945f98cf891653ab44ab9ceeb84afb43498de6883b459f99e921106e8101147f51f0c4398405a2174de0785e9eae48b55d468acac2fa48358eb6437c00417f991c27146260043ef49cec972ec18ab334cef829b36932a9981e26dff4ba654f233e39496bbd669146e7446300123f4ed1e9f21cd50d7f94615a1a7e679faac51b4c021a3e8cd3dabff65d997b966eab55a9090f7476db4668dac31a577d1bf8aad8ccac2b6e9ff78efbf7cbd365912f0f6abcc1ae1e2e4e8ec020b6225c890177ebb9e3b19e8221874de42f"
                // "code": this.code
            }
        });
        this.token = expectResponse.checkResponse(type, this.response.status(), await this.response.json());
        return this.token
    }

    async inputRequestBody(type) {
        switch (type) {
            case '新增主類別':
                this.requestBody = {
                    "parent_id": 0,
                    "title": "API專用主類別",
                    "summary": "API專用主類別",
                    "detail": "HEDY製造",
                    "status": 1
                };
                break;
            case '新增次類別':
                this.requestBody = {
                    "parent_id": this.categoryId,
                    "title": "API專用次類別",
                    "summary": "API專用次類別",
                    "detail": "HEDY製造",
                    "status": 1
                };
                break;
            case '刪除主類別':
                this.requestBody = {
                    "id": this.categoryId
                };
                break;
            case '刪除次類別':
                this.requestBody = {
                    "id": this.subCategoryId
                };
                break;
            case '新增業務流程':
                this.requestBody = {
                    "title": "API專用新增業務流程",
                    "version": "版號",
                    "summary": "簡介",
                    "detail": "詳細說明",
                    "status": 1,
                    "main_category_id": this.categoryId,
                    "sub_category_id": this.subCategoryId
                }
                break;
            case '新增業務主步驟':
                this.requestBody = {
                    "business_id": this.businessId,
                    "parent_id": 0,
                    "data": [
                        {
                            "title": "新增業務頁裡的新增步驟標題",
                            "summary": "新增業務頁裡的新增步驟副標題",
                            "status": 1,
                            "type": this.stepCategory
                        }
                    ]
                }
                break;
            case '新增業務次步驟':
                this.requestBody = {
                    "business_id": this.businessId,
                    "parent_id": this.categoryId,
                    "data": [
                        {
                            "title": "新增業務頁裡的新增次步驟標題",
                            "summary": "新增業務頁裡的新增次步驟副標題",
                            "status": 1,
                            "type": this.stepCategory
                        }
                    ]
                }
                break;
            case '刪除業務主步驟':
                this.requestBody = {
                    "id": this.businessStepId
                };
                break;
            case '刪除業務次步驟':
                this.requestBody = {
                    "id": this.businessSubStepId
                };
                break;
            case '新增業務步驟字卡':
                this.requestBody = {
                    "step_id": this.businessStepId,
                    "data": [
                        {
                            "word_card_id": this.wordCardIdArray,  //已轉成Number
                            "status": 1,
                            "rank": 0
                        }
                    ]
                };
                break;
            case '刪除業務步驟字卡':
                this.requestBody = {
                    "id": this.stepWordCardId
                };
                break;
            case '新增業務步驟條款':
                this.requestBody = {
                    "step_id": this.businessStepId,
                    "data": [
                        {
                            "term_id": this.termId,
                            "status": 1,
                            "rank": 0
                        }
                    ]
                };
                break;
            case '刪除業務步驟條款':
                this.requestBody = {
                    "id": this.stepTermId
                };
                break;
            case '新增業務次步驟_新增動作':
                this.requestBody = {
                    "step_id": this.businessSubStepId,
                    "title": "新增業務步驟裡的次步驟裡的新增動作標題",
                    "summary": "新增業務步驟裡的次步驟裡的新增動作簡介",
                    "type": "push_step_link",
                    "content": "http://google",
                    "status": 1
                };
                break;
            case '新增字卡標籤':
                this.requestBody = {
                    "tag": "API專用字卡標籤",
                    "status": 1
                };
                break;
            case '刪除字卡標籤':
                this.requestBody = {
                    "id": [ 
                        this.wordCardIdArray //需array
                    ]
                };
                break;
            case '新增條款':
                this.requestBody = {
                    "type": "link",
                    "summary": "API專用條款副標題",
                    "detail": "HEDY製造",
                    "title": "API專用條款標題",
                    "content": "http://google",
                    "status": 1,
                    "rank": 1
                };
                break;
            case '刪除條款':
                this.requestBody = {
                    "id": this.termId
                };
                break;
            case '取得業務詳細':
                this.requestBody = {
                    "id": this.businessId
                };
                break;
            case '取得字卡列表':
                this.requestBody = {
                    "tag": "get_tags_only", //全部 get_tags_only 、 直接貼標籤"API專用字卡標籤"
                    "page": 1,
                    "per_page": 50,
                    "sort": "desc",
                    "order": "create_time"
                };
                break;
            case '取得條款列表':
                this.requestBody = {
                    "page": 1,
                    "per_page": 50,
                    "sort": "desc",
                    "order": "create_time"
                };
                break;
            case '刪除業務流程':
                this.requestBody = {
                    "id": this.businessId
                };
                break;
            default:
                throw new Error("❌ cannot find the type");
        }
    }

    async business_category_do_add(type) {
        this.inputRequestBody(type);
        this.response = await this.apiContext.post('/api/v2/business/category/do_add', { data: this.requestBody });
        if(type == '新增主類別') {
            this.categoryId = expectResponse.checkResponse(type, this.response.status(), await this.response.json());
        } else if (type == '新增次類別') {
            this.subCategoryId = expectResponse.checkResponse(type, this.response.status(), await this.response.json());
        }
    }

    async business_category_do_del(type) {
        this.inputRequestBody(type);
        this.response = await this.apiContext.post('/api/v2/business/category/do_del', { data: this.requestBody });
        expectResponse.checkResponse(type, this.response.status(), await this.response.json());
    }

    async business_do_add(type) {
        this.inputRequestBody(type);
        this.response = await this.apiContext.post('/api/v2/business/do_add', { data: this.requestBody });
        this.businessId = expectResponse.checkResponse(type, this.response.status(), await this.response.json());
    }

    async business_step_do_add(type, stepCategory) {
        switch (stepCategory) {
            case '視訊開始前':
                this.stepCategory = 'before';
                break;
            case '視訊中':
                this.stepCategory = 'processing';
                break;
            case '視訊結束後':
                this.stepCategory = 'after';
                break;
            case '子步驟':
                this.stepCategory = 'sub';
                break;
            default:
                throw new Error("❌ cannot find the category");
        }
        this.inputRequestBody(type);
        this.response = await this.apiContext.post('/api/v2/business/step/do_add', { data: this.requestBody });
        if( type == '新增業務主步驟') {
            this.businessStepId = expectResponse.checkResponse(type, this.response.status(), await this.response.json());
            this.businessStepId = Number(this.businessStepId);
        } else if ( type == '新增業務次步驟') {
            this.businessSubStepId = expectResponse.checkResponse(type, this.response.status(), await this.response.json());
            this.businessSubStepId = Number(this.businessSubStepId);
        }
    }

    async business_step_do_del(type) {
        this.inputRequestBody(type);
        this.response = await this.apiContext.post('/api/v2/business/step/do_del', { data: this.requestBody });
        expectResponse.checkResponse(type, this.response.status(), await this.response.json());
    }

    async business_step_word_card_do_add(type) {
        this.inputRequestBody(type);
        this.response = await this.apiContext.post('/api/v2/business/step/word_card/do_add', { data: this.requestBody });
        this.stepWordCardId = expectResponse.checkResponse(type, this.response.status(), await this.response.json());
    }

    async business_step_word_card_do_del(type) {
        this.inputRequestBody(type);
        this.response = await this.apiContext.post('/api/v2/business/step/word_card/do_del', { data: this.requestBody });
        expectResponse.checkResponse(type, this.response.status(), await this.response.json());
    }

    async business_step_term_do_add(type) {
        this.inputRequestBody(type);
        this.response = await this.apiContext.post('/api/v2/business/step/term/do_add', { data: this.requestBody });
        this.stepTermId = expectResponse.checkResponse(type, this.response.status(), await this.response.json());
    }

    async business_step_term_do_del(type) {
        this.inputRequestBody(type);
        this.response = await this.apiContext.post('/api/v2/business/step/term/do_del', { data: this.requestBody });
        expectResponse.checkResponse(type, this.response.status(), await this.response.json());
    }

    async business_step_action_do_add(type) {
        this.inputRequestBody(type);
        this.response = await this.apiContext.post('/api/v2/business/step/action/do_add', { data: this.requestBody });
        this.stepActionId = expectResponse.checkResponse(type, this.response.status(), await this.response.json());
    }


    async word_card_do_add(type) {
        this.inputRequestBody(type);
        this.response = await this.apiContext.post('/api/v2/word_card/do_add', { data: this.requestBody });
        this.wordCardIdArray = expectResponse.checkResponse(type, this.response.status(), await this.response.json());
        this.wordCardIdArray = Number(this.wordCardIdArray);
        console.log('wordCardIdArray to Number>>',this.wordCardIdArray);
    }

    async word_card_do_del(type) {
        this.inputRequestBody(type);
        this.response = await this.apiContext.post('/api/v2/word_card/do_del', { data: this.requestBody });
        expectResponse.checkResponse(type, this.response.status(), await this.response.json());
    }

    async term_do_add(type) {
        this.inputRequestBody(type);
        this.response = await this.apiContext.post('/api/v2/term/do_add', { data: this.requestBody });
        this.termId = expectResponse.checkResponse(type, this.response.status(), await this.response.json());
    }

    async term_do_del(type) {
        this.inputRequestBody(type);
        this.response = await this.apiContext.post('/api/v2/term/do_del', { data: this.requestBody });
        expectResponse.checkResponse(type, this.response.status(), await this.response.json());
    }


    async business_get_info(type) {
        this.inputRequestBody(type);
        this.response = await this.apiContext.post('/api/v2/business/get_info', { data: this.requestBody });
        expectResponse.checkResponse(type, this.response.status(), await this.response.json());
    }

    async word_card_get_list(type) {
        this.inputRequestBody(type);
        this.response = await this.apiContext.post('/api/v2/word_card/get_list', { data: this.requestBody });
        expectResponse.checkResponse(type, this.response.status(), await this.response.json());
    }


    async term_get_list(type) {
        this.inputRequestBody(type);
        this.response = await this.apiContext.post('/api/v2/term/get_list', { data: this.requestBody });
        expectResponse.checkResponse(type, this.response.status(), await this.response.json());
    }

    async business_do_del(type) {
        this.inputRequestBody(type);
        this.response = await this.apiContext.post('/api/v2/business/do_del', { data: this.requestBody });
        expectResponse.checkResponse(type, this.response.status(), await this.response.json());
        console.log('this.businessId',this.businessId);
    }

    async deleteId(type) {
        this.inputRequestBody(type);
        switch (type) {
            case '刪除主類別':
            case '刪除次類別':
                this.response = await this.apiContext.post('/api/v2/business/category/do_del', { data: this.requestBody });
                break;
            case '刪除字卡標籤':
                this.response = await this.apiContext.post('/api/v2/word_card/do_del', { data: this.requestBody });
                break;
            case '刪除條款':
                this.response = await this.apiContext.post('/api/v2/term/do_del', { data: this.requestBody });
                break;
            case '刪除業務主步驟':
            case '刪除業務次步驟':
                this.response = await this.apiContext.post('/api/v2/business/step/do_del', { data: this.requestBody });
                break;
            case '刪除業務步驟字卡':
                this.response = await this.apiContext.post('/api/v2/business/step/word_card/do_del', { data: this.requestBody });
                break;
            case '刪除業務步驟條款':
                this.response = await this.apiContext.post('/api/v2/business/step/term/do_del', { data: this.requestBody });
                break;
            default:
                throw new Error("❌ cannot find the type");
        }
        this.response = await this.apiContext.post('/api/v2/business/step/word_card/do_del', { data: this.requestBody });
        expectResponse.checkResponse(type, this.response.status(), await this.response.json());
    }



}
        