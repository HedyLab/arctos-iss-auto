function checkResponse(apiName, responseSatus, responseData) {
    try {
        // console.log('apiName>>',apiName )
        // console.log('responseData>>',responseData )
        let getId
        if(responseSatus != '200') { throw new Error() };
        switch (apiName) {
            case '取得驗證碼':
                let getCode
                if(responseData.message == 'success' && 
                    typeof responseData.info == 'object'
                ) {
                    console.log(`✔️responseData.info >>`, responseData.info);
                    getCode = responseData.info.code;
                    console.log(`✔️${apiName} >>`, getCode);
                } else { throw new Error() }
                return getCode
            case '取得登入授權':
                let access_token
                if(responseData.message == 'success' && 
                    typeof responseData.info == 'object'
                ) {
                    access_token = responseData.info.access_token;
                    console.log(`✔️${apiName} >>`, access_token);
                } else { throw new Error() }
                return access_token
            case '新增主類別':
            case '新增次類別':
            case '新增條款':
            case '新增業務流程':
            case '新增業務主步驟':
            case '新增業務次步驟':
                if(responseData.message == 'success' && 
                    typeof responseData.info == 'object'
                ) {
                    getId = responseData.info.id;
                    console.log(`✔️${apiName} ID`, getId);
                } else { throw new Error() }
                return getId
            case '新增字卡標籤':
            case '新增業務步驟字卡':
            case '新增業務步驟條款':
                let getIdInArray
                if(
                    responseData.message == 'success' && 
                    typeof responseData.info == 'object' && 
                    responseData.info.id instanceof Array
                ) {
                    getIdInArray = responseData.info.id
                    console.log(`✔️${apiName} ID in array >>`,getIdInArray);
                } else { throw new Error() }
                return getIdInArray;
            case '新增業務次步驟_新增動作':
                console.log('responseData>>',responseData)
                let stepActionId
                if(
                    responseData.message == 'success' &&
                    responseData.data instanceof Array
                ) {
                    stepActionId = responseData.data[0].id
                    console.log(`✔️${apiName} stepActionId >>`,stepActionId);
                } else { throw new Error() }
                return stepActionId;
            case '刪除業務主步驟':
            case '刪除業務次步驟':
            case '刪除業務步驟字卡':
            case '刪除業務步驟條款':
                if(responseData.message == '刪除成功') {
                    console.log(`✔️ ${apiName} 刪除成功`);
                } else { throw new Error() }
                break;
            default: //取得業務詳細、取得字卡列表、取得條款列表、刪除業務流程
                console.log('responseData',responseData);
                if(responseData.message == 'success') {
                    console.log(`✔️ ${apiName} Success`);
                } else { throw new Error() }
                break;
        }
    } catch (err) {
        console.error(`❌ ${apiName} Status:`, responseSatus);
        console.error(`❌ ${apiName} JSON:`, responseData);
        throw new Error(err);
    }
}

export default { checkResponse };
